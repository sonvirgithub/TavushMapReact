import React, { useContext, useState } from "react";
import { Modal, Button, Form, FormLabel } from "react-bootstrap";
import axios from "axios";
import { CategoryContext } from "../../pages/CategoriesPage";
import { succeeded, failed, editShow, editCategory, categoryEditSuccess } from "../../redux";
import { connect, useDispatch } from "react-redux";

function EditCategory({ category, showEdit, categoryEditSuccess }) {

  const dispatch = useDispatch()


  const handleClose = () => {
    dispatch(editShow())
    arry.map((item, index) => {
      prog[index] = {
        editError: "",
        classname: ""
      }

      setProg([...prog])
    })
  };

  const [prog, setProg] = useState([
    { editError: "", classname: '' },
    { editError: "", classname: '' },

  ])
  const [arry, setArray] = useState([])

  const validate = () => {

    arry[0] = category.name_arm
    arry[1] = category.name_eng

    setArray([...arry])

    if (category.name_arm == "" || category.name_eng == "") {

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
      .put(`/api/editCategory `, {
        category
      })
      .then((response) => {
        if (response.data.success) {

          handleClose();
          categoryEditSuccess(category)
          dispatch(succeeded(true))
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


      <Modal show={showEdit} onHide={handleClose} animation={false} style={{ display: "none" }}>
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit} style={{ display: "inline-block" }}>
            <FormLabel style={{ display: "flex" }}>Ոլորտի անվանումը (Հայերեն)</FormLabel>
            <Form.Control
              className={`${prog[0].classname}`}
              type="text"
              value={category.name_arm}
              onChange={(e) => dispatch(editCategory({ ...category, name_arm: e.target.value }))}
            />
            <label className="inputiError">{prog[0].editError}</label>

            <br />
            <FormLabel style={{ display: "flex" }}>Ոլորտի անվանումը (Enlglish)</FormLabel>
            <Form.Control
              className={`${prog[1].classname}`}
              type="text"
              value={category.name_eng}
              onChange={(e) => dispatch(editCategory({ ...category, name_eng: e.target.value }))}
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

    category: state.cat.category,
    showEdit: state.cat.showEdit

  };
};

const mapDispatchToProps = dispatch => {
  return {
    categoryEditSuccess: (category) => dispatch(categoryEditSuccess(category))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);
