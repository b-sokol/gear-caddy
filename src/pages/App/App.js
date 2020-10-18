import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch, NavLink, Redirect } from 'react-router-dom';
import pedalService from '../../utils/pedalService';
import PedalListPage from '../../pages/PedalListPage/PedalListPage';
import AddPedalPage from '../../pages/AddPedalPage/AddPedalPage';
import PedalDetailPage from '../../pages/PedalDetailPage/PedalDetailPage';
import EditPedalPage from '../../pages/EditPedalPage/EditPedalPage';
import rigService from '../../utils/rigService';
import RigListPage from '../../pages/RigListPage/RigListPage';
import AddRigPage from '../../pages/AddRigPage/AddRigPage';
import RigDetailPage from '../../pages/RigDetailPage/RigDetailPage';
import EditRigPage from '../../pages/EditRigPage/EditRigPage';
import OrganizeRigPage from '../../pages/OrganizeRigPage/OrganizeRigPage';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../../pages/SignupPage/SignupPage';
import userService from '../../utils/userService';

class App extends Component {
  constructor() {
    super();
    this.state = {
      ...this.getInitialState(),
      user: userService.getUser(),
    };
  }

  getInitialState() {
    return {
      pedals: [],
      rigs: [],
    };
  }

  handleLoadPedals = (pedals) => {
    this.setState({ pedals });
  };

  handleLoadRigs = (rigs) => {
    this.setState({ rigs });
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

  handleAddRig = async (newRigData) => {
    const newRig = await rigService.create(newRigData);
    this.setState(
      (state) => ({
        rigs: [...state.rigs, newRig],
      }),
      () => this.props.history.push('/rigs')
    );
  };

  handleUpdateRig = async (updatedRigData) => {
    const updatedRig = await rigService.update(updatedRigData);
    const newRigsArray = this.state.rigs.map((r) =>
      r._id === updatedRig._id ? updatedRig : r
    );
    this.setState({ rigs: newRigsArray }, () =>
      this.props.history.push('/rigs')
    );
  };

  handleDeleteRig = async (id) => {
    await rigService.deleteRig(id);
    this.setState(
      (state) => ({
        rigs: state.rigs.filter((r) => r._id !== id),
      }),
      () => this.props.history.push('/rigs')
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
    const rigs = await rigService.index();
    this.setState({ pedals, rigs });
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ ...this.getInitialState(), user: null });
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
                <NavLink exact to="/rigs">
                  Rigs LIST
                </NavLink>
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to="/add">
                  ADD Pedal
                </NavLink>
                &nbsp; &nbsp;&nbsp;
                <NavLink exact to="/rigs/add">
                  ADD Rig
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
              render={() =>
                userService.getUser() ? (
                  <PedalListPage
                    user={this.state.user}
                    pedals={this.state.pedals}
                    handleLoadPedals={this.handleLoadPedals}
                    handleDeletePedal={this.handleDeletePedal}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/rigs"
              render={() =>
                userService.getUser() ? (
                  <RigListPage
                    user={this.state.user}
                    rigs={this.state.rigs}
                    pedals={this.state.pedals}
                    handleLoadPedals={this.handleLoadPedals}
                    handleLoadRigs={this.handleLoadRigs}
                    handleDeleteRig={this.handleDeleteRig}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/add"
              render={() =>
                userService.getUser() ? (
                  <AddPedalPage handleAddPedal={this.handleAddPedal} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/details"
              render={({ location }) =>
                userService.getUser() ? (
                  <PedalDetailPage location={location} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/edit"
              render={({ location }) =>
                userService.getUser() ? (
                  <EditPedalPage
                    handleUpdatePedal={this.handleUpdatePedal}
                    location={location}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/rigs/add"
              render={() =>
                userService.getUser() ? (
                  <AddRigPage
                    pedals={this.state.pedals}
                    handleAddRig={this.handleAddRig}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/rigs/details"
              render={({ location }) =>
                userService.getUser() ? (
                  <RigDetailPage
                    pedals={this.state.pedals}
                    location={location}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/rigs/edit"
              render={({ location, history }) =>
                userService.getUser() ? (
                  <EditRigPage
                    location={location}
                    history={history}
                    user={this.state.user}
                    pedals={this.state.pedals}
                    handleUpdateRig={this.handleUpdateRig}
                    handleLoadPedals={this.handleLoadPedals}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/rigs/organize"
              render={({ location, history }) =>
                userService.getUser() ? (
                  <OrganizeRigPage
                    location={location}
                    history={history}
                    user={this.state.user}
                    pedals={this.state.pedals}
                    handleUpdateRig={this.handleUpdateRig}
                    handleLoadPedals={this.handleLoadPedals}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
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
