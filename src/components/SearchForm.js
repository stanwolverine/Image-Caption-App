import React, { Component } from 'react';
import ImagePreview from './ImagePreview';
import './SearchForm.css';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.getImages(this.state.searchTerm);
    this.setState({ searchTerm: '' });
  }
  render() {
    const { searchTerm } = this.state;
    const { images, loading, error } = this.props;
    return (
      <main>
        <section className='search-section'>
          <h1 className='heading-primary'>Search for Images</h1>
          <form className='search-form' onSubmit={this.handleSubmit}>
            <label htmlFor='search-input'>Search for images</label>
            <input
              id='search-input'
              className='search-input'
              type='text'
              placeholder='type something here...'
              required
              value={searchTerm}
              onChange={this.handleChange}
            />
            <button className='search-button'>Search</button>
          </form>
        </section>
        <section className='results-section'>
          {loading === null ? (
            <h2>Your search results will appear here.</h2>
          ) : loading === true ? (
            <h2>Loading...</h2>
          ) : loading === false && images.length === 0 ? (
            <h2>No results found.</h2>
          ) : (
            images.map(img => (
              <ImagePreview key={img.id} id={img.id} url={img.imgUrl} />
            ))
          )}
          {error && <h2>{error}</h2>}
        </section>
      </main>
    );
  }
}
