import React from 'react';
import { Link } from 'react-router-dom';

function RigCard({ rig }) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">{rig.name}</h3>
      </div>
      <div className="panel-body">
        <h4>Chains</h4>
        <dl>
          {rig.chains.map((chain) => {
            if (chain.name !== 'Unused') {
              return (
                <>
                  <dt>{chain.name}</dt>
                  <dd>Pedal Count: {chain.pedals.length}</dd>
                </>
              );
            }
          })}
        </dl>
      </div>
      <div className="panel-footer">
        <Link to="/rigs">RETURN TO LIST</Link>
      </div>
    </div>
  );
}

export default RigCard;
