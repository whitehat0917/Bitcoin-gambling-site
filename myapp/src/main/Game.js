import React from 'react';
import { connect } from 'react-redux';
import { FaCertificate } from 'react-icons/fa';
import axios from "axios";
import Board from './Board';
import BitcoinModal from './BitcoinModal';
import config from '../setting/config';
import difficultyData from "../setting/difficulty";
import { toggle, init, changeDifficulty, gameover, clear, changeBalance, setBitcoinAddress, changeUuid, changeBackground } from '../store/actions';
import Header from './Header';
import '../styles/Game.scss';
import BombImage from "../images/bomb.png";

class Game extends React.Component {
  constructor(props) {
    super(props);
    const { difficulty} = this.props;
    this.state = {
      board: this._initBoard(difficulty),
      difficulty_array: difficultyData,
      balance: 0,
      rate: 0,
      initStake: 0,
      gain: 0,
      processing: false,
      modalShow: false,
      uuid: "",
      difficulty: difficulty,
      gameHash: "",
      bitcoinErrorMessage: "",
      gameDisplayMessage: ["Share this game www.Bit-explode.com"],
      background: 1
    }
    this.handleStart = this.handleStart.bind(this);
    this.handleClickCell = this.handleClickCell.bind(this);
    this.handleRightClickCell = this.handleRightClickCell.bind(this);
    this.handleStakeChange = this.handleStakeChange.bind(this);
    this.handleClickCashout = this.handleClickCashout.bind(this);
    this.handleChangeBalance = this.handleChangeBalance.bind(this);
    this.handleSetBitcoinAddress = this.handleSetBitcoinAddress.bind(this);
    this.handleChangeDifficulty = this.handleChangeDifficulty.bind(this);
    this.plusInitStake = this.plusInitStake.bind(this);
    this.doubleInitStake = this.doubleInitStake.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
    this.handleDeposit = this.handleDeposit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.props.dispatch(changeUuid(this.props.match.params.id));
  }

  _initBoard(difficulty) {
    const { boardWidth, boardHeight } = config[difficulty]
    const board = Array.from(
      new Array(boardWidth), () => new Array(boardHeight).fill(
        { bomb: false, bombCount: 0, open: false, flagged: false, guess: 0 }
      )
    )
    return board;
  }

  handleChangeDifficulty(event) {
    const value = event.target.dataset.set;
    this.props.dispatch(changeDifficulty(value));
    this.setState({ difficulty: value });
    const difficulty_array = this.state.difficulty_array;
    for (let item of difficulty_array) {
      item.active = false;
      if (item.value == value)
        item.active = true;
    }
    this.setState({difficulty_array: difficulty_array});
  }

  handleStakeChange(e) {
    let initStake = e.target.value;
    if (initStake > this.state.balanace) {
      alert('You can input the bigger amount than your balance');
      return;
    }
    this.setState({
      initStake: parseInt(e.target.value)
    })
  }

  handleClickCashout() {
    if (this.props.gameover){
      return;
    }
    this.cashOut();
    const { balance, gain } = this.state;
    this.handleChangeBalance(balance + gain);
    this.setState({
      gameDisplayMessage: this.state.gameDisplayMessage.concat("Cashed out "+gain+" practice bits.")
    })
    this.setState({
      processing: false,
    })
  }
  
  handleChangeBalance(balance) {
    this.props.dispatch(changeBalance(balance));
    this.setState({
      balance: balance,
    })
  }

  handleSetBitcoinAddress(address) {
    this.props.dispatch(setBitcoinAddress(address));
    this.setState({
      bitcoinAddress: address,
    })
  }

  handleStart(e) {
    this.setState({
      gameDisplayMessage: new Array("Share this game www.Bit-explode.com")
    })
    this.props.dispatch(clear(false));
    const { initStake, balance } = this.state;
    const { difficulty } = this.props;
    if (initStake === 0) {
      alert('You must set initial Stake');
      return;
    }
    if (initStake > balance) {
      alert("You can't set the bigger initial Stake than balance");
      return;
    }
    this.setState({background: 1});
    e.preventDefault();
    this.handleChangeBalance(balance - initStake);
    this.setState({
      board: this._initBoard(difficulty),
      processing: true,
      gain: initStake,
    });
    this.props.dispatch(gameover(false));
    this.gameStart();
  }

  handleClickCell(x, y) {
    const { gameover, clear } = this.props;
    if (!this.state.processing){
      this.setState({
        gameDisplayMessage: this.state.gameDisplayMessage.concat("No game has started yet.")
      })
      return;
    }
    if (gameover || clear) return;
    this.clickCell(x, y);
    // this._open(x, y);
  }

  handleRightClickCell(x, y) {
    const { gameover, clear } = this.props;
    if (gameover || clear || !this.state.processing) {
      return;
    }
    this._toggleFlag(x, y);
  }

  changeDifficulty(e) {
    const difficulty = e.target.value;
    this.props.dispatch(changeDifficulty(difficulty));
    this.setState({ difficulty: difficulty });
  }

