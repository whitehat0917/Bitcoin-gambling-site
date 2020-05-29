var UserSchema = require('../schemas/user_schema');
var WalletSchema = require('../schemas/wallet_schema');
const requestIp = require('request-ip');
const request = require("request");

module.exports.login = async function(req, res) {
    try {
        user = new UserSchema();
        user.find('first', { where: "user_id = '" + req.body.uuid + "'" }, function(err, row) {
            if (row.length != 0) {
                res.status(201).json({ success: true, data: row });
            } else {
                const url = "http://188.166.17.165:80/createAddress";

                request.post(url, (error, response, body) => {
                    const address = JSON.parse(body).data.address;
                    const clientIp = requestIp.getClientIp(req);
                    user = new UserSchema({
                        user_id: req.body.uuid,
                        ip: clientIp,
                        balance: 0,
                        wallet_address: address,
                        created_at: new Date()
                    });
                    user.save();
                    wallet_schema = new WalletSchema({
                        amount: 0,
                        address: address,
                        created_at: new Date()
                    });
                    wallet_schema.save();
                    var response_data = { balance: 0, wallet_address: address };
                    res.status(201).json({ success: true, data: response_data });
                });
            }
        });
    } catch (error) {
        console.log("userController-401", error);
        res.status(401).json({ success: false, error: error });
    }
}

module.exports.saveBalance = async function(req, res) {
    try {
        user = new UserSchema({
            balance: req.body.balance,
        });
        user.save("user_id = '" + req.body.uuid + "'");
        res.status(201).json({ success: true });
    } catch (error) {
        console.log("userController-401", error);
        res.status(401).json({ success: false, error: error });
    }
}

module.exports.signup = async function(req, res) {
    try {
        const clientIp = requestIp.getClientIp(req);
        console.log("client-ip: ", clientIp);
        user = new UserSchema({
            user_id: req.body.uuid,
            ip: clientIp,
            balance: 100,
        });
        user.save();
        res.status(201).json({ success: true });
    } catch (error) {
        console.log("userController-401", error);
        res.status(401).json({ success: false, error: error });
    }
}