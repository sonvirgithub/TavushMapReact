import React, { useState } from "react";
import { Modal } from "react-bootstrap";

function FailPage({ setFailPage }) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    setFailPage(false);
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <div
          onClick={handleClose}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            cursor: "pointer",
          }}
        >
          <img
            style={{
              padding: "20px",
            }}
            src={require("../img/remove.svg").default}
          />
        </div>

        <Modal.Body>
          <div style={{ marginTop: "-30px", marginBottom: "30px" }}>
            <img
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              src={require("../img/fail.svg").default}
            />
            <p>Գործողությունը ձախողվել է։</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FailPage;
