import React from "react";
import styles from "../styles/Modal.module.css";

const Modal = ({ setShowModal, message, action, showModal }) => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div>
          <p className={styles.msg}>{message}</p>
          <div className={styles.btns}>
            <div
              className={styles.cancelBtn}
              onClick={() => setShowModal(null)}
            >
              <p className={styles.cancelText}>CANCEL</p>
            </div>
            <div
              className={styles.confirmBtn}
              onClick={() => action(showModal)}
            >
              <p className={styles.confirmText}>CONFIRM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
