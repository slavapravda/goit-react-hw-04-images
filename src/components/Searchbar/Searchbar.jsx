import { useState } from 'react';
import PropTypes from 'prop-types';

import s from './Searchbar.module.css';

import Notiflix from 'notiflix';

const Searchbar = (props) => {
  const [searchName, setName] = useState('');

  const handeChange = event => {
    setName(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchName.trim() === '') {
      return Notiflix.Notify.info('Введіть коректну назву');
    }
    if (searchName.trim() === props.searchName) {
      return Notiflix.Notify.failure('Введіть іншу назву пошуку');
    }

    props.onSubmit({searchName});

    // reset()
    setName('');
  };
  // const reset = () => {
  //   setName('')
  // }


  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          onChange={handeChange}
          className={s.SearchFormInput}
          name="searchName"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
