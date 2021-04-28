import React, { useContext } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { ProgramContext } from "../../pages/ProgramsPage";
import { connect, useDispatch } from "react-redux";
import { succeeded, failed, deleteShow, progDeleteSuccess, moreInfoShow } from "../../redux";

function DeleteProgram({ progDeleteSuccess, program, showDelete, moreInfoShow }) {

  const handleClose = () => dispatch(deleteShow());
  const dispatch = useDispatch()

  const handleSubmit = () => {
    axios
      .delete(`/api/deleteProgram/${program.id}`)
      .then(res => {
        if (res.data.success) {
          toast.success("Ծրագիրը հեռացված է")
          progDeleteSuccess(program.id)
          moreInfoShow(false)
          handleClose()
          dispatch(succeeded(true))
        } else {
          toast.error(res.data.errorMessage)
          dispatch(failed(true))
        }

      })

      .catch((e) => {
      });
  };

  return (
    <>


      <Modal show={showDelete} onHide={handleClose} animation={false}>
        <Modal.Body>
          Դուք ցանկանում եք հեռացնել {program.programName_arm} ծրագիրը
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Չեղարկել
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit();
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

    program: state.prog.program,
    showDelete: state.prog.showDelete

  };
};
const mapDispatchToProps = dispatch => {
  return {
    progDeleteSuccess: (id) => dispatch(progDeleteSuccess(id)),
    moreInfoShow: (show) => dispatch(moreInfoShow(show)),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DeleteProgram);
