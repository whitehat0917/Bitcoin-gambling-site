const request = require("request");
var Sync = require('sync');
var md5 = require('md5');
var WalletSchema = require('../schemas/wallet_schema');
var TransactionSchema = require('../schemas/transaction_schema');
var UserSchema = require('../schemas/user_schema');
var ProgressHistorySchema = require('../schemas/progress_game_history_schema');
var ProgressSchema = require('../schemas/progress_game_schema');
var FinishSchema = require('../schemas/finish_game_schema');
var FinishHistorySchema = require('../schemas/finish_game_history_schema');
var randomstring = require("randomstring");
var config = require('../../config/config.js');

module.exports.deposit = async function(req, res) {
    try {
        const url = "http://188.166.17.165:80/getTxHistory";

        request.post(url, (error, response, body) => {
            if (error != null) {
                res.status(201).json({ success: false, status: "Error. Please try again later." });
                return;
            }
            Sync(function() {
                const data_array = JSON.parse(body).data;
                let amount = 0;
                let addressStatus = false;
                const length = data_array.length;
                transaction = new TransactionSchema();
                for (let i = 0; i < length; i++) {
                    if (data_array[i].outputs[0].address == req.body.address) {
                        if (find_transaction.sync(null, req.body.address, data_array[i].time) == true) {
                            addressStatus = true;
                            change_balance_byaddress("plus", parseInt(data_array[i].outputs[0].amount / 100), req.body.address);
                            amount = amount + data_array[i].outputs[0].amount;
                            insert_history(req.body.address, data_array[i].time);
                        }
                    }
                }
                if (addressStatus == true) {
                    res.status(201).json({ success: true, status: "Successfully deposited.", extra_balance: parseInt(amount / 100) });
                } else {
                    res.status(201).json({ success: false, status: "Minesweeper could not find any new deposits." });
                }
            });
        });
    } catch (error) {
        console.log("bitcoinController-401", error);
        res.status(401).json({ success: false, status: error });
    }
}

module.exports.gameStart = async function(req, res) {
    try {
        Sync(function() {
            user = new UserSchema();
            //reduce balance
            if (check_balance.sync(null, req.body.uuid, req.body.initStake) == false) {
                res.status(201).json({ success: false, status: "Your balance is not enough." });
                return;
            }
            change_balance("minus", req.body.initStake, req.body.uuid);
            const bombPlaces = generate_bomb_places(req.body.bomb_count);
            const guessNextBonus = guess_next_bonus.sync(null, req.body.bomb_count, "", req.body.initStake);
            const game_hash = randomstring.generate(32);
            progress = new ProgressSchema({
                user_id: req.body.uuid,
                game_hash: game_hash,
                secret_string: bombPlaces.join("-") + "-" + randomstring.generate(10),
                bomb_places: bombPlaces.join("-"),
                bomb_count: req.body.bomb_count,
                init_stake: req.body.initStake,
                amount: req.body.initStake,
                created_at: new Date()
            });
            progress.save();
            res.status(201).json({ success: true, next: guessNextBonus.guess_amount, game_hash: game_hash });
        });
    } catch (error) {
        console.log("bitcoinController-401", error);
        res.status(401).json({ success: false, status: error });
    }
}

module.exports.clickCell = async function(req, res) {
    try {
        Sync(function() {
            let checkGameOverData = check_game_over.sync(null, req.body.game_hash, req.body.guess_place);
            if (checkGameOverData.gameOver == true) {
                finish_history = new FinishHistorySchema();
                res.status(201).json({ success: true, game_status: false, bombPlaces: checkGameOverData.bombPlaces });
                finish_history.query("INSERT INTO finish_game_history ( game_hash, guess_place, guess_amount, created_at )       SELECT game_hash, guess_place, guess_amount, created_at FROM progressing_game_history where game_hash = '" + req.body.game_hash + "'", function(err, rows, fields) {
                    if (rows.affectedRows != 0) {
                        progress_history = new ProgressHistorySchema();
                        progress_history.remove("game_hash = '" + req.body.game_hash + "'");
                    }
                });
            } else {
                progress = new ProgressSchema();
                progress.find('first', { where: "game_hash = '" + req.body.game_hash + "'" }, function(err, row) {
                    if (row.length != 0) {
                        Sync(function() {
                            if (check_double_guess.sync(null, req.body.game_hash, req.body.guess_place) == true) {
                                res.status(201).json({ success: false, game_status: false });
                                return;
                            }
                            progress_history = new ProgressHistorySchema({
                                game_hash: req.body.game_hash,
                                guess_place: req.body.guess_place,
                                guess_amount: 0,
                                created_at: new Date()
                            });
                            progress_history.save();
                            const guessNextBonus = guess_next_bonus.sync(null, row.bomb_count, req.body.game_hash, row.init_stake);
                            progress_history.set("guess_amount", guessNextBonus.prev_guess_amount);
                            progress_history.save("game_hash = '" + req.body.game_hash + "' and guess_place = " + req.body.guess_place);
                            progress.set("amount", guessNextBonus.amount);
                            progress.save("game_hash = '" + req.body.game_hash + "'");
                            if (guessNextBonus.guess_amount == Infinity) {
                                guessNextBonus.guess_amount = guessNextBonus.prev_guess_amount;
                            }
                            res.status(201).json({ success: true, game_status: true, next: guessNextBonus.guess_amount, prev: guessNextBonus.prev_guess_amount });
                            if (guessNextBonus.open_count == 25 - row.bomb_count) {
                                cash_out(req.body.game_hash);
                            }
                        });
                    }
                });
            }
        });
    } catch (error) {
        console.log("bitcoinController-401", error);
        res.status(401).json({ success: false, status: error });
    }
}

