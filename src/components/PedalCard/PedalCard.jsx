import React from 'react';
import { Link } from 'react-router-dom';

function PedalCard({ pedal }) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">
          {pedal.make} {pedal.model}
        </h3>
      </div>
      <div className="panel-body">
        <dl>
          <dt>Year</dt>
          <dd>{pedal.year}</dd>
          <dt>Type</dt>
          <dd>{pedal.type}</dd>
          <dt>Serial Number</dt>
          <dd>{pedal.serial}</dd>
          <dt>Has FX Loop?</dt>
          <dd>{pedal.hasFXLoop}</dd>
          <dt>In An FX Loop?</dt>
          <dd>{pedal.inFXLoop}</dd>
        </dl>
      </div>
      <div className="panel-footer">
        <Link to="/">RETURN TO LIST</Link>
      </div>
    </div>
  );
}

export default PedalCard;
