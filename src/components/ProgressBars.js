import React from "react";
import { CircularProgress } from "@material-ui/core";

const ProgressBars = ({ text }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
      }}
    >
      <div>
        <CircularProgress size={50} style={{ color: "white" }} />
        {text ? <p style={{ color: "white" }}>{text}</p> : null}
      </div>
    </div>
  );
};

export default ProgressBars;
