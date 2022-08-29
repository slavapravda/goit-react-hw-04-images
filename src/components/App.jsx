import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export const App = () => {
  const [searchName, setName] = useState('');
  const [page, setPage] = useState(1);

  const formSearchHandler = ({ searchName }) => {
    setName(searchName);
    setPage(1);
  };

  const onLoadMoreBtnClick = () => setPage(prevPage => prevPage + 1);

  return (
    <div>
      <Searchbar onSubmit={formSearchHandler} searchName={searchName} />
      <ImageGallery
        searchName={searchName}
        page={page}
        onLoadMoreBtnClick={onLoadMoreBtnClick}
      />
    </div>
  );
};
