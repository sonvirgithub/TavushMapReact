import React, {  useContext } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { SettingContext } from "../../pages/SettingPage";
import { connect,useDispatch } from "react-redux";
import { succeeded,failed, deleteShow,userDeleteSuccess} from "../../redux";

function DeleteSetting({ show, setShow, setSuccessPage, setFailPage,user,showDelete,userDeleteSuccess }) {
  const settingCont = useContext(SettingContext);

  const handleClose = () => dispatch(deleteShow());
 
  const dispatch = useDispatch()
  const handleSubmit = (evt) => {
    axios
      .delete(`/api/deleteUser/${user.id}`)
      .then((response) => {
        if (response.data.success) {
         
          userDeleteSuccess(user.id)
          
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
        {/* <Modal.Header closeButton>
          <Modal.Title>Համոզվա՞ծ եք</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          Դուք ցանկանում եք հեռացնել {user.firstname} {user.lastname} - ին
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
    
    user: state.set.user,
    showDelete: state.org.showDelete
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
      userDeleteSuccess: (id) => dispatch(userDeleteSuccess(id))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(DeleteSetting);
