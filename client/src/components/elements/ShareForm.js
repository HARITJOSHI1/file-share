import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import Button from "./Button";
import styled from "styled-components";

const FormWrap = styled.form`
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
`;

class ShareForm extends Component {
  submit = (formValues) => {
    console.log(formValues);
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
        onSubmit={this.props.handleSubmit(this.submit)}
        className="ui form error"
        {...this.props}
      >
        <Field
          name="SendTo"
          component={this.renderForm}
          label="Send To"
          placeholder="Email address"
        />
        <Field
          name="From"
          component={this.renderForm}
          label="From"
          placeholder="Your email address"
        />
        <Field
          name="Message"
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

const validator = (formValues) => {
  const errors = {};
  if (!formValues.SendTo) {
    errors.SendTo = "Please enter the sender 's email address";
  }

  if (!formValues.From) {
    errors.From = "Please enter your email address";
  }

  if (formValues.SendTo && validateEmail(formValues.SendTo)) {
    errors.SendTo = "Sender 's email is invalid . Make sure its correct";
  }

  if (formValues.From && validateEmail(formValues.From)) {
    errors.From = "Your email is invalid . Make sure its correct";
  }

  return errors;
};

export default reduxForm({
  form: "ShareForm",
  validate: validator,
})(ShareForm);
