import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { CategoryContext } from "../../pages/CategoriesPage";

function DeleteCategory({ cat, setSuccessPage, setFailPage }) {
  const categoryCont = useContext(CategoryContext);

  const [show, setShow] = useState(false);
  const [id, setId] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setId(cat.id);
  }, []);

  const handleSubmit = (evt) => {
    axios
      .delete(`api/deleteCategory/${id}`)
      .then((response) => {
        if (response.data.success) {
          categoryCont.deleteCategory(id);
          setSuccessPage(true);
        } else {
          setFailPage(true);
          //   toast.error(response.data.errorMessage);
        }
      })
      .catch((e) => {
        // toast.error("Կատարված չէ");
      });
  };

  return (
    <>
      <div style={{ marginRight: "15px" }} onClick={handleShow}>
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
          Դուք ցանկանում եք հեռացնել {cat.name_arm} կազմակերպությունը
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

export default DeleteCategory;
