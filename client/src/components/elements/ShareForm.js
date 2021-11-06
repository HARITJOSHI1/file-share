import React, { Component, createRef } from "react";
import { Field, reduxForm } from "redux-form";
import axios from "axios";
import JSZip from "jszip";
import { connect } from "react-redux";
import Button from "./Button";
import styled from "styled-components";
import Dropzone from "./Dropzone";

const FormWrap = styled.form`
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
`;
const zip = new JSZip();
class ShareForm extends Component {
  state = {process: false};

  submit = async (formValues) => {
    if(!this.props.files.length){
      this.props.triggerPopUp("Error, must add atleast 1 file");
      return;
    }

    this.setState({process: true});
    const fn = zip.folder("files");
    const files = Array.from(this.props.files);
    files.forEach((f) => fn.file(f.name, f));

    const content = await zip.generateAsync({ type: "blob" });
    const file = new File([content], "file.zip");
    const form = new FormData();

    form.append("file", file);
    formValues.createdAt = new Date();

    await axios.post(`http://localhost:4000/api/v1/users`, {
      ...formValues,
    });

    const { data } = await axios.post(
      `http://localhost:4000/api/v1/store/uploads`,
      form
    );

    this.setState({process: false});
    this.props.triggerPopUp(data.message);
  };

  inProcess = () => {
    if(this.state.process) this.setState({process: true});
  }

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
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.submit)}
        {...this.props}
      >
        <Field name="fileSelect" component={Dropzone} />
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
          process= {this.state.process}
          inProcess = {this.inProcess}
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

const validate = (formValues) => {
  const errors = {};

  if (!formValues.sendTo) {
    errors.sendTo = "Sender 's email is mandatory";
  }

  if (!formValues.from) {
    errors.from = "Your email is mandatory";
  }

  if (formValues.sendTo && validateEmail(formValues.sendTo)) {
    errors.sendTo = "Email is invalid";
  }

  if (formValues.from && validateEmail(formValues.from)) {
    errors.from = "Email is invalid";
  }

  return errors;
};

const mapStateToProps = (state) => {
  return { files: state.files };
};

const shareForm = connect(mapStateToProps)(ShareForm);

export default reduxForm({
  form: "ShareForm",
  validate,
})(shareForm);

// export default compose(
//   connect(mapStateToProps),
//   reduxForm({ form: "ShareForm", validate})
// )(ShareForm);
