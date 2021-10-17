import React from "react";
import {FaTelegramPlane} from 'react-icons/fa';
import "./Header.scss";

export default function Jumboton(props) {
  return (
    <div className="jumbotron">
      <h1 className="jumbotron__heading">
          <i className="jumbotron__heading--icon"><FaTelegramPlane/></i> 
          {props.heading}
      </h1>
      <div className="jumbotron__tagline">{props.tagline}</div>
      <span className="jumbotron--des">{props.des}</span>
    </div>
  );
}
