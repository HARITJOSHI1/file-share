import React, { Component, useState, useRef, useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Header from "./Header/Header";
import history from "./history";

let FILES = [];
const fileStore = (arr) => {
  FILES = [...FILES, ...arr];
  return FILES;
}

const Dropzone = () => {
  const ref = useRef();
  const [files, setFiles] = useState([]);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setFiles(fileStore(ref.current.files));
  }, [added]);

  return (
    <div>
      <form style={{ height: "50vh" }}>
        <label
          htmlFor="dropzone"
          style={{
            backgroundColor: "orangered",
            width: "40%",
            height: "40%",
            display: "block",
          }}
        >
          {!files.length ? "Drag and drop your files" : files.slice(-1)[0].name}
        </label>
        <input
          onChange={() => setAdded(!added)}
          ref={ref}
          style={{ display: "none" }}
          type="file"
          multiple
          accept="5"
          id="dropzone"
        />
      </form>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Header} />
            <Route exact path="/dropdown" component={Dropzone} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
