import React, { Fragment, useContext, useState } from "react";
import ImportButton from "../components/ImportButton";
import styles from "../styles/Home.module.css";
import { Close, Error, ArrowBack, ArrowDropDown } from "@material-ui/icons";
import { Scrollbars } from "react-custom-scrollbars-2";
import SearchInput from "../components/SearchInput";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import PersonContext from "../context/PersonContext";
import { CircularProgress } from "@material-ui/core";

const PersonDetail = ({ data, errors }) => {
  //identifying errors on the table
  return (
    <>
      {errors.find((err) => err.value === data) ? (
        //we red color any incorrect value and put a question mark where there's no value
        <>
          {data === "" || data === null ? (
            <span style={{ color: "red" }}>?</span>
          ) : (
            <span style={{ color: "red" }}>{data}</span>
          )}
        </>
      ) : (
        <span>{data}</span>
      )}
    </>
  );
};

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

const Headers = ({ extraInfo }) => {
  return (
    <tr>
      {extraInfo.headers.map((header, index) => {
        //last value of the headers array is empty
        if (index === extraInfo.headers.length - 1) {
          return (
            <th key={index} style={{ float: "right" }}>
              Action
            </th>
          );
        }
        return <th key={index}>{header}</th>;
      })}
    </tr>
  );
};

//============== table rows ==================
const PeopleDetails = (props) => {
  const { filteredPeople, routeHistory } = props;
  return (
    <>
      {filteredPeople.map((person, index) => {
        return (
          <tr key={index}>
            {Object.entries(person).map(([key, value], i) => {
              // this is to not display 'errors' array in each person object
              if (key === "errors") return <Fragment key={i}></Fragment>;
              return (
                <td key={i}>
                  <PersonDetail data={value} errors={person.errors} />
                </td>
              );
            })}

            {/* action buttons */}
            <td>
              <div className={styles.actionBtns}>
                <p
                  className={styles.editBtn}
                  onClick={() =>
                    routeHistory.push({
                      pathname: "/editperson",
                      state: {
                        person,
                      },
                    })
                  }
                >
                  Edit
                </p>
                <p className={styles.deleteBtn}>Delete</p>
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
};

const TableInfo = (props) => {
  const { setSearchText, extraInfo, filteredPeople, routeHistory } = props;
  return (
    <>
      <SearchInput setSearchText={setSearchText} />
      <Scrollbars universal={true} autoHide autoHeight autoHeightMax={700}>
        <table className={styles.table} cellSpacing="0" cellPadding="0">
          <thead>
            <Headers extraInfo={extraInfo} />
          </thead>
          <tbody>
            <PeopleDetails
              filteredPeople={filteredPeople}
              routeHistory={routeHistory}
            />
          </tbody>
        </table>
      </Scrollbars>
    </>
  );
};

const MobileLayout = (props) => {
  const {
    filteredPeople,
    routeHistory,
    setSearchText,
    viewDetails,
    setViewDetails,
  } = props;

  const openMenu = (id) => {
    setViewDetails((prev) => {
      if (prev === id) return null;
      return id;
    });
  };

  return (
    <div className={styles.mobile}>
      <div style={{ position: "relative" }}>
        <SearchInput setSearchText={setSearchText} />
      </div>
      <div>
        <Scrollbars universal={true} autoHide autoHeight autoHeightMax={500}>
          {filteredPeople.map((person, index) => {
            return (
              <div key={index} className={styles.dropdown}>
                <div
                  className={styles.dropdownTitle}
                  onClick={() => openMenu(person.identity)}
                >
                  <p>
                    {person.firstname} {person.surname}
                  </p>
                  <ArrowDropDown fontSize="small" />
                </div>
                <div
                  style={{
                    display: viewDetails === person.identity ? "block" : "none",
                  }}
                  className={styles.dropdownMenu}
                >
                  <div>
                    <div className={styles.btns}>
                      <p className={styles.editBtn}>Edit</p>
                      <p className={styles.deleteBtn}>Delete</p>
                    </div>
                  </div>
                  {Object.entries(person).map(([key, value], i) => {
                    // this is to not display 'errors' array in each person object
                    if (key === "errors") return <Fragment key={i}></Fragment>;
                    return (
                      <div key={i} className={styles.dropdownItem}>
                        <p className={styles.title}>{key}</p>
                        <p>{value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Scrollbars>
      </div>
    </div>
  );
};

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(null);
  const [viewDetails, setViewDetails] = useState(null);
  const [uploadedPeople, setUploadedPeople] = useState([]);

  const [error, setError] = useState({
    target: null,
    message: null,
  });

  const routeHistory = useHistory();
  const { people, setPeople, extraInfo, setExtraInfo } =
    useContext(PersonContext);

  //this is for searching the names of the people from the file
  const filteredPeople = people.filter((person) => {
    return searchText === "errors"
      ? person.errors.length > 0
      : person.firstname.toLowerCase().includes(searchText);
  });

  //will be used to remove the imported file
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

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <section className={styles.peopleInfo}>
          {/*================== file information ===================================*/}
          <p className={styles.subTitle}>Information from the .csv File</p>

          {/* show only the upload button if there is no imported file */}
          {people.length > 0 ? (
            <>
              <div className={styles.fileGrid}>
                {/* file name and error updates */}
                <div className={styles.fileUpdate}>
                  {/* file name */}
                  <div className={styles.update}>
                    <p className={styles.title}>File Name</p>
                    <div className={styles.filename}>
                      <p>{extraInfo.file.name}</p>
                      <IconButton size="small" onClick={() => Cleanup()}>
                        <Close fontSize="small" style={{ color: "#646c7f" }} />
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

                  {/* how to show people with errors messages */}
                  {searchText === "errors" ? (
                    <em style={{ color: "#646c7f", fontSize: 14 }}>
                      Click the back icon to see all people.
                    </em>
                  ) : (
                    <em style={{ color: "#646c7f", fontSize: 14 }}>
                      Click the error icon to see only people with errors.
                    </em>
                  )}
                </div>

                {/* upload button */}
                <div>
                  <div className={styles.uploadBtn}>
                    <p>STORE DATA WITHOUT ERRORS</p>
                  </div>
                </div>
              </div>

              {/* information from the imported file */}
              <div className={styles.fileInfo}>
                <TableInfo
                  extraInfo={extraInfo}
                  filteredPeople={filteredPeople}
                  setSearchText={setSearchText}
                  routeHistory={routeHistory}
                />
              </div>
              {/* display this layout on mobile */}
              <MobileLayout
                filteredPeople={filteredPeople}
                routeHistory={routeHistory}
                setSearchText={setSearchText}
                viewDetails={viewDetails}
                setViewDetails={setViewDetails}
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
                    <p style={{ color: "red", textAlign: "center" }}>
                      {error.message}
                    </p>
                  ) : null}
                </>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
