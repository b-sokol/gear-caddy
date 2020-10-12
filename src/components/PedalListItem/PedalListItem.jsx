import React from 'react';
import { Link } from 'react-router-dom';
import './PedalListItem.css';

function PedalListItem({ pedal, handleDeletePedal }) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">
          {pedal.make} {pedal.model}
        </h3>
      </div>
      <div className="panel-footer PedalListItem-action-panel">
        <Link
          className="btn btn-xs btn-info"
          to={{
            pathname: '/details',
            state: { pedal },
          }}
        >
          DETAILS
        </Link>
        <Link
          className="btn btn-xs btn-warning"
          to={{
            pathname: '/edit',
            state: { pedal },
          }}
        >
          EDIT
        </Link>
        <button
          className="btn btn-xs btn-danger margin-left-10"
          onClick={() => handleDeletePedal(pedal._id)}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}

export default PedalListItem;
