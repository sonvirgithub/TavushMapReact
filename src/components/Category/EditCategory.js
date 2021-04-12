import React, {  useContext } from "react";
import { Modal, Button, Form, FormLabel } from "react-bootstrap";
import axios from "axios";
import { CategoryContext } from "../../pages/CategoriesPage";
import { succeeded, failed, editShow,editCategory,categoryEditSuccess } from "../../redux";
import { connect, useDispatch } from "react-redux";

function EditCategory({ category, showEdit,categoryEditSuccess }) {

  // const categoryCont = useContext(CategoryContext);
  const dispatch = useDispatch()
 
  console.log("edit category");
  const handleClose = () => {
    dispatch(editShow())
  };

  const handleSubmit = (evt) => {

    axios
      .put(`/api/editCategory `, {
        category
      })
      .then((response) => {
        if (response.data.success) {

          handleClose();
          // categoryCont.editCat(category);
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
  };

  return (
    <>


      <Modal show={showEdit} onHide={handleClose} animation={false} style={{ display: "none" }}>
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit} style={{ display: "inline-block" }}>
            <FormLabel style={{ display: "flex" }}>Ոլորտի անվանումը (Հայերեն)</FormLabel>
            <Form.Control
              type="text"
              value={category.name_arm}
              onChange={(e) => dispatch(editCategory({ ...category, name_arm: e.target.value }))}
            />
            <br />
            <FormLabel style={{ display: "flex" }}>Ոլորտի անվանումը (Enlglish)</FormLabel>
            <Form.Control
              type="text"
              value={category.name_eng}
              onChange={(e) => dispatch(editCategory({ ...category, name_eng: e.target.value }))}
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


export default connect(mapStateToProps,mapDispatchToProps)(EditCategory);
