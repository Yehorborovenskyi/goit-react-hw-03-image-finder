import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';
import { Component } from "react";
export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

openModal = () => {
  this.setState({ isModalOpen: true });
};
closeModal = () => {
  this.setState({ isModalOpen: false });
};


render() {
    const { fields } = this.props;
    const { isModalOpen } = this.state;

  return(
  <li className={css.ImageGalleryItem} >
      <img
         className={css.ImageGalleryItemImage}
         onClick={this.openModal}
         src={fields.webformatURL}
         alt={fields.tags}
      
      />
      {isModalOpen && (
      <Modal onClose={this.closeModal}>
        <img src={fields.largeImageURL} alt={fields.tags} />
        </Modal>
        )}
    </li>
  )}
  
}
ImageGalleryItem.propTypes = {
  fields: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};