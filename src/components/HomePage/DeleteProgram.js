import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { ProgramContext } from "../../pages/ProgramsPage";

function DeleteProgram({ id, show, setShow }) {
  const programCont = useContext(ProgramContext);


  const handleClose = () => setShow(false);



  const handleSubmit = () => {
    axios
      .delete(`/api/deleteProgram/${id}`)
      .then(res => {
        if (res.data.success) {
          toast.success("Ծրագիրը հեռացված է")
          programCont.deleteProgram(id);
         
          handleClose()

        } else {
          toast.error(res.data.errorMessage)
        }

      })

      .catch((e) => {
        // toast.error("Կատարված չէ");
      });
  };

  return (
    <>
      {/* <div style={{ marginLeft: "5px" }} onClick={handleShow}>
        <img
          className="org_icon"
          src={require("../../img/remove.svg").default}
        />
      </div> */}

      <Modal show={show} onHide={handleClose} animation={false}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Համոզվա՞ծ եք</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          Դուք ցանկանում եք հեռացնել  ծրագիրը
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Չեղարկել
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit();
            }}
          >
            Հաստատել
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteProgram;
