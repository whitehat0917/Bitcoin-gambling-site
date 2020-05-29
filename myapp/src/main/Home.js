import React from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
// import { setBitcoinAddress } from '../store/actions';
// import axios from "axios";

import { connect } from 'react-redux';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // async componentDidMount() {
  //   try {
  //     // const response = await axios.post('http://localhost:8080/api/users/login', { uuid: this.props.uuid });
  //     const response = await axios.post('http://localhost:8080/api/users/login', { uuid: "232d3b6-852a-f0f4-3af-504ca380db3" });
  //     this.props.dispatch(setBitcoinAddress(response.data.data.wallet_address));
  //     console.log('👉 Returned data:', response);
  //   } catch (e) {
  //     console.log(`😱 Axios request failed: ${e}`);
  //   }

  // }

  render() {
    return (
      <div className="mainScreen background1">
        <Header />
        <Content />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => state.game;

export default connect(mapStateToProps)(Home);
