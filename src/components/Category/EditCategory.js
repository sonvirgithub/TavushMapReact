import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form, FormLabel } from "react-bootstrap";
import axios from "axios";
import { CategoryContext } from "../../pages/CategoriesPage";

function EditCategory({ cat, setSuccessPage, setFailPage }) {
  const categoryCont = useContext(CategoryContext);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [category_eng, setCategoryEng] = useState("");
  const [category_arm, setCategoryArm] = useState("");

  const newDataFunc = () => {
    setId(cat.id);
    setCategoryArm(cat.name_arm);
    setCategoryEng(cat.name_eng);
  };

  useEffect(() => {
    setId(cat.id);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (evt) => {
    axios
      .put(`/api/editCategory `, {
        id,
        category_eng,
        category_arm,
      })
      .then((response) => {
        if (response.data.success) {
          const cat = {
            id: id,
            name_eng: category_eng,
            name_arm: category_arm,
          };
          handleClose();
          categoryCont.editCategory(cat);
          setSuccessPage(true);
        } else {
          handleClose();
          setFailPage(true);
        }
      })
      .catch((e) => {
        handleClose();
      });
  };

  return (
    <>
      <div
        variant="primary"
        onClick={() => {
          handleShow();
          newDataFunc();
        }}
      >
        <img className="org_icon" src={require("../../img/edit.svg").default} />
      </div>

      <Modal show={show} onHide={handleClose} animation={false} style={{  display:"none"  }}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Խմբագրել</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit} style={{  display:"inline-block"  }}>
            <FormLabel style={{  display:"flex"  }}>Ոլորտի անվանումը (Հայերեն)</FormLabel>
            <Form.Control
              type="text"
              value={category_arm}
              onChange={(e) => setCategoryArm(e.target.value)}
            />
            <br />
            <FormLabel style={{  display:"flex"  }}>Ոլորտի անվանումը (Enlglish)</FormLabel>

            <Form.Control
              type="text"
              value={category_eng}
              onChange={(e) => setCategoryEng(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Չեղարկել
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit();
              // handleClose();
            }}
          >
            Հաստատել
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditCategory;
