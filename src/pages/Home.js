import React, { useContext, useEffect, useState } from "react";
import ImportButton from "../components/ImportButton";
import styles from "../styles/Home.module.css";
import { Close } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import PersonContext from "../context/PersonContext";
import Modal from "../components/Modal";
import { CircularProgress } from "@material-ui/core";
import { addPeople, getPeople } from "../utils/CRUDMethods";
import MobileLayout from "../components/home/MobileLayout";
import TableInfo from "../components/home/TableInfo";
import ErrorUpdate from "../components/home/ErrorUpdates";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(null);
  const [viewDetails, setViewDetails] = useState(null);
  const [showModal, setShowModal] = useState(null);

  const [error, setError] = useState({
    target: null,
    message: null,
  });

  const routeHistory = useHistory();
  const { people, setPeople, extraInfo, setExtraInfo } =
    useContext(PersonContext);

  useEffect(() => {
    //only get the data from the database if there's no imported file
    if (!extraInfo.file) {
      const headers = [
        "Identity",
        "Firstname",
        "Surname",
        "Age",
        "Sex",
        "Mobile",
        "Active",
      ];
      getPeople("file", setPeople, setLoading, setError);
      setExtraInfo((prev) => {
        return {
          ...prev,
          headers,
        };
      });
    }
  }, [extraInfo.file, setPeople, setExtraInfo]);

  //this is for searching the names of the people from the file
  const filteredPeople = people.filter((person) => {
    return searchText === "errors"
      ? person.errors.length > 0
      : person.firstname.toLowerCase().includes(searchText);
  });

  //will be used to remove the imported file or data from the database
  const Cleanup = () => {
    setPeople([]);

    setExtraInfo({
      totalErrors: 0,
      file: null,
      headers: [],
    });
    setSearchText("");
    setError({
      target: null,
      message: null,
    });
    setLoading({
      target: null,
      status: false,
    });
  };

  const removePerson = (id) => {
    const index = people.findIndex((p) => p.identity === id);

    if (extraInfo.file && index > -1) {
      const errors = people[index].errors.length;
      setPeople((prev) => {
        prev.splice(index, 1);
        return prev;
      });
      setExtraInfo((prev) => {
        return {
          ...prev,
          totalErrors: prev.totalErrors - errors,
        };
      });
    }

    setShowModal(null);
  };

  const uploadData = () => {
    //upload only when there are no errors
    if (extraInfo.totalErrors === 0) {
      addPeople("upload", people, routeHistory, setLoading, setError);
    }
  };

  const uploadBtnStyle = {
    backgroundColor: extraInfo.totalErrors === 0 ? "#0073cf" : "white",
    color: extraInfo.totalErrors === 0 ? "white" : "#646c7f",
    pointerEvents: extraInfo.totalErrors === 0 ? "visible" : "none",
    border: extraInfo.totalErrors === 0 ? "none" : "solid 1px #ccc",
  };

  return (
    <>
      {showModal ? (
        <Modal
          setShowModal={setShowModal}
          message="Are you sure you want to delete this person?"
          action={removePerson}
          showModal={showModal}
        />
      ) : null}
      <div className={styles.content}>
        <div className={styles.container}>
          <section className={styles.peopleInfo}>
            {/*================== file information ===================================*/}
            <p className={styles.subTitle}>Information from the *.csv File</p>

            {/* show only the upload button if there is no imported file or data from the database */}
            {people.length > 0 ? (
              <>
                <div className={styles.fileGrid}>
                  {/* file name and error updates */}
                  <div className={styles.fileUpdate}>
                    {/* show file name and errors if it's imported */}
                    {extraInfo.file ? (
                      <>
                        {/* file name */}
                        <div className={styles.update}>
                          <p className={styles.title}>File Name</p>
                          <div className={styles.filename}>
                            <p>{extraInfo.file.name}</p>
                            <IconButton size="small" onClick={() => Cleanup()}>
                              <Close
                                fontSize="small"
                                style={{ color: "#646c7f" }}
                              />
                            </IconButton>
                          </div>
                        </div>

                        {/*  file errors */}
                        <div className={styles.update}>
                          <ErrorUpdate
                            setSearchText={setSearchText}
                            searchText={searchText}
                            extraInfo={extraInfo}
                          />
                        </div>

                        {/* 'how to show people with errors' text message */}
                        {searchText === "errors" ? (
                          <em style={{ color: "#646c7f", fontSize: 14 }}>
                            Click the back icon to see all people.
                          </em>
                        ) : (
                          <em style={{ color: "#646c7f", fontSize: 14 }}>
                            Click the error icon to see only people with errors.
                          </em>
                        )}
                      </>
                    ) : null}
                  </div>

                  <div></div>

                  {/* buttons for importing data */}
                  <div>
                    {extraInfo.file ? (
                      <>
                        {/* the progressbar replaces both error message and the 'upload button' */}
                        {loading === "upload" ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <CircularProgress color="primary" />
                          </div>
                        ) : (
                          <>
                            <div
                              style={uploadBtnStyle}
                              className={styles.uploadBtn}
                              onClick={() => uploadData()}
                            >
                              <p>STORE DATA TO DATABASE</p>
                            </div>

                            {error.target === "upload" ? (
                              <p className={styles.errorMsg}>{error.message}</p>
                            ) : null}
                          </>
                        )}
                      </>
                    ) : (
                      <div
                        onClick={() => Cleanup()}
                        className={styles.uploadBtn}
                      >
                        <p>IMPORT *.CSV FILE</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* information from the imported file */}
                <div className={styles.fileInfo}>
                  <TableInfo
                    extraInfo={extraInfo}
                    filteredPeople={filteredPeople}
                    setSearchText={setSearchText}
                    routeHistory={routeHistory}
                    setShowModal={setShowModal}
                  />
                </div>
                {/* display this layout on mobile */}
                <MobileLayout
                  filteredPeople={filteredPeople}
                  routeHistory={routeHistory}
                  setSearchText={setSearchText}
                  viewDetails={viewDetails}
                  setViewDetails={setViewDetails}
                  setShowModal={setShowModal}
                  extraInfo={extraInfo}
                />
              </>
            ) : (
              // import button component
              <div className={styles.btnContainer}>
                {loading === "file" ? (
                  <p style={{ textAlign: "center" }}>Please wait...</p>
                ) : (
                  <>
                    <ImportButton
                      setError={setError}
                      setPeople={setPeople}
                      setLoading={setLoading}
                    />
                    {/* display file error message here */}
                    {error.target === "file" ? (
                      <p className={styles.errorMsg}>{error.message}</p>
                    ) : null}
                  </>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
