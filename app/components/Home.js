// @flow
import React, { Component } from 'react';
import { Link, Route, Redirect, Switch, withRouter } from 'react-router-dom';
import Axios from "axios";
import { connect } from 'react-redux';

import Navigation from "./header"
import Login from "./login";
import Safemates from "./safemates";
import Safemate from "./safemate";
import Homepage from "./Homepage";

import SafemateSvg from './svg/safemate';
import styled from 'styled-components';
var exec = require('child_process').exec, child;

const menu = [
  {
    link:"/safemates",
    text:"Safemates",
    picture:<SafemateSvg/>
  },
  {
    link:"/home",
    text:"Home",
    picture:<SafemateSvg/>
  }
]


const Temp3 = () => {
  return(
    <div>TEMP 3</div>
  )
}

const Container = styled.div`

  margin:5% 10%;
  background: ${props => props.theme.colors.backgroundPrimary};
  border: ${props => props.theme.colors.border};

`;


class Home extends React.Component {

    constructor(props){
      super(props);
    }
  
    render(){

      console.log(this.props.active.location.pathname)
      const currentRoute = this.props.active.location.pathname

      return (
        <div>
        {currentRoute != "/login" ? <Navigation menu={menu}/> : null}
        <Switch>
          <Route exact path="/home" component={Homepage}/>
          <Route exact path="/login" component={Login}/>
          <Route path ="/safemates" component={Safemates}/>
          <Route path ="/safemate" component={Safemate}/>
          <Route path ="/temp3" component={Temp3}/>
          <Redirect to="/home"/>
        </Switch>
        </div>
      );
    }
  
}

const mapStateToProps = state => {
  console.log(state)
  return{
    active: state.router
  }
}

export default withRouter(connect(mapStateToProps)(Home));
