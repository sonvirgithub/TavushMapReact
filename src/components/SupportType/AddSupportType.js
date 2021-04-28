import React, { useState, useContext, useEffect,useRef } from "react";
import { Modal, Button, Form, FormLabel } from "react-bootstrap";
import axios from "axios";
import { SupportContext } from "../../pages/SupportTypesPage";
import {
  succeeded, failed, addShow, supportAddSuccess,
 
} from "../../redux";
import "../HomePage/AddProgram/AddProgram.css"
import { connect, useDispatch } from "react-redux";

function AddSupportType({ showAdd, supportAddSuccess,categories }) {

  const handleClose = () => {
    dispatch(addShow())
    arry.map((item, index) => {
      prog[index] = {
        editError: "",
        classname: ""
      }

      setProg([...prog])
    })
    setSupportArm("")
    setCategoryId("")
    setSupportEng("")
  };
  const handleShow = () => dispatch(addShow());

  const [support_eng, setSupportEng] = useState("");
  const [support_arm, setSupportArm] = useState("");
  const [categoryid, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [arry, setArray] = useState([])

  const dispatch = useDispatch()


  const [prog, setProg] = useState([
    { editError: "", classname: '' },
    { editError: "", classname: '' },
    { editError: "", classname: '' },
  ])


  useEffect(() => {
 
    categories.map((type) => {
      if (type.id == categoryid) {
        setCategoryName(type.name_arm);
      }
    });
  });


  const validate = () => {
   
    arry[0] = categoryid
    arry[1] = support_arm
    arry[2] = support_eng
    

    setArray([...arry])
  
    if (categoryid == "Ոլորտ" || support_arm == "" || support_eng == "" || categoryid == "") {
     
      arry.map((item, index) => {
        if (item == ""  ) {

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
    if(isValid) {
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
    } else {
      
    }
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
            className={`${prog[0].classname}`}
              as="select"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option hidden value="" >
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
            <label className="inputiError">{prog[0].editError}</label>

            <FormLabel style={{ display: "flex" , marginTop:  "20px"}}>
              Աջակցության տեսակ (Հայերեն)
            </FormLabel>
            <Form.Control
             className={`${prog[1].classname}`}
              type="text"
              placeholder="Աջակցության տեսակ "
              onChange={(e) => setSupportArm(e.target.value)}
            />
             <label className="inputiError">{prog[1].editError}</label>
            <br />
            <FormLabel style={{ display: "flex" }}>
              Աջակցության տեսակ (Enlglish)
            </FormLabel>

            <Form.Control
             className={`${prog[2].classname}`}
              type="text"
              placeholder="Support type"
              onChange={(e) => setSupportEng(e.target.value)}
            />
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
