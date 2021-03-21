import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { SupportContext } from "../../pages/SupportTypesPage";

function EditSupportType({
  supType,
  categoryType,
  setSuccessPage,
  setFailPage,
}) {
  // const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

  const categoryTypesSelect = categoryType.filter(
    (typeik) => typeik.id != supType.categoryid
  );

  const supportCont = useContext(SupportContext);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [support_arm, setSupportArm] = useState("");
  const [support_eng, setSupportEng] = useState("");
  const [categoryid_old, setCategoryId] = useState("");
  const [categoryid_new, setCategoryIdNew] = useState("");
  const [person, setPerson] = useState("");

  const newDataFunc = () => {
    setId(supType.supportid);
    setSupportArm(supType.support_arm);
    setSupportEng(supType.support_eng);
    setCategoryId(Number(supType.categoryid));
  };

  useEffect(() => {
    setId(supType.supportid);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (evt) => {
    axios
      .put(`/api/editSupport`, {
        id,
        support_eng,
        support_arm,
        categoryid_old,
        categoryid_new,
      })
      .then((response) => {
        if (response.data.success) {
          const sup = {
            id,
            support_eng,
            support_arm,
            categoryid_old,
            categoryid_new,
          };
          handleClose();
          supportCont.editSupport(sup);
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
        {/* <Modal.Header closeButton>
          <Modal.Title>Խմբագրել</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit} style={{  display:"inline-block"  }}>
            <Form.Label style={{  display:"flex"  }}>Ոլորտ</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setCategoryIdNew(Number(e.target.value))}
            >
              <option hidden value="">
                {supType.category_arm}
              </option>
              {categoryTypesSelect.length > 0 ? (
                categoryTypesSelect.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name_arm}
                  </option>
                ))
              ) : (
                <option disabled selected value>
                  Տվյաներ չկան
                </option>
              )}
            </Form.Control>
            <Form.Label style={{  display:"flex"  }}> Կազմակերպության անվանումը (Հայերեն)</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={support_arm}
              onChange={(e) => setSupportArm(e.target.value)}
            />
            <br />
            <Form.Label style={{  display:"flex"  }}>Կազմակերպության անվանումը ( Enlglish)</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={support_eng}
              onChange={(e) => setSupportEng(e.target.value)}
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

export default EditSupportType;
