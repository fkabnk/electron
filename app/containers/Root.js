// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Home from '../components/Home';
import { ThemeProvider } from 'styled-components';
import safemateDark from "../components/themes/safemateDark";

type Props = {
  store: {},
  history: {}
};

export default class Root extends Component<Props> {
  render() {
    return (
      <Provider store={this.props.store}>
      
      <ThemeProvider theme={safemateDark}>
        <ConnectedRouter history={this.props.history}>
            <Home />
        </ConnectedRouter>
        </ThemeProvider>
      </Provider>
    );
  }
}
