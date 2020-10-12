import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch, NavLink, Redirect } from 'react-router-dom';
import pedalService from '../../utils/pedalService';
import PedalListPage from '../../pages/PedalListPage/PedalListPage';
import AddPedalPage from '../../pages/AddPedalPage/AddPedalPage';
import PedalDetailPage from '../../pages/PedalDetailPage/PedalDetailPage';
import EditPedalPage from '../../pages/EditPedalPage/EditPedalPage';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../../pages/SignupPage/SignupPage';
import userService from '../../utils/userService';

class App extends Component {
  state = {
    pedals: [],
    user: userService.getUser(),
  };

  handleAddPedal = async (newPedalData) => {
    const newPedal = await pedalService.create(newPedalData);
    this.setState(
      (state) => ({
        pedals: [...state.pedals, newPedal],
      }),
      () => this.props.history.push('/')
    );
  };

  handleUpdatePedal = async (updatedPedalData) => {
    const updatedPedal = await pedalService.update(updatedPedalData);
    const newPedalsArray = this.state.pedals.map((p) =>
      p._id === updatedPedal._id ? updatedPedal : p
    );
    this.setState({ pedals: newPedalsArray }, () =>
      this.props.history.push('/')
    );
  };

  handleDeletePedal = async (id) => {
    await pedalService.deleteOne(id);
    this.setState(
      (state) => ({
        pedals: state.pedals.filter((p) => p._id !== id),
      }),
      () => this.props.history.push('/')
    );
  };

  handleSignupOrLogin = () => {
    this.setState({
      user: userService.getUser(),
    });
    console.log(this.state.user);
  };

  async componentDidMount() {
    const pedals = await pedalService.index();
    this.setState({ pedals });
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Gear Caddy
          <nav>
            {this.state.user ? (
              <>
                <NavLink exact to="/">
                  Pedals LIST
                </NavLink>
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to="/add">
                  ADD Pedal
                </NavLink>
                &nbsp; &nbsp;&nbsp;
                <Link to="" onClick={this.handleLogout}>
                  LOG OUT
                </Link>
                &nbsp;&nbsp;&nbsp;
              </>
            ) : (
              <>
                <NavLink exact to="/login">
                  LOG IN
                </NavLink>
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to="/signup">
                  SIGN UP
                </NavLink>
              </>
            )}
          </nav>
        </header>
        <main>
          {this.state.user ? (
            <h2>Welcome, {this.state.user.username}</h2>
          ) : (
            <h2>You are not logged in!</h2>
          )}
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <PedalListPage
                  user={this.state.user}
                  pedals={this.state.pedals}
                  handleDeletePedal={this.handleDeletePedal}
                />
              )}
            />
            <Route
              exact
              path="/add"
              render={() => (
                <AddPedalPage handleAddPedal={this.handleAddPedal} />
              )}
            />
            <Route
              exact
              path="/details"
              render={({ location }) => <PedalDetailPage location={location} />}
            />
            <Route
              exact
              path="/edit"
              render={({ location }) => (
                <EditPedalPage
                  handleUpdatePedal={this.handleUpdatePedal}
                  location={location}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={({ history }) => (
                <SignupPage
                  history={history}
                  handleSignupOrLogin={this.handleSignupOrLogin}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={({ history }) => (
                <LoginPage
                  history={history}
                  handleSignupOrLogin={this.handleSignupOrLogin}
                />
              )}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
