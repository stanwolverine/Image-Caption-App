import React, { useState } from 'react';

export default function AddText(props) {
  const [caption, setCaption] = useState('');

  const handleChange = e => {
    setCaption(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.addTextToCanvas(caption);
    setCaption('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        id='caption-box'
        placeholder='type caption'
        value={caption}
        onChange={handleChange}
      />
      <button>Add caption</button>
    </form>
  );
}
