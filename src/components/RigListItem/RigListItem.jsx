import React from 'react';
import { Link } from 'react-router-dom';
import './RigListItem.css';

function RigListItem({ rig, handleDeleteRig }) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">
          {rig.name}
        </h3>
      </div>
      <div className="panel-footer RigListItem-action-panel">
        <Link
          className="btn btn-xs btn-info"
          to={{
            pathname: 'rigs/details',
            state: { rig },
          }}
        >
          DETAILS
        </Link>
        <Link
          className="btn btn-xs btn-warning"
          to={{
            pathname: 'rigs/edit',
            state: { rig  },
          }}
        >
          EDIT
        </Link>
        <Link
          className="btn btn-xs btn-warning"
          to={{
            pathname: 'rigs/organize',
            state: { rig },
          }}
        >
          ORGANIZE
        </Link>
        <button
          className="btn btn-xs btn-danger margin-left-10"
          onClick={() => handleDeleteRig(rig._id)}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}

export default RigListItem;
