import React from "react";
import { Error, ArrowBack } from "@material-ui/icons";
import styles from "../../styles/Home.module.css";
import IconButton from "@material-ui/core/IconButton";

const ErrorUpdate = ({ setSearchText, searchText, extraInfo }) => {
  return (
    <>
      <p className={styles.title}>Errors</p>
      <div className={styles.fileErrors}>
        <p>{extraInfo.totalErrors} errors found</p>
        {searchText === "errors" ? (
          <IconButton size="small" onClick={() => setSearchText("")}>
            <ArrowBack fontSize="small" style={{ color: "#0073cf" }} />
          </IconButton>
        ) : (
          <IconButton
            size="small"
            onClick={() =>
              setSearchText((prev) => (prev.match("errors") ? "" : "errors"))
            }
          >
            <Error fontSize="small" style={{ color: "red" }} />
          </IconButton>
        )}
      </div>
    </>
  );
};

export default ErrorUpdate;
