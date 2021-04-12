import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form, FormLabel } from "react-bootstrap";
import axios from "axios";
import { SettingContext } from "../../pages/SettingPage";
import { succeeded, failed, editUser,editShow, userEditSuccess } from "../../redux";
import { connect,useDispatch } from "react-redux";


function EditSetting({ show,setShow, setSuccessPage, setFailPage,user, showEdit,userEditSuccess }) {
  
  const settingCont = useContext(SettingContext);
  const handleClose = () => dispatch(editShow());
  const dispatch = useDispatch()

  const handleSubmit = (evt) => {
console.log("edituser ",user);
    axios
      .put(`/api/editUserInfo`, {
        user
      })
      .then((response) => {
        if (response.data.success) {
          userEditSuccess(user)
          dispatch(succeeded(true))
          handleClose();
          // settingCont.editUser(user);
          // setSuccessPage(true);
        } else {
          handleClose();
          // setFailPage(true);
          dispatch(failed(true))
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
        {/* <Modal.Header closeButton> */}
        {/* <Modal.Title>Փոխել անունը</Modal.Title> */}
        {/* </Modal.Header> */}
        <Modal.Body>
          <div>
            <span style={{ color: "#05558F", fontSize: "22px" }}>
              {" "}
              Փոխել անունը
            </span>
          </div>
          <Form.Group
            onSubmit={handleSubmit}
            style={{ display: "inline-block" }}
          >
            <FormLabel style={{ display: "flex" }}>Անուն</FormLabel>
            <Form.Control
              type="text"
              value={user.firstname}
              onChange={(e) => dispatch(editUser({ ...user, firstname: e.target.value }))}
            />
            <br />
            <FormLabel style={{ display: "flex" }}>Ազգանուն</FormLabel>

            <Form.Control
              type="text"
              value={user.lastname}
              onChange={(e) =>  dispatch(editUser({ ...user, lastname: e.target.value }))}
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
    success: state.answer.success,
    fail: state.answer.fail,
    user: state.set.user,
    showEdit: state.org.showEdit

  };
};
const mapDispatchToProps = dispatch => {
  return {
      userEditSuccess: (user) => dispatch(userEditSuccess(user))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(EditSetting);
