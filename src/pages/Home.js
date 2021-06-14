import React, { Fragment, useContext, useState } from "react";
import ImportButton from "../components/ImportButton";
import styles from "../styles/Home.module.css";
import {
  Close,
  DeleteForever,
  Edit,
  Error,
  ArrowBack,
} from "@material-ui/icons";
import { Scrollbars } from "react-custom-scrollbars-2";
import SearchInput from "../components/SearchInput";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import PersonContext from "../context/PersonContext";

const PersonDetail = ({ data, errors }) => {
  //identifying errors on the table
  return (
    <>
      {errors.includes(data) ? (
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

const Home = () => {
  const [headers, setHeaders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState({
    target: null,
    status: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    target: null,
    message: null,
  });
  const routeHistory = useHistory();
  const { people, setPeople, extraInfo, setExtraInfo } =
    useContext(PersonContext);

  const filteredPeople = people.filter((person) => {
    return searchText === "errors"
      ? person.errors.length > 0
      : person.firstname.toLowerCase().includes(searchText);
  });

  const Cleanup = () => {
    setHeaders([]);
    setPeople([]);
    setExtraInfo({
      totalErrors: 0,
      file: null,
    });
    setSearchText("");
    setErrorMessage({
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
        <section className={styles.row}>
          {/*================== people from the database ===========================*/}
          <div className={styles.col}>
            <p>Available People</p>
            <div className={styles.fileList}>
              <Scrollbars
                universal={true}
                autoHide
                autoHeight
                autoHeightMax={500}
              >
                <div className={styles.file}>
                  <p>Person Name</p>
                  <div className={styles.icons}>
                    <IconButton size="small">
                      <Edit fontSize="small" style={{ color: "#0073cf" }} />
                    </IconButton>
                    <IconButton size="small">
                      <DeleteForever
                        fontSize="small"
                        style={{ color: "red" }}
                      />
                    </IconButton>
                  </div>
                </div>
              </Scrollbars>
            </div>
          </div>

          {/*================== file information ===================================*/}
          <div className={styles.col2}>
            {people.length > 0 ? (
              <>
                <p className={styles.subTitle}>
                  Information from the imported File
                </p>

                <div className={styles.fileGrid}>
                  <div className={styles.fileUpdate}>
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
                      <p className={styles.title}>Errors</p>
                      <div className={styles.fileErrors}>
                        <p>{extraInfo.totalErrors} errors found</p>
                        {searchText === "errors" ? (
                          <IconButton
                            size="small"
                            onClick={() => setSearchText("")}
                          >
                            <ArrowBack
                              fontSize="small"
                              style={{ color: "#0073cf" }}
                            />
                          </IconButton>
                        ) : (
                          <IconButton
                            size="small"
                            onClick={() =>
                              setSearchText((prev) =>
                                prev.match("errors") ? "" : "errors"
                              )
                            }
                          >
                            <Error fontSize="small" style={{ color: "red" }} />
                          </IconButton>
                        )}{" "}
                      </div>
                    </div>

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
                      <span>STORE DATA WITHOUT ERRORS</span>
                    </div>
                  </div>
                </div>

                {/* information from the imported file */}
                <div className={styles.fileInfo}>
                  <SearchInput setSearchText={setSearchText} />
                  <Scrollbars
                    universal={true}
                    autoHide
                    autoHeight
                    autoHeightMax={500}
                  >
                    <table
                      className={styles.table}
                      cellSpacing="0"
                      cellPadding="0"
                    >
                      <thead>
                        <tr>
                          {headers.map((header, index) => {
                            //last value of the headers array is empty
                            if (index === headers.length - 1) {
                              return (
                                <th key={index} style={{ float: "right" }}>
                                  Action
                                </th>
                              );
                            }
                            return <th key={index}>{header}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPeople.map((person, index) => {
                          return (
                            <tr key={index}>
                              {Object.entries(person).map(([key, value], i) => {
                                if (key === "errors")
                                  return <Fragment key={i}></Fragment>;
                                return (
                                  <td key={i}>
                                    <PersonDetail
                                      data={value}
                                      errors={person.errors}
                                    />
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
                                          index,
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
                      </tbody>
                    </table>
                  </Scrollbars>
                </div>
              </>
            ) : (
              // import button component
              <div className={styles.btnContainer}>
                <ImportButton
                  setErrorMessage={setErrorMessage}
                  setPeople={setPeople}
                  setHeaders={setHeaders}
                  setLoading={setLoading}
                />
                {errorMessage.target === "file" ? (
                  <p style={{ color: "red", textAlign: "center" }}>
                    {errorMessage.message}
                  </p>
                ) : null}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
