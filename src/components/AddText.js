import React, { useState } from 'react';
import FontPicker from 'font-picker-react';
import { SketchPicker } from 'react-color';

const GOOGLE_FONTS_API_KEY = 'AIzaSyArBs4YdX-CR-Mv2E-jTsubpzzGwVf341k';

export default function AddText(props) {
  const [caption, setCaption] = useState('');
  const [fontColor, setFontColor] = useState('#fff');
  const [fontFamily, setFontFamily] = useState('Fjalla One');

  const handleCaptionChange = e => {
    setCaption(e.target.value);
  };

  const handleFontChange = e => {
    setFontFamily(e.family);
  };

  const handleFontColor = color => {
    setFontColor(color.hex);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.addTextToCanvas({ caption, fontFamily, fontColor });
    setCaption('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        style={{ marginBottom: '1rem' }}
        type='text'
        id='caption-box'
        placeholder='type caption'
        required
        value={caption}
        onChange={handleCaptionChange}
      />
      <div
        className='handle-fontFamily'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}
      >
        <FontPicker
          apiKey={GOOGLE_FONTS_API_KEY}
          activeFontFamily={fontFamily}
          onChange={handleFontChange}
        />
        <h2 style={{ fontFamily, marginLeft: '2rem' }}>This is Sample text.</h2>
      </div>
      <div className='handle-fontColor'>
        <SketchPicker
          color={fontColor}
          onChangeComplete={handleFontColor}
          disableAlpha
          width={250}
        />
      </div>
      <button>Add caption</button>
    </form>
  );
}
