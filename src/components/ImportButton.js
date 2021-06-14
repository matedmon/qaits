import React, { useContext } from "react";
import { useDropzone } from "react-dropzone";
import styles from "../styles/ImportButton.module.css";
import { Validate } from "../utils/ValidateData";
import PersonContext from "../context/PersonContext";

const UploadButton = (props) => {
  const { setErrorMessage, setHeaders } = props;

  const { setPeople, setExtraInfo } = useContext(PersonContext);

  const getFile = (files) => {
    const file = files[0];
    let reader = new FileReader();

    //============ read data from the file ==============
    reader.onload = (e) => {
      const allLines = e.target.result.split(/\r\n|\n/); //all lines from the file
      const firstLine = allLines[0].split(/,/);
      setHeaders(firstLine);

      for (let a = 1; a < allLines.length - 1; a++) {
        const line = allLines[a].split(/,/);

        let person = {};
        const errors = []; //for tracking errors of the current person's details

        /*i'm creating the attributes of the person object dynamically
          using the first line values from the file.
          The values of those attributes are the values of the next lines
          after the first*/
        for (let b = 0; b < firstLine.length - 1; b++) {
          person = {
            ...person,
            [firstLine[b].toLowerCase()]: line[b],
          };

          //validate the value of the current attribute
          Validate(firstLine[b].toLowerCase(), line[b], errors);
        }
        //store the errors of the current person
        person = {
          ...person,
          errors,
        };

        //set total errors
        setExtraInfo((prev) => {
          return {
            ...prev,
            totalErrors: prev.totalErrors + errors.length,
          };
        });

        setPeople((oldArray) => [...oldArray, person]);

        /*
        I could've done it manually as well:
        const person = {
          identity: ...,
          firstname: ...,
          surname: ...,
          age: ...,
          sex: ...,
          mobile: ...,
          active: ...,
        };
        */
      }
    };

    // reader.onprogress = (e) => {};

    reader.onerror = (e) => {
      setErrorMessage({ target: "file", message: e.target.error.message });
    };

    reader.readAsText(file);

    //get file
    setExtraInfo((prev) => {
      return {
        ...prev,
        file,
      };
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".csv",
    maxFiles: 1,
    onDropAccepted: getFile,
    onDropRejected: (errors) =>
      setErrorMessage({ target: "file", message: errors[0].errors[0].message }),
  });

  return (
    <section className={styles.button}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop file here, or click to select file</p>
        <em>(Only *.csv file will be accepted)</em>
      </div>
    </section>
  );
};

export default UploadButton;
