import React, {useState} from "react";
import Wrapper from "../layouts/Wrapper";
import Jumbotron from "./Jumbotron";
import Form from "../elements/Form";
import { Card } from "../elements/Card";
import PopUp from "../elements/Notif";
import "./Header.scss";

export default function Header() {
  const [msg, showPopUp] = useState(null);
  function triggerPopUp(message){
    showPopUp(message);
  }
  return (
    <section className="sec-1">
      {msg && <PopUp message = {msg} sub="Simple, Fast and secure :)" showPopUp = {showPopUp}/>}
      <Wrapper padding="10rem 8rem">
        <div className="header">
          <Jumbotron
            heading="Share"
            tagline="Share your files"
            des="Secure, Fast, and Free"
          />

          <Card width="30%" bg="white">
            <Form type="ShareForm" triggerPopUp = {triggerPopUp}/>
          </Card>
        </div>
      </Wrapper>
    </section>
  );
}
