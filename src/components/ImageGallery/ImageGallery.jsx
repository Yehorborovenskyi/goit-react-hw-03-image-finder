import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => { 
  return (
  <ul className={css.ImageGallery}>
   {images.length ? (
          images.map(hit => <ImageGalleryItem key={hit.id} fields={hit} />)
        ) : (
          <p></p>
        )}
  </ul>
);}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};