import React from 'react';
import utils from '../math.utils';

const StarListComponent = (props) => (
  <>
    {utils.range(1, props.starsCount).map((starId) => (
      <div key={starId} className="star" />
    ))}
  </>
);

export default StarListComponent;
