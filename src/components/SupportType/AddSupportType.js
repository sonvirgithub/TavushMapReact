import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form, FormLabel } from "react-bootstrap";
import axios from "axios";
import { SupportContext } from "../../pages/SupportTypesPage";

function AddSupportType({ categoryType, setSuccessPage, setFailPage }) {

  const supportCont = useContext(SupportContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [support_eng, setSupportEng] = useState("");
  const [support_arm, setSupportArm] = useState("");
  const [categoryid, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    categoryType.map((type) => {
      if (type.id == categoryid) {
        setCategoryName(type.name_arm);
      }
    });
  });

  const handleSubmit = (evt) => {
 
    axios
      .post(`/api/addSupport`, {
        support_eng,
        support_arm,
        categoryid,
      })
      .then((response) => {
        if (response.data.success) {
          const sup = {
            supportid: response.data.id,
            category_arm: categoryName,
            support_eng: support_eng,
            support_arm: support_arm,
          };
          supportCont.addSupport(sup);
          setSuccessPage(true);
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

  return (
    <>
      <div>
        <img src={require("../HomePage/AdminIcons/add.svg").default} />
        <button variant="primary" className="button_add" onClick={handleShow}>
          Ավելացնել
        </button>
      </div>

      <Modal show={show} onHide={handleClose} style={{ display:"none" }}>
        <Modal.Body>
          <Form.Group onSubmit={handleSubmit} style={{  display:"inline-block"  }}>
            <Form.Label style={{ display:"flex" }}>Ոլորտ</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option hidden value="">
                Ոլորտ
              </option>
              {categoryType.length > 0 ? (
                categoryType.map((cat) => (
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

            <FormLabel style={{ display:"flex" }}>Աջակցության տեսակ (Հայերեն)</FormLabel>
            <Form.Control
              type="text"
              placeholder="Աջակցության տեսակ "
              onChange={(e) => setSupportArm(e.target.value)}
            />
            <br />
            <FormLabel style={{ display:"flex" }}>Աջակցության տեսակ (Enlglish)</FormLabel>

            <Form.Control
              type="text"
              placeholder="Support type"
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

export default AddSupportType;
