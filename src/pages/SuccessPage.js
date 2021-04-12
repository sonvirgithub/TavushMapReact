import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { succeeded,failed } from "../redux";
import { connect,useDispatch } from "react-redux";

function SuccessPage() {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch()

  const handleClose = () => {
    setShow(false);
  //  setSuccessPage(false);
  dispatch(succeeded(false))

  };

  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <div
          onClick={handleClose}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            cursor: "pointer",
          }}
        >
          <img
            style={{
              padding: "20px",
            }}
            src={require("../img/remove.svg").default}
          />
        </div>

        <Modal.Body>
          <div style={{ marginTop: "-30px", marginBottom: "30px" }}>
            <img
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              src={require("../img/success.svg").default}
            />
            <p> Փոփոխությունները պահպանված են</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    success: state.answer.success,
    
   
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    succeeded: () => dispatch(succeeded()),
    
   
  };
};

export default SuccessPage;
