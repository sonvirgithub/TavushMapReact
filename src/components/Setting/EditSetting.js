import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form, FormLabel } from "react-bootstrap";
import axios from "axios";
import { SettingContext } from "../../pages/SettingPage";

function EditSetting({ set, setSuccessPage, setFailPage }) {
  const settingCont = useContext(SettingContext);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const newDataFunc = () => {
    setId(set.id);
    setFirstName(set.firstname);
    setLastName(set.lastname);
  };

  useEffect(() => {
    setId(set.id);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (evt) => {
    axios
      .put(`/api/editUserInfo`, {
        id,
        firstName,
        lastName,
      })
      .then((response) => {
        if (response.data.success) {
          const user = {
            id: id,
            firstname: firstName,
            lastname: lastName,
          };
          handleClose();
          settingCont.editUser(user);
          setSuccessPage(true);
        } else {
          handleClose();
          setFailPage(true);
        }
      })
      .catch((e) => {
        handleClose();
      });
  };

  return (
    <>
      <div
        variant="primary"
        onClick={() => {
          handleShow();
          newDataFunc();
        }}
      >
        <img className="org_icon" src={require("../../img/edit.svg").default} />
      </div>

      <Modal show={show} onHide={handleClose} animation={false} style={{  display:"none"  }}>
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
          <Form.Group onSubmit={handleSubmit} style={{  display:"inline-block"  }}>
            <FormLabel style={{  display:"flex"  }}>Անուն</FormLabel>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <br />
            <FormLabel style={{  display:"flex"  }}>Ազգանուն</FormLabel>

            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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

export default EditSetting;
