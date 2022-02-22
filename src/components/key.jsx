import "/src/styles.css";
import React from "react";

export default function Key({ keyValue, value }) {
  return (
    <button className="key-style" value={keyValue}>
      {keyValue}
    </button>
  );
}
