import React, { Component } from 'react';
import ShareForm from './ShareForm';
import { GoFileSymlinkFile } from "react-icons/go";

class Form extends Component {
    render() {
        if(this.props.type === "ShareForm"){
            return (
                <> 
                    <ShareForm padding = "2rem" files= {this.props.files}/>
                </>
            );
        }

        else return null;
    }
}

export default Form;
