import React, { useState } from "react";
import ImportButton from "../components/ImportButton";
import styles from "../styles/Home.module.css";
import { Close, DeleteForever, Edit, Error } from "@material-ui/icons";
import { Scrollbars } from "react-custom-scrollbars-2";
import SearchInput from "../components/SearchInput";
import IconButton from "@material-ui/core/IconButton";

const Home = () => {
  const [file, setFile] = useState(null); //accepted file
  const [fileErrorM, setFileErrorM] = useState(null); //file error message
  const [people, setPeople] = useState([]);
  const [headers, setHeaders] = useState([]);

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
                        <p>20 errors found</p>
                        <IconButton size="small">
                          <Error fontSize="small" style={{ color: "red" }} />
                        </IconButton>
                      </div>
                    </div>
                  </div>

                  {/* upload button */}
                  <div>
                    <div className={styles.uploadBtn}>
                      <span>Save Data</span>
                    </div>
                  </div>
                </div>

                {/* information from the imported file */}
                <div className={styles.fileInfo}>
                  <SearchInput />
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
                          <th>Identity</th>
                          <th>Name</th>
                          <th>Surname</th>
                          <th>Age</th>
                          <th>Sex</th>
                          <th>Mobile Number</th>
                          <th>Status</th>
                          <th style={{ float: "right" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Alfreds</td>
                          <td>Maria</td>
                          <td>16</td>
                          <td>M</td>
                          <td>0987654321</td>
                          <td>True</td>

                          {/* action buttons */}
                          <td>
                            <div className={styles.actionBtns}>
                              <p className={styles.editBtn}>Edit</p>
                              <p className={styles.deleteBtn}>Delete</p>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>2</td>
                          <td>Alfreds</td>
                          <td>Maria</td>
                          <td>16</td>
                          <td>M</td>
                          <td>0987654321</td>
                          <td>True</td>

                          {/* action buttons */}
                          <td>
                            <div className={styles.actionBtns}>
                              <p className={styles.editBtn}>Edit</p>
                              <p className={styles.deleteBtn}>Delete</p>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>3</td>
                          <td>Alfreds</td>
                          <td>Maria</td>
                          <td>16</td>
                          <td>M</td>
                          <td>0987654321</td>
                          <td>True</td>

                          {/* action buttons */}
                          <td>
                            <div className={styles.actionBtns}>
                              <p className={styles.editBtn}>Edit</p>
                              <p className={styles.deleteBtn}>Delete</p>
                            </div>
                          </td>
                        </tr>
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
                  setFileErrorM={setFileErrorM}
                  setPeople={setPeople}
                  setHeaders={setHeaders}
                />
                {fileErrorM ? (
                  <p style={{ color: "red", textAlign: "center" }}>
                    {fileErrorM}
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
