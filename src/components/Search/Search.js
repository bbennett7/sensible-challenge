import React from 'react';
import styles from './Search.module.scss';
import Button from '../Button/Button';

const Search = ({ handleOnChange, handleOnSubmit }) => {
  return (
    <div className={styles.container}>
      <form onSubmit={handleOnSubmit}>
        <div className={styles.wrapper}>
          <input placeholder="Latitude" id="latInput" onChange={handleOnChange} />
          <input placeholder="Longitude" id="longInput" onChange={handleOnChange} />
        </div>
        <Button text={'Search'} type="submit" onClick={handleOnSubmit} />
      </form>
    </div>
  );
};

export default Search;
