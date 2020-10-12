import React from 'react';
import PedalCard from '../../components/PedalCard/PedalCard';

function PedalDetailPage(props) {
  const pedal = props.location.state.pedal;
  return (
    <>
      <h1>Pedal Details</h1>
      <PedalCard key={pedal._id} pedal={pedal} />
    </>
  );
}

export default PedalDetailPage;
