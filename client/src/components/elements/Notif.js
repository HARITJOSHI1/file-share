import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const PopUp = (props) => {
  useEffect(() => {
    setTimeout(() => props.showPopUp(null), 4000);
  }, []);

  return ReactDOM.createPortal(
    <div class={`ui ${props.message.split(',')[0] === "Error"? 'error' : 'success'} message`}>
      <i onClick={() => props.showPopUp(null)} class="close icon"></i>
      <div class="header" style={{ fontSize: "Raleway !important" }}>
        {props.message}
      </div>
      <p style={{ fontSize: "Raleway !important" }}>{props.sub || null}</p>
    </div>,
    document.getElementById("popup")
  );
};

export default PopUp;
