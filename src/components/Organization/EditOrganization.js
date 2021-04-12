import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { OrganizationContext } from "../../pages/OrganizationsPage";
import { succeeded, failed, editOrg,editShow, orgEditSuccess } from "../../redux";
import { connect, useDispatch } from "react-redux";

function EditOrganization({ org, showEdit, orgEditSuccess }) {
  
  // const organizationCont = useContext(OrganizationContext);
  const dispatch = useDispatch()

  const handleClose = () =>  dispatch(editShow());
  
  const handleSubmit = (evt) => {
    
    axios
      .put(`/api/editOrganization`, {
       org
      })
      .then((response) => {
        if (response.data.success) {
          handleClose();
          // organizationCont.editOrganization(org);
          // setSuccessPage(true);
          orgEditSuccess(org)
          dispatch(succeeded(true))
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
        {/* <Modal.Header closeButton>
          <Modal.Title>Խմբագրել</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <Form.Group
            onSubmit={handleSubmit}
            style={{ display: "inline-block" }}
          >
            <Form.Label style={{ display: "flex" }}>
              {" "}
              Կազմակերպության անվանումը (Հայերեն)
            </Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={org.nameArm}
              onChange={(e) => dispatch(editOrg({ ...org, nameArm: e.target.value }))}
            />
            <br />
            <Form.Label style={{ display: "flex" }}>
              Կազմակերպության անվանումը (Enlglish)
            </Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={org.nameEng}
              onChange={(e) => dispatch(editOrg({ ...org, nameEng: e.target.value }))}
            />
            <br />
            <Form.Label style={{ display: "flex" }}>Կոնտակտ անձ</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={org.contactPersonArm}
              onChange={(e) => dispatch(editOrg({ ...org, contactPersonArm: e.target.value }))}
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
    
    org: state.org.org,
    showEdit: state.org.showEdit

  };
};

const mapDispatchToProps = dispatch => {
  return {
      orgEditSuccess: (org) => dispatch(orgEditSuccess(org))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(EditOrganization);
