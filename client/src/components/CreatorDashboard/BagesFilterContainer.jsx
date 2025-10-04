import React from 'react';

const BagesFilterContainer = ({
  creatorFilter,
  changePredicate,
  bagesParams,
}) => {
  const mapBages =b =>
    creatorFilter[b.name] && (
      <li key={b.name}>
        {b.label}
        <button
          onClick={() => {
            changePredicate({
              name: b.name,
              value: b.defaultValue,
            });
          }}
        >
          X
        </button>
      </li>
    );
  return (
    <div>
      {' '}
      <ul>{bagesParams.map(mapBages)}</ul>
      
    </div>
  );
};

export default BagesFilterContainer;
