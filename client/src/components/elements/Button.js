import React from "react";

const Button = (props) => {
  return <button type = 'submit' className={props.class} style= {{...props.styles}}>{props.text}</button>;
};

export default Button;
