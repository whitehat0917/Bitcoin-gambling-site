import React from 'react';
import Tabs from './SubComponents/Tabs';
import '../styles/Tab.css';
import '../styles/BitcoinModal.scss';

export default class BitcoinModal extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const showHideClassName = this.props.show ? 'modal display-block' : 'modal display-none';
    return (
      <div className={showHideClassName}>
        <section className='modal-main'>
          <Tabs>
            <div label="Deposit">
              <p>Deposit bitcoins to:</p>
              <p>{this.props.address}</p>
              <div className="addr_details">
                <ul className="addr_links">
                  <li>View On:</li>
                  <li><a target="_blank" href="https://blocktrail.com/BTC/address/1QBBNHFobqJK7M4UfT1jVzuEeg51aDv3Lq" rel="noopener noreferrer">Blocktrail</a></li>
                  <li><a target="_blank" href="http://btc.blockr.io/address/info/1QBBNHFobqJK7M4UfT1jVzuEeg51aDv3Lq" rel="noopener noreferrer">blockr.io</a></li>
                  <li><a target="_blank" href="http://blockchain.info/address/1QBBNHFobqJK7M4UfT1jVzuEeg51aDv3Lq" rel="noopener noreferrer">blockchain.info</a></li>
                </ul>
              </div>
              <p>{this.props.errorMessage}</p>
              {/* <button onClick={this.props.handleClose}>Cancel</button> */}
              <button onClick={this.handleClick}>Cancel</button>
              <button onClick={this.props.handleDeposit}>I deposited</button>
            </div>
            <div label="Withdraw">
              <p>You have <strong className="out_bits">{this.props.balance}</strong> bits. That's exactly <strong>Ƀ
                <span className="out_bitcoins">{this.props.balance*0.000001}</span></strong>
              </p>
              <form onSubmit={this.props.handleSubmit}>
                <label htmlFor="amount">Amount: </label>
                <input name="amount" type="number" min = "100" max = {this.props.balance} required/>
                <label htmlFor="payto_address">To address: </label>
                <input name="payto_address" type="text" required/>
                <p>{this.props.errorMessage}</p>
                <input type="submit" className="line_btn line_btn_green withdraw" value = "Withdraw"/>
              </form>
              <button onClick={this.props.handleClose}>Cancel</button>
              <div className="withdraw_messages"><p className="error">You must supply a Bitcoin address to withdraw to.</p></div>
            </div>
          </Tabs>
        </section>
      </div>
    )
  }
}
