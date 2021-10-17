import styled from "styled-components";

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: ${props => props.width};
    background-color: ${props => props.bg};
    border-radius: 3px;
    box-shadow: 2px 3px 1rem 3px rgba(0, 0, 0, 0.3);

    @media screen and (max-width: 75em){
        width: 50%;
    }

    @media screen and (max-width: 56.25em){
        width: 60%;
    }

    @media screen and (max-width: 37.5em){
        width: 90%;
    }
`;