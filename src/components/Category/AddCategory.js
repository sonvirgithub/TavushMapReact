import React, { useState, useContext } from "react";
import { Modal, Button, Form, FormLabel } from "react-bootstrap";
import axios from "axios";
import { CategoryContext } from "../../pages/CategoriesPage";
import { succeeded, failed, addShow, categoryAddSuccess} from "../../redux";
import { connect, useDispatch } from "react-redux";


function AddCategory({ showAdd , categoryAddSuccess}) {
  // const categoryCont = useContext(CategoryContext);

  const handleClose = () => dispatch(addShow());
  const handleShow = () => dispatch(addShow());

  const [category_eng, setCategoryEng] = useState("");
  const [category_arm, setCategoryArm] = useState("");

  const dispatch = useDispatch()
 
  const handleSubmit = (evt) => {

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
          // categoryCont.addCategory(cat);
          categoryAddSuccess(cat)
          //  setSuccessPage(true);
          dispatch(succeeded(true))

          handleClose();
        } else {
          handleClose();
          //  setFailPage(true);


          dispatch(failed(true))

        }
      })
      .catch((e) => {
        handleClose();
      });
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
              type="text"
              placeholder="Ոլորտի անվանումը"
              onChange={(e) => setCategoryArm(e.target.value)}
            />
            <br />
            <FormLabel style={{ display: "flex" }}>Ոլորտի անվանումը (Enlglish)</FormLabel>

            <Form.Control
              type="text"
              placeholder="Category name "
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
export default connect(mapStateToProps,mapDispatchToProps)(AddCategory);
