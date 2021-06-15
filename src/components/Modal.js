import React from "react";

const Modal = ({ showModal, message, action }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "auto",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
    </div>
  );
};

export default Modal;
