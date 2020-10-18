import React, { Component} from 'react';
import './RigListPage.css';
import RigListItem from '../../components/RigListItem/RigListItem';
import pedalService from '../../utils/pedalService';
import rigService from '../../utils/rigService';


class RigListPage extends Component {
  async componentDidMount() {
    const pedals = await pedalService.index();
    const rigs = await rigService.index();
    this.props.handleLoadPedals(pedals);
    this.props.handleLoadRigs(rigs);
  }
  render() {
  return (
    <>
      {!this.props.user  ? (
        <></>
      ) : (
        <>
          <h1>Rig List</h1>
          <div className="RigListPage-grid">
            {this.props.rigs.map((rig) => (
              <RigListItem
                rig={rig}
                handleDeleteRig={this.props.handleDeleteRig}
                key={rig._id}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}}

export default RigListPage;
