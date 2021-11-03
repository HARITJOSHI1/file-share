import React, { useState, useEffect, useRef } from "react";
import { GoFileSymlinkFile } from "react-icons/go";
import {addFiles} from "../actions";
import {connect} from 'react-redux';

let FILES = [];
const fileStore = (arr) => {
  FILES = [...FILES, ...arr];
  return FILES;
};

const Dropzone = (props) => {
  const ref = useRef();
  const [files, setFiles] = useState([]);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setFiles(fileStore(ref.current.files));
  }, [added]);

  if(files.length){
    props.addFiles(files);
  }

  return (
    <div style={{marginBottom: '2rem', height: props.height}}>
      <label
        htmlFor="dropzone"
        style={{
          fontFamily: "Helvetica",
          fontSize: `${props.fontSize}`,
          backgroundColor: "#F4F5FF",
          height: '100%',
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          border: "2px dashed #bdbebf",
          borderRadius: '2px',
          padding: '2rem 0',
          cursor: 'pointer'
        }}
      >
        <i style={{ width: "15%", height: "15%", marginBottom: '1rem', color: '#8f97b5' }}>
          {" "}
          <GoFileSymlinkFile style={{ width: "100%", height: "100%" }} />
        </i>
        <span style={{color: '#8f97b5'}}>{!files.length ? "Drag and drop your files" : files.length + " files"}</span>
      </label>
      <input
        onChange={() => setAdded(!added)}
        ref={ref}
        style={{ display: "none" }}
        type="file"
        multiple
        accept="5"
        id="dropzone"
        name="photos"
      />
    </div>
  );
};

export default connect(null, {addFiles})(Dropzone);
