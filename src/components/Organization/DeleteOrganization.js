import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { OrganizationContext } from "../../pages/OrganizationsPage";
import { succeeded,failed, deleteShow, orgDeleteSuccess} from "../../redux";
import { connect,useDispatch } from "react-redux";

function DeleteOrganization({ org, showDelete,orgDeleteSuccess}) {
  // const organizationCont = useContext(OrganizationContext);

  const handleClose = () => dispatch(deleteShow());
  const dispatch = useDispatch()

  const handleSubmit = (evt) => {
    axios
      .delete(`/api/deleteOrganization/${org.id}`)
      .then((response) => {
        if (response.data.success) {
        
          orgDeleteSuccess(org.id)
          dispatch(succeeded(true))
          //   toast.success("Կատարված է");
        } else {
         
          dispatch(failed(true))
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
          Դուք ցանկանում եք հեռացնել {org.nameArm} կազմակերպությունը
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
    
    org: state.org.org,
    showDelete: state.org.showDelete
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
      orgDeleteSuccess: (id) => dispatch(orgDeleteSuccess(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DeleteOrganization);