  _open(x, y) {
    const board = [].concat(this.state.board);
    if (!board[x][y].open) {
      board[x][y] = Object.assign({}, board[x][y], { open: true, bombCount: 0 });
      this.setState({ board });
      if (board[x][y].flagged) {
        this._toggleFlag(x, y);
      }
      if (board[x][y].bomb) {
        this.setState({background: 3});
        this.props.dispatch(gameover(true));
        this.setState({
          processing: false,
          gain: 0,
        });
        return;
      }
      const { balance, gain, rate } = this.state;
      
      if (this._isClear(board)) {
        this.props.dispatch(clear(true));
        this.handleChangeBalance(gain + balance);
        this.setState({
          processing: false,
        });
        this.setState({
          gameDisplayMessage: this.state.gameDisplayMessage.concat("You found all bits.").concat("You get "+(gain+balance)+" bits.")
        })
      }
    }
  }

  _isClear(board) {
    let openCount = 0;
    const { difficulty } = this.props;
    const { boardWidth, boardHeight, bombNum } = config[difficulty];
    board.forEach((row, i) => {
      row.forEach((cell, i) => {
        if (cell.open) {
          openCount++;
        }
      })
    })
    return openCount === (boardWidth * boardHeight - bombNum);
  }

  _toggleFlag(x, y) {
    const board = [].concat(this.state.board);
    const { flagged } = board[x][y];
    board[x][y] = Object.assign({}, board[x][y], { flagged: !flagged });
    this.setState({ board });
    // this.props.dispatch(toggle(!flagged));
  }

  plusInitStake(){
    const initStake = this.state.initStake;
    this.setState({initStake: initStake+100});
  }

  doubleInitStake(){
    const initStake = this.state.initStake;
    this.setState({initStake: initStake*2});
  }

  handleShowModal = () => {
    this.setState({ modalShow: true });
  }
  
  handleHideModal = () => {
    this.setState({ modalShow: false });
  }

  handleDeposit = () => {
    this.getBalance();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formdata = new FormData(form);
    const data = {};

    for (let name of formdata.keys()) {
      const input = form.elements[name];
      data[name] = input.value;
    }
    this.withDraw(data);
  }