module.exports.cashOut = async function(req, res) {
    try {
        cash_out(req.body.game_hash);
        res.status(201).json({ success: true, status: "Success Cashout!" });
    } catch (error) {
        console.log("bitcoinController-401", error);
        res.status(401).json({ success: false, status: error });
    }
}

module.exports.withDraw = async function(req, res) {
    try {
        user = new UserSchema();
        user.find('first', { where: "user_id = '" + req.body.data.uuid + "'" }, function(err, row) {
            if (row.length != 0) {
                if (req.body.data.amount > row.balance) {
                    res.status(201).json({ success: false, status: "Amount must be less than or equal to your balance." });
                    return;
                } else {
                    const options = {
                        url: 'http://188.166.17.165:80/createTxproposal',
                        json: true,
                        body: {
                            toAddress: req.body.data.payto_address,
                            amount: req.body.data.amount,
                            secret: md5(config.secret + "-" + req.body.data.payto_address)
                        }
                    };
                    request.post(options, (error1, response1, body1) => {
                        if (error1 != null) {
                            res.status(201).json({ success: false, status: "Error. Please try again later." });
                            return;
                        } else {
                            change_balance_byaddress("minus", req.body.data.amount * 1000000, row.wallet_address);
                            res.status(201).json({ success: true, status: "Successfully Withdrawed!", extra_balance: req.body.data.amount * 1000000 });
                            return;
                        }
                    });
                }
            } else {
                res.status(201).json({ success: false, status: "Error. Please try again later!" });
                return;
            }
        });
    } catch (error) {
        console.log("bitcoinController-401", error);
        res.status(401).json({ success: false, status: error });
    }
}

function change_balance(type, balance, uuid) {
    user = new UserSchema();
    if (type == "minus") {
        user.query("update users set balance = balance - " + balance + " where user_id = '" + uuid + "'", function(err, rows, fields) {
            // Do something...
        });
    } else {
        user.query("update users set balance = balance + " + balance + " where user_id = '" + uuid + "'", function(err, rows, fields) {
            // Do something...
        });
    }
}

function change_balance_byaddress(type, balance, address) {
    user = new UserSchema();
    if (type == "minus") {
        user.query("update users set balance = balance - " + balance + " where wallet_address = '" + address + "'", function(err, rows, fields) {
            // Do something...
        });
    } else {
        user.query("update users set balance = balance + " + balance + " where wallet_address = '" + address + "'", function(err, rows, fields) {
            // Do something...
        });
    }
}

function change_wallet_amount(type, amount, address) {
    wallet = new WalletSchema();
    if (type == "minus") {
        wallet.query("update user_wallet_balance set amount = amount - " + amount + " where address = '" + address + "'", function(err, rows, fields) {
            // Do something...
        });
    } else {
        wallet.query("update user_wallet_balance set amount = amount + " + amount + " where address = '" + address + "'", function(err, rows, fields) {
            // Do something...
        });
    }
}

function generate_bomb_places(bombNum) {
    const bombPlaces = [];
    while (bombPlaces.length < bombNum) {
        const x = Math.floor(Math.random() * 25) + 1;
        if (bombPlaces.length === 0) {
            bombPlaces.push(x);
        } else {
            let duplicated = false;
            for (let i = 0; i < bombPlaces.length; i++) {
                if (bombPlaces[i] == x)
                    duplicated = true;
            }
            if (!duplicated) {
                bombPlaces.push(x);
            }
        }
    }
    return bombPlaces;
}

