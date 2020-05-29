import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import '../styles/header.scss';
import Logo from "../images/logo.png";

class Header extends React.Component {
	constructor(props) {
    super(props);
    this.setSate = {

    }
  }
	
  componentDidMount() {
		// const { uuid } = this.props;
		// console.log('uuid in Headerpage ==> ', uuid);
  }

  render() {
    const link = '/play/' + this.props.uuid;
    return (
      <div className="header">
        <div className = "header-title">
          <div className="header-alert text-center justify-center">
            <p>LIMITED TIME OFFER! Deposit now and get 1mBTC Bonus</p>
          </div>
        </div>
        <div className="header-container">
          <div className="logo-div">
            <img src={Logo} alt="Logo"/>
          </div>
          <ul className="nav-bar">
            <li className="nav-link-play">
              <Link to={link}> Play now </Link>
            </li>
            <li className="nav-link-help">
              <Link to="/help"> Help </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => state.game;

export default connect(mapStateToProps)(Header);