  async componentDidMount() {
    this.setState({ uuid: this.props.match.params.id });
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', { uuid: this.props.match.params.id });
      this.handleSetBitcoinAddress(response.data.data.wallet_address);
      this.handleChangeBalance(response.data.data.balance);
      console.log('👉 Returned data:', response);
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
    }
  }

  async getBalance() {
    const res = await axios.post('http://localhost:8080/api/bitcoin/deposit', { address: this.state.bitcoinAddress });
    this.setState({ bitcoinErrorMessage: res.data.status });
    if (res.data.success === true){
        this.handleChangeBalance(this.state.balance + res.data.extra_balance);
    }
  }

  async gameStart() {
    const {bombNum} = config[this.state.difficulty];
    const res = await axios.post('http://localhost:8080/api/bitcoin/gameStart', { uuid: this.state.uuid, bomb_count: bombNum, initStake: this.state.initStake });
    if (res.data.success === true){
        this.setState({rate: res.data.next});
        this.setState({gameHash: res.data.game_hash});
    }else{
        alert(res.data.status);
    }
  }

  async clickCell(x, y) {
    const guessPlace = y * 5 + x + 1;
    const res = await axios.post('http://localhost:8080/api/bitcoin/clickCell', { game_hash: this.state.gameHash, guess_place: guessPlace, guess_amount: this.state.rate});
    if (res.data.success === true){
        if (res.data.game_status === false){
            this.setState({
              gameDisplayMessage: this.state.gameDisplayMessage.concat("Gameover!")
            })
            const board = [].concat(this.state.board);
            let bombPlaces = res.data.bombPlaces.split("-");
            for (let i=0;i<bombPlaces.length;i++){
                let x = parseInt((bombPlaces[i]-1)%5);
                let y = parseInt((bombPlaces[i]-1)/5);
                board[x][y] = Object.assign({}, board[x][y], { bomb: true })
            }
            this.setState({board: board});
            this._open(x, y);
        }else{
          this.setState({background: 2});
          this.setState({
            gameDisplayMessage: this.state.gameDisplayMessage.concat("You found "+this.state.rate+" bits in tile "+guessPlace)
          });
          const board = [].concat(this.state.board);
          board[x][y] = Object.assign({}, board[x][y], { guess: this.state.rate });
          this.setState({board: board});
          this.setState({rate: res.data.next});
          this._open(x, y);
          const { gain } = this.state;
          this.setState({
            gain: gain + res.data.prev,
          })
        }
    }else{
        alert(res.data.status);
    }
  }

  async cashOut() {
    const res = await axios.post('http://localhost:8080/api/bitcoin/cashOut', { game_hash: this.state.gameHash });
    // alert(res.data.status);
  }

  async withDraw(data) {
    data.uuid = this.state.uuid;
    data.amount = parseInt(data.amount) / 1000000;
    const res = await axios.post('http://localhost:8080/api/bitcoin/withDraw', { data: data});
    this.setState({ bitcoinErrorMessage: res.data.status });
    if (res.data.success === true){
        this.handleChangeBalance(this.state.balance - res.data.extra_balance);
    }
  }

  render() {
    let { board, balance, initStake, gain } = this.state;
    balance = Number((balance).toFixed(0));
    gain = Number.parseFloat(gain).toFixed(2);
    const { difficulty, gameover, clear, bomb } = this.props;
    let status = <span className="status"></span>
    if (gameover) {
      status = <span id="gameover" className="status">Gameover</span>
    } else if (clear) {
      status = <span id="clear" className="status">Clear!</span>
    }
    const difficultyItems = this.state.difficulty_array.map(item => <li key={item.count}><a data-set={item.value} className={item.active == true ? 'active':''} onClick={(e) => this.handleChangeDifficulty(e)}>{item.count}</a></li>)
    const showMessage = this.state.gameDisplayMessage.map(item => <p>{item}</p>)

    return (
      <div className={this.state.background == 1?"mainScreen background-1":this.state.background == 2?"mainScreen background-2":"mainScreen background-3"}>
        <Header />
        <div id="game">
          <div className="board-wrapper">
            <div className="header-wrapper">
              <div className={this.state.background == 1?"difficulty-wrapper wrapper-background1":this.state.background == 2?"difficulty-wrapper wrapper-background2":"difficulty-wrapper wrapper-background3"}>
                <span>Bombs</span>
                <ul>
                  {difficultyItems}
                </ul>
              </div>
              <div className="bomb-wrapper"></div>
            </div>
            <Board
              stake={gain}
              board={board}
              next={this.state.rate}
              processing = {this.state.processing}
              onClick={this.handleClickCell}
              onRightClick={this.handleRightClickCell}
              handleClickCashout={this.handleClickCashout}
            />
            <div className="header-wrapper pt-1 width-95">
              <div className={this.state.background == 1?"input-wrapper wrapper-background1":this.state.background == 2?"input-wrapper wrapper-background2":"input-wrapper wrapper-background3"}>
                <input type="number" className="stake white" value={initStake} onChange={(e) => this.handleStakeChange(e)}/>
              </div>
              <div className="plus-balance-wrapper text-center" style={{fontSize: '1.9rem'}} onClick={this.plusInitStake}>+</div>
              <div className="plus-balance-wrapper text-center font-bold" style={{fontSize: '1.2rem'}} onClick={this.doubleInitStake}>x2</div>
            </div>
            <div className="header-wrapper pt-1 width-96">
              <div className="play-wrapper text-center font-bold" onClick={this.handleStart}>Play</div>
              <div className={"cashout-wrapper text-center font-bold " + this.props.gameover} onClick={this.handleClickCashout}>Cashout</div>
            </div>
          </div>
          <div className="history-wrapper">
            <div className={this.state.background == 1?"balance-wrapper text-center wrapper-background1":this.state.background == 2?"balance-wrapper text-center wrapper-background2":"balance-wrapper text-center wrapper-background3"}>
              <span className="balance-label">Balance</span>
              <span className="balance"> {balance} </span>
            </div>
            <div className="header-wrapper">
              <div className="withdraw-wrapper text-center font-bold" onClick={this.handleShowModal}>Withdraw</div>
              <div className="deposit-wrapper text-center font-bold" onClick={this.handleShowModal}>Deposit</div>
            </div>
            <div className={this.state.background == 1?"history-detail-wrapper wrapper-background1":this.state.background == 2?"history-detail-wrapper wrapper-background2":"history-detail-wrapper wrapper-background3"}>
              <span className="history-label">History</span>
            </div>
            <div className={this.state.background == 1?"message-wrapper wrapper-background1":this.state.background == 2?"message-wrapper wrapper-background2":"message-wrapper wrapper-background3"}>
              <span className="message-label">Bit-explode</span>
              {showMessage}
            </div>
            <div className="footer-wrapper">
              <div className={this.state.background == 1?"rate-wrapper wrapper-background1":this.state.background == 2?"rate-wrapper wrapper-background2":"rate-wrapper wrapper-background3"}>
                <span className="span-label">Next</span>
                <span className="span-content"> {this.state.rate} </span>
              </div>
              <div className={this.state.background == 1?"stake-wrapper wrapper-background1":this.state.background == 2?"stake-wrapper wrapper-background2":"stake-wrapper wrapper-background3"}>
                <span className="span-label">Stake</span>
                <span className="span-content"> {this.state.gain} </span>
              </div>
            </div>
          </div>
          <BitcoinModal 
              show={this.state.modalShow} 
              balance={this.state.balance}
              address={this.props.bitcoinAddress} 
              errorMessage = {this.state.bitcoinErrorMessage}
              handleClose={this.handleHideModal} 
              handleDeposit={this.handleDeposit}>
            </BitcoinModal>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => state.game;

export default connect(mapStateToProps)(Game);
