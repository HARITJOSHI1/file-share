import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import axios from "axios";
import JSZip from "jszip";
import { connect } from "react-redux";
import { compose } from "redux";
import Button from "./Button";
import styled from "styled-components";
import Dropzone from "./Dropzone";

const FormWrap = styled.form`
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
`;
const zip = new JSZip();
class ShareForm extends Component {
  submit = async (formValues) => {
    const fn = zip.folder("files");
    const files = Array.from(this.props.files);
    files.forEach((f) => fn.file(f.name, f));

    const content = await zip.generateAsync({ type: "blob" });
    const file = new File([content], "file.zip");
    const form = new FormData();

    form.append("file", file);
    form.append("info", formValues);

    await axios.post(`http://localhost:4000/api/v1/users`, {
      info: formValues,
    });
    
    const { data } = await axios.post(
      `http://localhost:4000/api/v1/store/uploads`,
      form
    );

    console.log(data);
  };
  renderForm({ input, label, textArea, placeholder, meta }) {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label
          htmlFor={label}
          style={{
            fontFamily: "Helvetica",
            color: `${meta.error && meta.touched ? "#a11a1d" : "#8a8a8a"}`,
            fontWeight: "500",
            display: "inline-block",
            fontSize: ".85rem",
            textTransform: "uppercase",
            opacity: ".7",
          }}
        >
          {meta.error && meta.touched ? meta.error : label}
        </label>
        {textArea ? (
          <textarea
            {...input}
            style={{ color: "#9c9c9c", fontSize: ".95rem" }}
            rows="-40"
            placeholder={placeholder}
          />
        ) : (
          <input
            name={label}
            {...input}
            style={{ color: "#9c9c9c", fontSize: ".95rem" }}
            placeholder={placeholder}
          />
        )}
      </div>
    );
  }
  render() {
    return (
      <FormWrap
        action="http://localhost:4000/api/v1/store/upload"
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.submit)}
        {...this.props}
      >
        <Dropzone height="8rem" />
        <Field
          name="sendTo"
          component={this.renderForm}
          label="Send To"
          placeholder="Email address"
        />
        <Field
          name="from"
          component={this.renderForm}
          label="From"
          placeholder="Your email address"
        />
        <Field
          name="message"
          component={this.renderForm}
          label="Message"
          placeholder="Add a message (optional)"
          textArea
        />
        <Button
          class="fluid ui button"
          text="Send"
          styles={{
            backgroundColor: "rgba(27, 101, 246, 1)",
            color: "white",
            textTransform: "uppercase",
            letterSpacing: "3px",
            fontWeight: "bold",
            fontFamily: "Oswald",
          }}
        />
      </FormWrap>
    );
  }
}

const validateEmail = (email) => {
  const Email =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!Email.test(email.toLowerCase())) return true;
  return false;
};

// const validator = (formValues) => {
//   const errors = {};
//   if (!formValues.SendTo) {
//     errors.SendTo = "Please enter the sender 's email address";
//   }

//   if (!formValues.From) {
//     errors.From = "Please enter your email address";
//   }

//   if (formValues.SendTo && validateEmail(formValues.SendTo)) {
//     errors.SendTo = "Sender 's email is invalid . Make sure its correct";
//   }

//   if (formValues.From && validateEmail(formValues.From)) {
//     errors.From = "Your email is invalid . Make sure its correct";
//   }

//   return errors;
// };

const mapStateToProps = (state) => {
  return { files: state.files };
};

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: "ShareForm" })
)(ShareForm);
