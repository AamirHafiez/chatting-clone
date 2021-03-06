import React, { Component } from "react";
import LoginContainer from "./LoginContainer";
import ChatListContainer from "./ChatListContainer";

import { NotificationContainer } from "react-notifications";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "../assets/css/App.css";
import "react-notifications/lib/notifications.css";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      count: 1
    };
  }

  increaseCount = () => {
    this.setState(prevState => {
      return {
        count: prevState.count + 1
      }
    });
  }

  setUser = (user) => {
    this.setState({
      user,
    });
  };

  render() {
    const { user, count } = this.state;
    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <LoginContainer {...this.props} setUser={this.setUser} user={user}/>
              )}
            />
            <Route path="/chatlist">
              <ChatListContainer count={count} increaseCount={this.increaseCount} user={user}/>
            </Route>
          </Switch>
        </Router>
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
