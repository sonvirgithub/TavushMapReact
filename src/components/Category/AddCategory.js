import React, { useState, useContext } from "react";
import { Modal, Button, Form, FormLabel } from "react-bootstrap";
import axios from "axios";
import { CategoryContext } from "../../pages/CategoriesPage";
import { succeeded, failed, addShow, categoryAddSuccess } from "../../redux";
import { connect, useDispatch } from "react-redux";


function AddCategory({ showAdd, categoryAddSuccess }) {

  const handleClose = () => {
    dispatch(addShow())
    arry.map((item, index) => {
      prog[index] = {
        editError: "",
        classname: ""
      }

      setProg([...prog])
    })
    setCategoryEng("")
    setCategoryArm("")
  }
  const handleShow = () => dispatch(addShow());

  const [category_eng, setCategoryEng] = useState("");
  const [category_arm, setCategoryArm] = useState("");

  const [prog, setProg] = useState([
    { editError: "", classname: '' },
    { editError: "", classname: '' },

  ])
  const [arry, setArray] = useState([])

  const dispatch = useDispatch()

  const validate = () => {

    arry[0] = category_arm
    arry[1] = category_eng

    setArray([...arry])

    if (category_eng == "" || category_arm == "") {

      arry.map((item, index) => {
        if (item == "") {

          prog[index] = {
            editError: "Խնդրում ենք լրացնել դաշտը",
            classname: "class_name_input"
          }

          setProg([...prog])

        } else {

          prog[index] = {
            editError: "",
            classname: ""
          }

        }

      })
      setProg([...prog])

      return false
    }
    return true;
  }


  const handleSubmit = (evt) => {
    const isValid = validate()
    if (isValid) {
      axios
        .post(`/api/addCategory`, {
          category_eng,
          category_arm,
        })
        .then((response) => {
          if (response.data.success) {
            const cat = {
              id: response.data.id,
              name_eng: category_eng,
              name_arm: category_arm,
            };
            categoryAddSuccess(cat)
            dispatch(succeeded(true))

            handleClose();
          } else {
            handleClose();
            dispatch(failed(true))

          }
        })
        .catch((e) => {
          handleClose();
        });
    }
  };

  return (
    <>
      <div>
        <img src={require("../HomePage/AdminIcons/add.svg").default} />
        <button variant="primary" className="button_add" onClick={handleShow}>
          Ավելացնել
        </button>
      </div>

      <Modal show={showAdd} onHide={handleClose} style={{ display: "none" }}>
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit} style={{ display: "inline-block" }}>
            <FormLabel style={{ display: "flex" }}>Ոլորտի անվանումը (Հայերեն)</FormLabel>
            <Form.Control
              className={`${prog[0].classname}`}
              type="text"
              placeholder="Ոլորտի անվանումը"
              onChange={(e) => setCategoryArm(e.target.value)}
            />
            <label className="inputiError">{prog[0].editError}</label>

            <br />
            <FormLabel style={{ display: "flex" }}>Ոլորտի անվանումը (Enlglish)</FormLabel>

            <Form.Control
              className={`${prog[1].classname}`}
              type="text"
              placeholder="Category name "
              onChange={(e) => setCategoryEng(e.target.value)}
            />
            <label className="inputiError">{prog[1].editError}</label>

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
            }}
          >
            Հաստատել
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => {
  return {

    showAdd: state.cat.showAdd

  };
};
const mapDispatchToProps = dispatch => {
  return {
    categoryAddSuccess: (category) => dispatch(categoryAddSuccess(category))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);
