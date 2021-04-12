import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { SupportContext } from "../../pages/SupportTypesPage";
import { succeeded, failed, editSupportType, editShow,supportEditSuccess } from "../../redux";
import { connect, useDispatch } from "react-redux";

function EditSupportType({ supportType, categories, showEdit,supportEditSuccess }) {

  const dispatch = useDispatch()
  const supportCont = useContext(SupportContext);
console.log("kkkkkkkk",supportType);

  const handleClose = () => dispatch(editShow());

  const changeCategory = (event) => {
    const id = Number(event.target.value)
    categories.map((category) => {
      if (category.id == id) {
        dispatch(editSupportType({ ...supportType, categoryId: id, categoryName: category.name_arm }))

      }
    });
  }

  const handleSubmit = (evt) => {

    axios
      .put(`/api/editSupport`, {
        supportType

      })
      .then((response) => {

        if (response.data.success) {

          handleClose();

          // supportCont.editSupport(supportType);
          supportEditSuccess(supportType)
          // setSuccessPage(true);
          dispatch(succeeded(true))
        } else {
          dispatch(failed(true))
          handleClose();
          // setFailPage(true);
        }
      })
      .catch((e) => {
        handleClose();
      });
  };

  return (
    <>

      <Modal
        show={showEdit}
        onHide={handleClose}
        animation={false}
        style={{ display: "none" }}
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Խմբագրել</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <Form.Group
            onSubmit={handleSubmit}
            style={{ display: "inline-block" }}
          >
            <Form.Label style={{ display: "flex" }}>Ոլորտ</Form.Label>
            <Form.Control
              as="select"
              onChange={changeCategory}
            >
              <option hidden value="">
                {supportType.categoryName}
              </option>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}

                  >
                    {cat.name_arm}
                  </option>
                ))
              ) : (
                <option disabled selected value>
                  Տվյաներ չկան
                </option>
              )}
            </Form.Control>
            <Form.Label style={{ display: "flex" }}>
              {" "}
              Աջակցության անվանումը (Հայերեն)
            </Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={supportType.name_arm}
              onChange={(e) => dispatch(editSupportType({ ...supportType, name_arm: e.target.value }))}
            />
            <br />
            <Form.Label style={{ display: "flex" }}>
              Աջակցության անվանումը ( Enlglish)
            </Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={supportType.name_eng}
              onChange={(e) => dispatch(editSupportType({ ...supportType, name_eng: e.target.value }))}
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
   
    supportType: state.support.supportType,
    showEdit: state.support.showEdit,
    categories: state.cat.categories

  };
};
const mapDispatchToProps = dispatch => {
  return {
    supportEditSuccess: (sup) => dispatch(supportEditSuccess(sup)),
   
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditSupportType);
