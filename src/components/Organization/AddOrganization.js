import React, { useState, useContext } from "react";
import { Modal, Button, Form, FormLabel } from "react-bootstrap";
import axios from "axios";
import { OrganizationContext } from "../../pages/OrganizationsPage";
import SuccessPage from "../../pages/SuccessPage";
import { succeeded, failed, addShow, orgAddSuccess } from "../../redux";
import { connect, useDispatch } from "react-redux";

function AddOrganization({ showAdd, orgAddSuccess }) {

  const handleClose = () => {
    dispatch(addShow())
    arry.map((item, index) => {
      prog[index] = {
        editError: "",
        classname: ""
      }

      setProg([...prog])
    })
    setNameArm("")
    setNameEng("")
    setPerson("")
  };
  const handleShow = () => dispatch(addShow());
  

  const [nameArm, setNameArm] = useState("");
  const [nameEng, setNameEng] = useState("");
  const [person, setPerson] = useState("");
  const dispatch = useDispatch()

  const [prog, setProg] = useState([
    { editError: "", classname: '' },
    { editError: "", classname: '' },
    { editError: "", classname: '' },

  ])
  const [arry, setArray] = useState([])
  const validate = () => {

    arry[0] = nameArm
    arry[1] = nameEng
    arry[2] = person

    setArray([...arry])

    if (nameArm == "" || nameEng == "" || person == "") {

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
    if (isValid) {
      axios
        .post(`/api/addOrganization`, {
          nameArm,
          nameEng,
          person,
        })
        .then((response) => {
          if (response.data.success) {
            const org = {
              id: response.data.id,
              nameEng: nameEng,
              nameArm: nameArm,
              contactPersonArm: person,
            };
            orgAddSuccess(org)
            dispatch(succeeded(true))
            handleClose();
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
      <div>
        <img
          src={require("../HomePage/AdminIcons/add.svg").default}
        //   className="add_icon"
        />
        <button variant="primary" className="button_add" onClick={handleShow}>
          Ավելացնել
        </button>
      </div>

      <Modal show={showAdd} onHide={handleClose} style={{ display: "none" }}>

        <Modal.Body>
          <Form.Group
            onSubmit={handleSubmit}
            style={{ display: "inline-block" }}
          >
            <FormLabel style={{ display: "flex" }} >
              Կազմակերպության անվանումը (Հայերեն)
            </FormLabel>
            <Form.Control
            className={`${prog[0].classname}`}
              type="text"
              placeholder="Կազմակերպության անվանումը"
              onChange={(e) => setNameArm(e.target.value)}
            />
            <label className="inputiError">{prog[0].editError}</label>
            <br />
            <FormLabel style={{ display: "flex" }}>
              Կազմակերպության անվանումը (Enlglish)
            </FormLabel>

            <Form.Control
            className={`${prog[1].classname}`}
              type="text"
              placeholder="Organization name "
              onChange={(e) => setNameEng(e.target.value)} />
            <label className="inputiError">{prog[1].editError}</label>
            <br />
            <FormLabel style={{ display: "flex" }}>Կոնտակտ անձ</FormLabel>

            <Form.Control
            className={`${prog[2].classname}`}
              type="text"
              placeholder="Անուն Ազգանուն"
              onChange={(e) => setPerson(e.target.value)} />
            <label className="inputiError">{prog[2].editError}</label>
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
  // }
}

const mapStateToProps = (state) => {
  return {

    showAdd: state.org.showAdd

  };
};
const mapDispatchToProps = dispatch => {
  return {
    orgAddSuccess: (org) => dispatch(orgAddSuccess(org))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOrganization);
