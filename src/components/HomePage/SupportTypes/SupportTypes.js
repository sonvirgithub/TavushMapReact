import React, { useState, useContext, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import '../AddProgram/AddProgram.css'
import UseOutSideClick from "../../HomePage/UseOutSideClick"
import "react-datepicker/dist/react-datepicker.css";
import { connect, useDispatch } from "react-redux";
import { changeIsSelect } from "../../../redux";

function SupportTypes({isSelect,changeIsSelect}) {

    const [categores, setCategores] = useState([])
    const [language, setLanguage] = useState("arm")
    const [arrow_icon_category, setArrow_iconCategory] = useState(true)
    const [checkedCategory, setCheckedCategory] = useState([])
    const [openCategory, setOpenCategory] = useState([])
    const ref = useRef();

    useEffect(() => {


        fetch('/api/supportsList', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ language })
        })
          .then(res => res.json())
          .then(data => {
            setCategores(data.data)
            console.log("category",data.data);
    
          }).catch(err => {
          })
    
    
      }, []);

      UseOutSideClick(ref, () => {
    
        if (arrow_icon_category) setArrow_iconCategory(false);
      });

    const selectSupport = (supportId) => {

        if (isSelect.some(item => item.supportid === supportId)) {
          let index = isSelect.findIndex(item => item.supportid === supportId);
          isSelect.splice(index, 1)
        }
        else {
          isSelect.push({ supportid: supportId })
        }
    
        // dispatch(editProg({
        //   ...store.getState().prog.program,
        //   isSelect: isSelect
        // }))
        changeIsSelect([...isSelect])
        
      }

      const checkCategory = (e, category) => {

        if (checkedCategory.some(item => item === category.id)) {
          let index = checkedCategory.findIndex(item => item === category.id);
          checkedCategory.splice(index, 1)
          setCheckedCategory([...checkedCategory])
    
        } else {
          checkedCategory.push(category.id)
          setCheckedCategory([...checkedCategory])
        }
    
        if (checkedCategory.some(item => item === category.id)) {
          for (let i = 0; i < category.support.length; i++) {
            if (isSelect.some(item => item.supportid === category.support[i].supportid)) {
    
            }
            else {
              isSelect.push({
                supportid: category.support[i].supportid
              })
    
            }
          }
        } else {
          for (let i = 0; i < category.support.length; i++) {
            if (isSelect.some(item => item.supportid === category.support[i].supportid)) {
    
              let index = isSelect.findIndex(item => item.supportid === category.support[i].supportid);
              isSelect.splice(index, 1)
    
            }
            else {
    
            }
          }
        }
        // dispatch(editProg({
        //   ...store.getState().prog.program,
        //   isSelect: isSelect
        // }))
        changeIsSelect([...isSelect])
      }
    
      const openCategores = (id) => {

        if (openCategory.some(item => item === id)) {
          let index = openCategory.findIndex(item => item === id);
          openCategory.splice(index, 1)
          setOpenCategory([...openCategory])
    
        } else {
          openCategory.push(id)
          setOpenCategory([...openCategory])
        }
      }

    return (
        <div>
             <div className="project_name">
              <label className="support_type">Աջակցության տեսակ(ներ)</label>

              <button className='btnSities' id='btnSelect' onClick={() => { setArrow_iconCategory(!arrow_icon_category) }}>
                <label className="label_city">Support Type</label>
              </button>
              <img className="arrow_icon" src={require("../AdminIcons/arrow.svg").default} onClick={() => { setArrow_iconCategory(!arrow_icon_category) }} />
              {
                arrow_icon_category && (
                  <div ref={ref} className="nested">
                    {categores.map((categore, index) => (

                      <div className='list' key={index}>

                        <ul className='ul' >

                          <div className='supportList'>
                            <input type="checkbox" className="checkbox" onClick={(e) => checkCategory(e, categore)}
                            />
                          </div>

                          <label className="category_name">{categore.category} ({categore.support.length})</label>

                          <img className='arrowSelect' src={require("../AdminIcons/arrow.svg").default} onClick={(e) => openCategores(categore.categoryid)} />
                          {
                            openCategory.some(item => item === categore.categoryid) ? (
                              <div className="support_types" >


                                {categore.support.map((support, index) => (
                                  <li style={{
                                    backgroundColor: isSelect.some(item => item.supportid === support.supportid) ? '#A4C2D8' : '#FAFAFA',

                                  }} key={index} className="li" onClick={() => selectSupport(support.supportid)}>
                                    {support.name}
                                  </li>
                                ))}


                              </div>
                            ) : null
                          }
                        </ul>

                      </div>
                    ))}
                  </div>
                )
              }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {

        isSelect: state.prog.isSelect,


    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeIsSelect: (isSelect) => dispatch(changeIsSelect(isSelect)),

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SupportTypes)
