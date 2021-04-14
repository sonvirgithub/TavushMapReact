import React, {  useContext } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { CategoryContext } from "../../pages/CategoriesPage";
import { succeeded, failed, deleteShow,categoryDeleteSuccess } from "../../redux";
import { connect, useDispatch } from "react-redux";


function DeleteCategory({ category, showDelete,categoryDeleteSuccess }) {
  // const categoryCont = useContext(CategoryContext);

  const handleClose = () => {

    dispatch(deleteShow())

  }

  const dispatch = useDispatch()
 

  const handleSubmit = (evt) => {
    axios
      .delete(`/api/deleteCategory/${category.id}`)
      .then((response) => {
        if (response.data.success) {
          // categoryCont.deleteCat(category.id);
          // setSuccessPage(true);
          categoryDeleteSuccess(category.id)
          dispatch(succeeded(true))
        } else {
          dispatch(failed(true))
          //  setFailPage(true);
          //   toast.error(response.data.errorMessage);
        }
      })
      .catch((e) => {
        // toast.error("Կատարված չէ");
      });
  };

  return (
    <>


      <Modal show={showDelete} onHide={handleClose} animation={false}>
        <Modal.Body>
          Դուք ցանկանում եք հեռացնել {category.name_arm} կազմակերպությունը
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

const mapStateToProps = (state) => {
  return {

    category: state.cat.category,
    showDelete: state.cat.showDelete

  };
};
const mapDispatchToProps = dispatch => {
  return {
      categoryDeleteSuccess: (id) => dispatch(categoryDeleteSuccess(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DeleteCategory);
