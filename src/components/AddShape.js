import React from 'react';

export default function AddShape(props) {
  const { handleClick } = props;
  return (
    <div>
      <input
        type='submit'
        name='circle'
        value='Add circle'
        style={{ marginRight: '1.5rem' }}
        onClick={handleClick}
      />

      <input
        type='submit'
        name='rectangle'
        value='Add rectangle'
        style={{ marginRight: '1.5rem' }}
        onClick={handleClick}
      />

      <input
        type='submit'
        name='triangle'
        value='Add triangle'
        style={{ marginRight: '1.5rem' }}
        onClick={handleClick}
      />

      <input
        type='submit'
        name='polygon'
        value='Add polygon'
        style={{ marginRight: '1.5rem' }}
        onClick={handleClick}
      />
    </div>
  );
}
