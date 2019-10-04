import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import EditImage from './components/EditImage';
import { extractImpData } from './helperFunctions';

const KEY = '13772568-c42de05b34394573956bc9b73';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      loading: null,
      error: ''
    };
    this.getImages = this.getImages.bind(this);
  }

  getImages(searchTerm) {
    const validSearchTerm = searchTerm.replace(/ /g, '+');
    const URL = `https://pixabay.com/api/?key=${KEY}&q=${validSearchTerm}&image_type=photo&per_page=100`;
    this.setState({ loading: true, images: [], error: '' }, () => {
      fetch(URL)
        .then(res => res.json())
        .then(data => {
          // console.log(data.hits);
          // console.log(extractImpData(data.hits)[0]);
          this.setState({ images: extractImpData(data.hits), loading: false });
        })
        .catch(error => {
          console.log(error);
          this.setState({
            error:
              'Please make sure you are connected to internet or try a different search.',
            loading: false
          });
        });
    });
  }

  render() {
    const { images } = this.state;
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route
            exact
            path='/modify/:id'
            render={routerProps => (
              <EditImage
                {...routerProps}
                imageInfo={images.find(
                  img => String(img.id) === routerProps.match.params.id
                )}
              />
            )}
          />
          <Route
            exact
            path='/'
            render={routerProps => (
              <SearchForm
                {...this.state}
                getImages={this.getImages}
                {...routerProps}
              />
            )}
          />
          <Redirect to='/' />
        </Switch>
      </div>
    );
  }
}

export default App;
