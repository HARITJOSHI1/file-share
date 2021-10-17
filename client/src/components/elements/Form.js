import React, { Component } from 'react';
import ShareForm from './ShareForm';

class Form extends Component {
    render() {
        if(this.props.type === "ShareForm"){
            return (
                <> 
                    <ShareForm padding = "2rem"/>
                </>
            );
        }

        else return null;
    }
}

export default Form;
