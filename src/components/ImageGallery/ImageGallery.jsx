import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

import searchImg from '../api/searchApi';

import s from './ImageGallery.module.css';

const ImageGallery = ({ onLoadMoreBtnClick, page, searchName }) => {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [largeImg, setLargeImg] = useState('');

  useEffect(() => {
    if (searchName) {
      getMoreImages();
    }

    async function getMoreImages() {
      setLoading(true);

      try {
        const data = await searchImg(searchName, page);
        setImage([...data.hits]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName]);

  useEffect(() => {
    if (page > 1) {
      getMoreImages();
    }

    async function getMoreImages() {
      setLoading(true);

      try {
        const data = await searchImg(searchName, page);
        setImage(prevImages => [...prevImages, ...data.hits]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const openModal = largeImg => {
    setLargeImg(largeImg);
  };

  const isImages = Boolean(image.length);

  return (
    <>
      {largeImg && <Modal onClick={openModal} url={largeImg} />}
      {error && <h1>{error.message}</h1>}
      {loading && <Loader />}
      {image && (
        <ul className={s.imageGallery}>
          {image.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              smallImg={webformatURL}
              largeImg={largeImageURL}
              alt={tags}
              id={id}
              key={id}
              onClickImg={openModal}
            />
          ))}
        </ul>
      )}
      {isImages && <Button onClick={onLoadMoreBtnClick} />}
    </>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  nextName: PropTypes.string,
  page: PropTypes.number,
  onLoadMoreBtnClick: PropTypes.func,
};
