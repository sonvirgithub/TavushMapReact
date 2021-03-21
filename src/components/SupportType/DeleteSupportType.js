import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

import { SupportContext } from "../../pages/SupportTypesPage";

function DeleteSupportType({ supType, setSuccessPage, setFailPage }) {
  const supportCont = useContext(SupportContext);

  const [show, setShow] = useState(false);
  const [id, setId] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setId(supType.supportid);
  }, []);

  const handleSubmit = (evt) => {
    axios
      .delete(`api/deleteSupport/${id}`)
      .then((response) => {
        if (response.data.success) {
          supportCont.deleteSupport(id);
          setSuccessPage(true);
        } else {
          setFailPage(true);
        }
      })
      .catch((e) => {
      });
  };

  return (
    <>
      <div style={{ marginLeft: "5px" }} onClick={handleShow}>
        <img
          className="org_icon"
          src={require("../../img/remove.svg").default}
        />
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Համոզվա՞ծ եք</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          Դուք ցանկանում եք հեռացնել{" "}
          <span style={{ fontWeight: "600" }}>{supType.support_arm}</span>{" "}
          կազմակերպությունը
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Չեղարկել
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit();
              handleClose();
            }}
          >
            Հաստատել
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteSupportType;
