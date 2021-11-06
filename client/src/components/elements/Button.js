import React from "react";
// import { Loader } from 'semantic-ui-react';
import Loader from "react-loader-spinner";

const Button = (props) => {
  return (
    <button type="submit" onClick = {() => props.inProcess()} className={props.class} style={{ ...props.styles }}>
      {props.process ? <Loader type="Grid" color="#FFFFFF" height={23} width={23} /> : props.text}
    </button>
  );
};

export default Button;
