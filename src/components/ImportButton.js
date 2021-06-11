import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "../styles/ImportButton.module.css";

const UploadButton = ({ setFile, setFileErrorM, setPeople, setHeaders }) => {
  const [person, setPerson] = useState(null);

  const getFile = (files) => {
    setFile(files[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".csv",
    maxFiles: 1,
    onDropAccepted: getFile,
    onDropRejected: (errors) => setFileErrorM(errors[0].errors[0].message),
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
