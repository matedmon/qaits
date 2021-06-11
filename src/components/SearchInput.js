import React from "react";
import styles from "../styles/SearchInput.module.css";

const SearchInput = () => {
  return (
    <div className={styles.search}>
      <input
        // onChange={handleInputProduct}
        placeholder="Search a name..."
      />
    </div>
  );
};

export default SearchInput;
