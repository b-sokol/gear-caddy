import React from 'react';
import RigCard from '../../components/RigCard/RigCard';

function RigDetailPage(props) {
  const rig = props.location.state.rig;
  return (
    <>
      <h1>Rig Details</h1>
      <RigCard key={rig._id} rig={rig}/>
    </>
  );
}

export default RigDetailPage;
