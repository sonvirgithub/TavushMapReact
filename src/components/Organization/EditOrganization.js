import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { OrganizationContext } from "../../pages/OrganizationsPage";
import { succeeded, failed, editOrg,editShow, orgEditSuccess } from "../../redux";
import { connect, useDispatch } from "react-redux";

function EditOrganization({ org, showEdit, orgEditSuccess }) {
  
  // const organizationCont = useContext(OrganizationContext);
  const dispatch = useDispatch()
  const [arry, setArray] = useState([])
  const handleClose = () =>  {
    dispatch(editShow())
    arry.map((item, index) => {
      prog[index] = {
        editError: "",
        classname: ""
      }

      setProg([...prog])
    })};
  

  const [prog, setProg] = useState([
    { editError: "", classname: '' },
    { editError: "", classname: '' },
    { editError: "", classname: '' },

  ])

  const validate = () => {

    arry[0] = org.nameArm
    arry[1] = org.nameEng
    arry[2] = org.contactPersonArm

    setArray([...arry])

    if (org.nameArm == "" || org.nameEng == "" || org.contactPersonArm == "") {

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

    if(isValid) {
   
    axios
      .put(`/api/editOrganization`, {
       org
      })
      .then((response) => {
        if (response.data.success) {
          handleClose();
          orgEditSuccess(org)
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
      <Modal
        show={showEdit}
        onHide={handleClose}
        animation={false}
        style={{ display: "none" }}>
      
        <Modal.Body>
          <Form.Group
            onSubmit={handleSubmit}
            style={{ display: "inline-block" }} >
            <Form.Label style={{ display: "flex" }}>
              {" "}
              Կազմակերպության անվանումը (Հայերեն)
            </Form.Label>
            <Form.Control
            className={`${prog[0].classname}`}
              type="text"
              placeholder=""
              value={org.nameArm}
              onChange={(e) => dispatch(editOrg({ ...org, nameArm: e.target.value }))}
            />
            <label className="inputiError">{prog[0].editError}</label>
            <br />
            <Form.Label style={{ display: "flex" }}>
              Կազմակերպության անվանումը (Enlglish)
            </Form.Label>
            <Form.Control
            className={`${prog[1].classname}`}
              type="text"
              placeholder=""
              value={org.nameEng}
              onChange={(e) => dispatch(editOrg({ ...org, nameEng: e.target.value }))}
            />
            <label className="inputiError">{prog[1].editError}</label>
            <br />
            <Form.Label style={{ display: "flex" }}>Կոնտակտ անձ</Form.Label>
            <Form.Control
            className={`${prog[2].classname}`}
              type="text"
              placeholder=""
              value={org.contactPersonArm}
              onChange={(e) => dispatch(editOrg({ ...org, contactPersonArm: e.target.value }))}
            />
            <label className="inputiError">{prog[2].editError}</label>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>  Չեղարկել </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit()}}>Հաստատել </Button>
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
