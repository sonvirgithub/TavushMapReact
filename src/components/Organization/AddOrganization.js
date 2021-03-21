import React, { useState, useContext } from "react";
import { Modal, Button, Form, FormLabel } from "react-bootstrap";
import axios from "axios";
import { OrganizationContext } from "../../pages/OrganizationsPage";
import SuccessPage from "../../pages/SuccessPage";

function AddOrganization({ successPage, setSuccessPage, setFailPage }) {
  const organizationCont = useContext(OrganizationContext);

  const [show, setShow] = useState(false);
  // const [success, setSuccess] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [nameArm, setNameArm] = useState("");
  const [nameEng, setNameEng] = useState("");
  const [person, setPerson] = useState("");

  const handleSubmit = (evt) => {
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
            name_eng: nameEng,
            name_arm: nameArm,
            person: person,
          };
          organizationCont.addOrganization(org);
          // setSuccess(true);
          setSuccessPage(true);
          // setSuccessPage(successPage);
          handleClose();
        } else {
          handleClose();
          setFailPage(true);
        }
      })
      .catch((e) => {
        handleClose();
      });
  };

  // if (success) {
  //   return <SuccessPage />;
  // } else {
  return (
    <>
      <div
      //    className="div_add"
      >
        <img
          src={require("../HomePage/AdminIcons/add.svg").default}
          //   className="add_icon"
        />
        <button variant="primary" className="button_add" onClick={handleShow}>
          Ավելացնել
        </button>
      </div>
      {/* <Button variant="secondary" onClick={handleShow}>
          Ավելացնել կազմակերպություն
        </Button> */}

      <Modal show={show} onHide={handleClose} style={{  display:"none"  }}>
        {/* <Modal.Header> */}
        {/* <Modal.Title>Ավելացնել կազմակերպություն</Modal.Title> */}
        {/* </Modal.Header> */}
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit} style={{  display:"inline-block"  }}>
            <FormLabel style={{ display:"flex" }}>Կազմակերպության անվանումը (Հայերեն)</FormLabel>
            <Form.Control
              type="text"
              placeholder="Կազմակերպության անվանումը"
              onChange={(e) => setNameArm(e.target.value)}
            />
            <br />
            <FormLabel style={{ display:"flex" }}>Կազմակերպության անվանումը (Enlglish)</FormLabel>

            <Form.Control
              type="text"
              placeholder="Organization name "
              onChange={(e) => setNameEng(e.target.value)}
              //   className={error}
            />
            <br />
            <FormLabel style={{ display:"flex" }}>Կոնտակտ անձ</FormLabel>

            <Form.Control
              type="text"
              placeholder="Անուն Ազգանուն"
              onChange={(e) => setPerson(e.target.value)}
              //   className={error}
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
  // }
}

export default AddOrganization;
