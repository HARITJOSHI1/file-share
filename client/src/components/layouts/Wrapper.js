import React from "react";
import Styled from "styled-components";

const Container = Styled.div`
    padding: ${(props) => {
      return props.padding || "0";
    }};

    padding-bottom: 0;

    height: 100%;

    margin: ${(props) => {
      return props.margin || "0";
    }};

    border: ${(props) => props.border || "0"}

    @media screen and (max-width: 75em){
      padding: 5rem 6rem;
      padding-bottom: 3rem;
    }

    @media screen and (max-width: 56.25em){
        padding: 5rem 4rem;
        padding-bottom: 3rem;
    } 

    @media screen and (max-width: 37.5em){
        padding: 3rem .9rem;
        padding-bottom: 3rem;
    }
    
`;

const Wrapper = (props) => {
  return <Container {...props}>{props.children}</Container>;
};

export default Wrapper;
