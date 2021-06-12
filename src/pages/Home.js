import React, { useState } from "react";
import ImportButton from "../components/ImportButton";
import styles from "../styles/Home.module.css";
import { Close, DeleteForever, Edit, Error } from "@material-ui/icons";
import { Scrollbars } from "react-custom-scrollbars-2";
import SearchInput from "../components/SearchInput";
import IconButton from "@material-ui/core/IconButton";

const PersonDetail = ({ data, errors }) => {
  //identifying errors on the table

  return (
    <td>
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
    </td>
  );
};

const Home = () => {
  const [file, setFile] = useState(null); //accepted file
  const [people, setPeople] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [totalErrors, setTotalErrors] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    target: null,
    message: null,
  });

  const filteredPeople = people.filter((person) => {
    return searchText === "errors"
      ? person.errors.length > 0
      : person.firstname.toLowerCase().includes(searchText);
  });

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
            {file ? (
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
                        <p>{file.name}</p>
                        <IconButton size="small" onClick={() => setFile(null)}>
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
                        <p>{totalErrors} errors found</p>
                        <IconButton
                          size="small"
                          onClick={() => setSearchText("errors")}
                        >
                          <Error fontSize="small" style={{ color: "red" }} />
                        </IconButton>
                      </div>
                    </div>
                    <em style={{ color: "#646c7f", fontSize: 14 }}>
                      Click the error icon to see only details with errors.
                    </em>
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
                              <PersonDetail
                                data={person.identity}
                                errors={person.errors}
                              />
                              <PersonDetail
                                data={person.firstname}
                                errors={person.errors}
                              />
                              <PersonDetail
                                data={person.surname}
                                errors={person.errors}
                              />
                              <PersonDetail
                                data={person.age}
                                errors={person.errors}
                              />
                              <PersonDetail
                                data={person.sex}
                                errors={person.errors}
                              />
                              <PersonDetail
                                data={person.mobile}
                                errors={person.errors}
                              />
                              <PersonDetail
                                data={person.active}
                                errors={person.errors}
                              />

                              {/* action buttons */}
                              <td>
                                <div className={styles.actionBtns}>
                                  <p className={styles.editBtn}>Edit</p>
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
                  setFile={setFile}
                  setErrorMessage={setErrorMessage}
                  setPeople={setPeople}
                  setHeaders={setHeaders}
                  setLoading={setLoading}
                  setTotalErrors={setTotalErrors}
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
