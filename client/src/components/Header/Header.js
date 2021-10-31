import React from "react";
// import { useDropzone } from "react-dropzone";
// import { GoFileSymlinkFile } from "react-icons/go";
// import {Dropzone} from "../App";
// import styled from "styled-components";
import Wrapper from "../layouts/Wrapper";
import Jumbotron from "./Jumbotron";
import Form from "../elements/Form";
import { Card } from "../elements/Card";
import "./Header.scss";

// const Dropzone = styled.div`
//   flex: 1;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   border-width: 2px;
//   border-color: ${(props) => props.color};
//   border-style: dashed;
//   background-color: #fafafa;
//   color: #bdbdbd;
//   outline: none;
//   transition: border 0.24s ease-in-out;
//   cursor: pointer;
// `;

export default function Header() {
  // const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
  //   maxFiles: 4,
  // });
  // const files = [];
  // const thumb = () => {
  //   acceptedFiles.forEach((file) => {
  //     files.push(
  //       <li class="item" key={file.path}>
  //         <div class="content">
  //           <div class="header">{file.name}</div>
  //         </div>
  //       </li>
  //     );
  //   });
  // };

  return (
    <section className="sec-1">
      <Wrapper padding="10rem 8rem">
        <div className="header">
          <Jumbotron
            heading="Share"
            tagline="Share your files"
            des="Secure, Fast, and Free"
          />

          <Card width="30%" bg="white">
            {/* <Dropzone {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <i style={{ width: "30%", height: "30%" }}>
                {" "}
                <GoFileSymlinkFile style={{ width: "100%", height: "100%" }} />
              </i>
              <p style={{ fontFamily: "Helvetica", marginTop: "1rem" }}>
                Drag and drop you files here
              </p>

              {thumb()}

              <aside>
                <ul
                  className="ui middle aligned selection list"
                  style={{ listStyle: "none" }}
                >
                  {files}
                </ul>
              </aside>
            </Dropzone> */}
            {/* <Dropzone /> */}

            <Form type="ShareForm"/>
          </Card>
        </div>
      </Wrapper>
    </section>
  );
}
