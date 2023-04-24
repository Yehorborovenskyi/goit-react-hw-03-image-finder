import React from 'react';
import { Component } from 'react';
import  css from 'App.module.css'

import { SearchBar } from './Searchbar/Searchbar';
import { ImagesApiService } from './services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';



const STATUS = {
  idle: 'idle',
  pending: 'pending',
  rejected: 'rejected',
  resolved: 'resolved',
};

export class App extends Component {
  state = {
    search: '',
    page: 1,
    images: [],
    error: null,
    status: STATUS.idle,
 
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      try {
        const imagesApiService = new ImagesApiService();
        imagesApiService.query = this.state.search;
        const images = await imagesApiService.getImages(this.state.page);
        const hits = images.hits;
        const prevImages = this.state.images;

        this.setState({
          search: this.state.search,
          images: [...prevImages, ...hits],
          status: STATUS.resolved,
        });
      } catch (error) {
        this.setState({ error, status: STATUS.rejected });
      }
    }
  }

  handleSubmit = async search => {
    if (this.state.search !== search.input) {
      this.setState({
        images: [],
        search: search.input,
        page: 1,
        status: STATUS.pending,
      });
    } else {
      return alert(
        `You have already watched images by search of key word "${this.state.search}"`
      );
    }
  };

  loadMore = () => {
    this.setState({
      status: STATUS.pending,
    });
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };



  render()
  {
    const { search, error, status, images } = this.state;
    const querySearch = search === '' && status !== STATUS.idle;
    const bigGallery = status === STATUS.resolved && images.length > 0 && images.length >= 12;
    const smallGallery = status === STATUS.resolved && images.length > 0 && images.length < 12;
    const badRequest = status === STATUS.resolved && images.length === 0;
    
    return(<div className={css.Section}>
      <SearchBar onSubmit={this.handleSubmit}/>
      {status === STATUS.idle && (<p>Search some images above...</p>)}
      
      {querySearch &&  <><p>Search some images above...</p>{' '}
            <p>Default images without search below...</p></>
      }
       {status === STATUS.pending && (
          <>
            <ImageGallery images={images} /> <Loader />
          </>
        )}

        {status === STATUS.rejected && (<p>Something went wrong... More details about error: {error.message}</p>
        )}

        {bigGallery && (<><ImageGallery images={images} /><Button onClick={this.loadMore} /></>
        )}

      {smallGallery && <ImageGallery images={images} />}

      {badRequest && (<><p>No images found by search.</p><p>Try typing something different in the search box.</p></>
      )}
      
      </div> )}
}

// export class App extends Component {
//   state = {
//     images: [],
//     isLoading: false,
//     currentSearch: '',
//     pageNr: 1,
//     modalOpen: false,
//     modalImg: '',
//     modalAlt: '',
//   };

//   handleSubmit = async (e) => {
//     e.preventDefault();
//     const inputForSearch = e.target.elements.inputForSearch;
//     const searchValue = inputForSearch.value.trim();
//     if (searchValue === "") {
//       alert("Please enter a search term");
//       return;
//     }
//     this.setState({ isLoading: true });
//     const response = await fetchImages(searchValue, 1);
//     this.setState({
//       images: response,
//       isLoading: false,
//       currentSearch: searchValue,
//       pageNr: 1,
//     });
//   };



//   handleClickMore = async () => {
//     const response = await fetchImages(
//       this.state.currentSearch,
//       this.state.pageNr + 1
//     );
//     this.setState({
//       images: [...this.state.images, ...response],
//       pageNr: this.state.pageNr + 1,
//     });
//   };

//   handleImageClick = e => {
//     this.setState({
//       modalOpen: true,
//       modalAlt: e.target.alt,
//       modalImg: e.target.name,
//     });
//   };

//   handleModalClose = () => {
//     this.setState({
//       modalOpen: false,
//       modalImg: '',
//       modalAlt: '',
//     });
//   };

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.handleModalClose();
//     }
//   };

//   async componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   render() {
//     return (
//       <div className={css.Section}>
//         {this.state.isLoading ? (<Loader />) :
//           (
//           <React.Fragment>
//             <Searchbar onSubmit={this.handleSubmit} />
//             <ImageGallery
//               onImageClick={this.handleImageClick}
//               images={this.state.images}
//             />
//             {this.state.images.length > 0 ? (
//               <Button onClick={this.handleClickMore} />
//             ) : null}
//           </React.Fragment>
//         )}
//         {this.state.modalOpen ?
//           (<Modal
//             src={this.state.modalImg}
//             alt={this.state.modalAlt}
//             handleClose={this.handleModalClose}
//           />
//         ) : null}
//       </div>
//     );
//   }
// }


