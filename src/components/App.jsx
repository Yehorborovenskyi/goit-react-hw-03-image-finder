import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from './api/fetchImages';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import  css from 'App.module.css'
import React from 'react';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    currentSearch: '',
    pageNr: 1,
    modalOpen: false,
    modalImg: '',
    modalAlt: '',
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const inputForSearch = e.target.elements.inputForSearch;
    const searchValue = inputForSearch.value.trim();
    if (searchValue === "") {
      alert("Please enter a search term");
      return;
    }
    this.setState({ isLoading: true });
    const response = await fetchImages(searchValue, 1);
    this.setState({
      images: response,
      isLoading: false,
      currentSearch: searchValue,
      pageNr: 1,
    });
  };



  handleClickMore = async () => {
    const response = await fetchImages(
      this.state.currentSearch,
      this.state.pageNr + 1
    );
    this.setState({
      images: [...this.state.images, ...response],
      pageNr: this.state.pageNr + 1,
    });
  };

  handleImageClick = e => {
    this.setState({
      modalOpen: true,
      modalAlt: e.target.alt,
      modalImg: e.target.name,
    });
  };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
      modalImg: '',
      modalAlt: '',
    });
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.handleModalClose();
    }
  };

  async componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <div className={css.Section}>
        {this.state.isLoading ? (<Loader />) :
          (
          <React.Fragment>
            <Searchbar onSubmit={this.handleSubmit} />
            <ImageGallery
              onImageClick={this.handleImageClick}
              images={this.state.images}
            />
            {this.state.images.length > 0 ? (
              <Button onClick={this.handleClickMore} />
            ) : null}
          </React.Fragment>
        )}
        {this.state.modalOpen ?
          (<Modal
            src={this.state.modalImg}
            alt={this.state.modalAlt}
            handleClose={this.handleModalClose}
          />
        ) : null}
      </div>
    );
  }
}


