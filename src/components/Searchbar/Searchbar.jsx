import styles from './Searchbar.module.css';
import React, { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <header className={styles.Searchbar}>
      <form onSubmit={handleOnSubmit} className={styles.SearchForm}>
        <button type="submit" className={styles[`SearchForm-button`]}>
          <span className={styles[`SearchForm-button-label`]}>Search</span>
        </button>

        <input
          className={styles[`SearchForm-input`]}
          onChange={handleChange}
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
