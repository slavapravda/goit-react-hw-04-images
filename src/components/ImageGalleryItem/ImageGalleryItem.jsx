import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, smallImg, largeImg, alt, onClickImg }) => {
  const getLargeImgUrl = event => {
    onClickImg(event.target.dataset.url);
  };

  return (
    <li className={s.ImageGalleryItem}>
      <img
        className={s.ImageGalleryItemImage}
        id={id}
        src={smallImg}
        alt={alt}
        data-url={largeImg}
        onClick={getLargeImgUrl}
      />
    </li>
  );
};


export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  smallImg: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClickImg: PropTypes.func.isRequired,
};

