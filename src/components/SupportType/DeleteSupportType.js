import React, {  useContext } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { succeeded,failed, deleteShow,supportDeleteSuccess} from "../../redux";
import { connect,useDispatch } from "react-redux";
import { SupportContext } from "../../pages/SupportTypesPage";

function DeleteSupportType({ supportType,showDelete,supportDeleteSuccess }) {

  const supportCont = useContext(SupportContext);
  const dispatch = useDispatch()
  
  const handleClose = () =>  dispatch(deleteShow());

  const handleSubmit = (evt) => {
    axios
      .delete(`/api/deleteSupport/${supportType.id}`)
      .then((response) => {
        if (response.data.success) {
          // supportCont.deleteSupport(supportType.id);
          supportDeleteSuccess(supportType.id)
          // setSuccessPage(true);
          dispatch(succeeded(true))
        } else {
          // setFailPage(true);
          dispatch(failed(true))
        }
      })
      .catch((e) => { });
  };

  return (
    <>
     

      <Modal show={showDelete} onHide={handleClose} animation={false}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Համոզվա՞ծ եք</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          Դուք ցանկանում եք հեռացնել{" "}
          <span style={{ fontWeight: "600" }}>{supportType.name_arm}</span>{" "}
          կազմակերպությունը
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
    
    supportType: state.support.supportType,
    showDelete: state.support.showDelete
    
  };
};
const mapDispatchToProps = dispatch => {
  return {
    supportDeleteSuccess: (id) => dispatch(supportDeleteSuccess(id)),
   
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(DeleteSupportType);
