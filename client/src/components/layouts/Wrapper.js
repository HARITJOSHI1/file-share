import React from "react";
import Styled from "styled-components";

const Container = Styled.div`
    padding: ${(props) => {
      return props.padding || "0";
    }};

    margin: ${(props) => {
      return props.margin || "0";
    }};

    border: ${(props) => props.border || "0"}
    
`;

const Wrapper = (props) => {
  return <Container {...props}>{props.children}</Container>;
};

export default Wrapper;
