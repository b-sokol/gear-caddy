import React from 'react';
import './PedalListPage.css';
import PedalListItem from '../../components/PedalListItem/PedalListItem';

function PedalListPage(props) {
  return (
    <>
      {!props.user ? (
        <></>
      ) : (
        <>
          <h1>Pedal List</h1>
          <div className="PedalListPage-grid">
            {props.pedals.map((pedal) => (
              <PedalListItem
                pedal={pedal}
                handleDeletePedal={props.handleDeletePedal}
                key={pedal._id}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default PedalListPage;
