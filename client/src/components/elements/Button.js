import React from "react";

const Button = (props) => {
  return (
    <button type="submit" onClick = {() => props.inProcess()} className={props.class} style={{ ...props.styles }}>
      {props.process ? "Processing ..." : props.text}
    </button>
  );
};

export default Button;
