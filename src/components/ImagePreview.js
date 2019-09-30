import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './ImagePreview.css';

class ImagePreview extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.history.push(`/modify/${this.props.id}`);
  }
  render() {
    const { url } = this.props;
    return (
      <div className='image-card'>
        <div className='image' style={{ backgroundImage: `url(${url})` }} />
        <button className='button-cta' onClick={this.handleClick}>
          Add Caption
        </button>
      </div>
    );
  }
}

export default withRouter(ImagePreview);
