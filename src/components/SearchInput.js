import React from "react";
import styles from "../styles/SearchInput.module.css";

const SearchInput = ({ setSearchText }) => {
  return (
    <div className={styles.search}>
      <input
        onChange={(e) => {
          e.preventDefault();
          setSearchText(e.target.value.toLowerCase());
        }}
        placeholder="Search a name..."
      />
    </div>
  );
};

export default SearchInput;
