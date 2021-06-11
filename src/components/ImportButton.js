import React from "react";
import { useDropzone } from "react-dropzone";
import styles from "../styles/ImportButton.module.css";

const UploadButton = () => {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: "image/jpeg, image/png",
    });

  return (
    <section className={styles.button}>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop file here, or click to select file</p>
        <em>(Only *.csv file will be accepted)</em>
      </div>
    </section>
  );
};

export default UploadButton;
