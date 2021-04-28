import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { SupportContext } from "../../pages/SupportTypesPage";
import { succeeded, failed, editSupportType, editShow,supportEditSuccess } from "../../redux";
import { connect, useDispatch } from "react-redux";

function EditSupportType({ supportType, categories, showEdit,supportEditSuccess }) {

  const dispatch = useDispatch()
 
  const [arry, setArray] = useState([])
  const handleClose = () => {
    dispatch(editShow())
    arry.map((item, index) => {
      prog[index] = {
        editError: "",
        classname: ""
      }

      setProg([...prog])
    })};

  const changeCategory = (event) => {
    const id = Number(event.target.value)
    categories.map((category) => {
      if (category.id == id) {
        dispatch(editSupportType({ ...supportType, categoryId: id, categoryName: category.name_arm }))
      }
    });
  }

  const [prog, setProg] = useState([
    { editError: "", classname: '' },
    { editError: "", classname: '' },
   
  ])

  const validate = () => {
   
    arry[0] = supportType.name_arm
    arry[1] = supportType.name_eng
    
    setArray([...arry])
  
    if ( supportType.name_arm == "" || supportType.name_eng == "" ) {
     
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
if(isValid)  {
    axios
      .put(`/api/editSupport`, {
        supportType

      })
      .then((response) => {

        if (response.data.success) {

          handleClose();
          supportEditSuccess(supportType)
          dispatch(succeeded(true))
        } else {
          dispatch(failed(true))
          handleClose();
        }
      })
      .catch((e) => {
        handleClose();
      });
    }
  };

  return (
    <>

      <Modal
        show={showEdit}
        onHide={handleClose}
        animation={false}
        style={{ display: "none" }}
      >
       
        <Modal.Body>
          <Form.Group
            onSubmit={handleSubmit}
            style={{ display: "inline-block" }}
          >
            <Form.Label style={{ display: "flex" }}>Ոլորտ</Form.Label>
            <Form.Control
            
              as="select"
              onChange={changeCategory} >
              <option hidden value="">{supportType.categoryName}</option>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>  {cat.name_arm} </option>
                ))
              ) : (
                <option disabled selected value> Տվյաներ չկան</option>
              )}
            </Form.Control>
            <Form.Label style={{ display: "flex" }}>
              {" "}
              Աջակցության անվանումը (Հայերեն)
            </Form.Label>
            <Form.Control
            className={`${prog[0].classname}`}
              type="text"
              placeholder=""
              value={supportType.name_arm}
              onChange={(e) => dispatch(editSupportType({ ...supportType, name_arm: e.target.value }))}
            />
             <label className="inputiError">{prog[0].editError}</label>
            <br />
            <Form.Label style={{ display: "flex" }}>
              Աջակցության անվանումը ( Enlglish)
            </Form.Label>
            <Form.Control
            className={`${prog[1].classname}`}
              type="text"
              placeholder=""
              value={supportType.name_eng}
              onChange={(e) => dispatch(editSupportType({ ...supportType, name_eng: e.target.value }))}
            />
             <label className="inputiError">{prog[1].editError}</label>
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
   
    supportType: state.support.supportType,
    showEdit: state.support.showEdit,
    categories: state.cat.categories

  };
};
const mapDispatchToProps = dispatch => {
  return {
    supportEditSuccess: (sup) => dispatch(supportEditSuccess(sup)),
   
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditSupportType);
