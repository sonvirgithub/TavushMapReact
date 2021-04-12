import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form, FormLabel } from "react-bootstrap";
import axios from "axios";
import { SupportContext } from "../../pages/SupportTypesPage";
import {
  succeeded, failed, addShow, supportAddSuccess,
 
} from "../../redux";
import { connect, useDispatch } from "react-redux";

function AddSupportType({ showAdd, supportAddSuccess,categories }) {
  const supportCont = useContext(SupportContext);

  const handleClose = () => dispatch(addShow());
  const handleShow = () => dispatch(addShow());

  const [support_eng, setSupportEng] = useState("");
  const [support_arm, setSupportArm] = useState("");
  const [categoryid, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const dispatch = useDispatch()

  useEffect(() => {
 
    categories.map((type) => {
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
            id: response.data.id,
            categoryName: categoryName,
            name_eng: support_eng,
            name_arm: support_arm,
          };
          // supportCont.addSupport(sup);
          supportAddSuccess(sup)
          // setSuccessPage(true);
          dispatch(succeeded(true))
          handleClose();
        } else {
          dispatch(failed(true))
          handleClose();
          // setFailPage(true);
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

      <Modal show={showAdd} onHide={handleClose} style={{ display: "none" }}>
        <Modal.Body>
          <Form.Group
            onSubmit={handleSubmit}
            style={{ display: "inline-block" }}
          >
            <Form.Label style={{ display: "flex" }}>Ոլորտ</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option hidden value="">
                Ոլորտ
              </option>
              {categories.length > 0 ? (
                categories.map((cat) => (
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

            <FormLabel style={{ display: "flex" }}>
              Աջակցության տեսակ (Հայերեն)
            </FormLabel>
            <Form.Control
              type="text"
              placeholder="Աջակցության տեսակ "
              onChange={(e) => setSupportArm(e.target.value)}
            />
            <br />
            <FormLabel style={{ display: "flex" }}>
              Աջակցության տեսակ (Enlglish)
            </FormLabel>

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

const mapStateToProps = (state) => {
  return {

    showAdd: state.support.showAdd,
    categories: state.cat.categories

  };
};
const mapDispatchToProps = dispatch => {
  return {
    supportAddSuccess: (sup) => dispatch(supportAddSuccess(sup)),
   
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddSupportType);