function guess_next_bonus(bombCount, gameHash, initStake, callback) {
    let guessBonus = 0;
    progress_history = new ProgressHistorySchema();
    progress_history.find('all', { where: "game_hash = '" + gameHash + "'" }, function(err, rows) {
        let length = rows.length;
        let tempAmount = 1;
        let prevTempAmount = 1;
        let oldPrevTempAmount = 1;
        for (let i = 0; i <= length; i++) {
            tempAmount = tempAmount * ((25 - i) / (25 - bombCount - i));
            if (i < length)
                prevTempAmount = tempAmount;
            if (i < length - 1)
                oldPrevTempAmount = tempAmount;
        }
        let data = { amount: Math.round((prevTempAmount - 1) * initStake * 0.92) + initStake, guess_amount: Math.round((tempAmount - 1) * initStake * 0.92 - (prevTempAmount - 1) * initStake * 0.92), prev_guess_amount: Math.round((prevTempAmount - 1) * initStake * 0.92) - Math.round((oldPrevTempAmount - 1) * initStake * 0.92), open_count: rows.length };
        return callback(null, data);
    });
}

function check_balance(uuid, balance, callback) {
    user = new UserSchema();
    user.find('first', { where: "user_id = '" + uuid + "'" }, function(err, row) {
        let check = false;
        if (row.length != 0) {
            if (row.balance > balance)
                check = true;
        }
        return callback(null, check);
    });
}

function check_game_over(game_hash, guess_place, callback) {
    progress = new ProgressSchema();
    progress_history = new ProgressHistorySchema();
    progress.find('first', { where: "game_hash = '" + game_hash + "'" }, function(err, row) {
        let gameOver = false;
        let bombPlaces = "";
        if (row.length != 0) {
            bombPlaces = row.bomb_places;
            const bomb_places = row.bomb_places.split("-");
            for (let i = 0; i < bomb_places.length; i++) {
                if (bomb_places[i] == guess_place)
                    gameOver = true;
            }
            if (gameOver == true) {
                finish = new FinishSchema({
                    user_id: row.user_id,
                    game_hash: game_hash,
                    secret_string: row.secret_string,
                    bomb_places: row.bomb_places,
                    bomb_count: row.bomb_count,
                    init_stake: row.init_stake,
                    amount: row.amount,
                    created_at: row.created_at,
                    status: 0
                });
                finish.save();
                finish_history = new FinishHistorySchema({
                    game_hash: game_hash,
                    guess_place: guess_place,
                    guess_amount: 0,
                    status: 0,
                    created_at: new Date()
                });
                finish_history.save();
                progress.remove("game_hash = '" + game_hash + "'");
            }
        }
        return callback(null, { gameOver: gameOver, bombPlaces: bombPlaces });
    });
}

function cash_out(game_hash) {
    progress = new ProgressSchema();
    progress.find('first', { where: "game_hash = '" + game_hash + "'" }, function(err, row) {
        if (row.length != 0) {
            change_balance("plus", row.amount, row.user_id);
            finish_history = new FinishHistorySchema();
            finish_history.query("INSERT INTO finish_game_history ( game_hash, guess_place, guess_amount, created_at )       SELECT game_hash, guess_place, guess_amount, created_at FROM progressing_game_history where game_hash = '" + game_hash + "'", function(err, rows, fields) {
                if (rows.affectedRows != 0) {
                    progress_history = new ProgressHistorySchema();
                    progress_history.remove("game_hash = '" + game_hash + "'");
                }
            });
            progress.find('first', { where: "game_hash = '" + game_hash + "'" }, function(err, progressRow) {
                finish = new FinishSchema({
                    user_id: progressRow.user_id,
                    game_hash: game_hash,
                    secret_string: progressRow.secret_string,
                    bomb_places: progressRow.bomb_places,
                    bomb_count: progressRow.bomb_count,
                    init_stake: progressRow.init_stake,
                    amount: progressRow.amount,
                    created_at: progressRow.created_at,
                    status: 1
                });
                finish.save();
                progress = new ProgressSchema();
                progress.remove("game_hash = '" + game_hash + "'");
            });
        }
    });
}

function find_transaction(address, time, callback) {
    transaction = new TransactionSchema();
    transaction.find('first', { where: "address = '" + address + "' and created_time = '" + time + "'" }, function(err, row) {
        if (row.length == 0)
            return callback(null, true);
        else
            return callback(null, false);
    });
}

function insert_history(address, time) {
    transaction = new TransactionSchema({
        address: address,
        created_time: time
    });
    transaction.save();
}

function check_double_guess(game_hash, guess_place, callback) {
    progress_history = new ProgressHistorySchema();
    progress_history.find('first', { where: "guess_place = '" + guess_place + "' and game_hash = '" + game_hash + "'" }, function(err, row) {
        if (row.length != 0) {
            return callback(null, true);
        } else {
            return callback(null, false);
        }
    });
}