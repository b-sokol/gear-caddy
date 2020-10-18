import React, { Component } from 'react';
import './PedalListPage.css';
import PedalListItem from '../../components/PedalListItem/PedalListItem';
import pedalService from '../../utils/pedalService';

class PedalListPage extends Component {
  async componentDidMount() {
    const pedals = await pedalService.index();
    this.props.handleLoadPedals(pedals);
  }
  render() {
    return (
      <>
        {!this.props.user ? (
          <></>
        ) : (
          <>
            <h1>Pedal List</h1>
            <div className="PedalListPage-grid">
              {this.props.pedals.map((pedal) => (
                <PedalListItem
                  pedal={pedal}
                  handleDeletePedal={this.props.handleDeletePedal}
                  key={pedal._id}
                />
              ))}
            </div>
          </>
        )}
      </>
    );
  }
}

export default PedalListPage;
