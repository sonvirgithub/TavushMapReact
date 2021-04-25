import React, { useState, useContext, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import '../AddProgram/AddProgram.css'
import UseOutSideClick from "../../HomePage/UseOutSideClick"
import "react-datepicker/dist/react-datepicker.css";
import { connect, useDispatch } from "react-redux";
import { changeIsSelect, changeSupMoreInfo, editProg } from "../../../redux";

function SupportTypes({ isSelect, changeIsSelect, suppForMoreInfo, supErr, editProg, program,support }) {
  const dispatch = useDispatch()

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
        console.log(data.data, "data.data");

      }).catch(err => {
      })


  }, []);

  UseOutSideClick(ref, () => {

    if (arrow_icon_category) setArrow_iconCategory(false);
  });

  const selectSupport = (supportId, name,categId, categName) => {

    if (isSelect.some(item => item.supportid === supportId)) {
      let index = isSelect.findIndex(item => item.supportid === supportId);
      isSelect.splice(index, 1)

      let index1 = support.findIndex(item => item.categoryId === categId);

        if (support[index1].supports.some(item => item.supportid === supportId)) {
          
          let index2 = support[index1].supports.findIndex(item => item.supportid === supportId);
          support[index1].supports.splice(index2,1)
          if(support[index1].supports.length == 0) {
            support.splice(index1,1)
          }
        }

    
    console.log("SUPPORT",support);
    // dispatch(editProg({ ...program, support: support }))
    console.log("supForMoreInfo",suppForMoreInfo);

  }
    else {
      isSelect.push({ supportid: supportId, name: name })

      if (support.some(item => item.categoryId === categId)) {
        let index = support.findIndex(item => item.categoryId === categId);

        support[index].supports.push({
          name: name,
          supportid: supportId
        })
        console.log("sSUPPORT",support);

      } else {

        let array = [{name:name,supportid:supportId}]
        support.push({
          supports:array,
          categoryId: categId,
          category_arm: categName
        })
        console.log("sSUPPORT",support);

      }


    }

    changeIsSelect([...isSelect])
    console.log("supForMoreInfo",suppForMoreInfo);


  }

  const checkCategory = (e, category) => {

    if (checkedCategory.some(item => item === category.categoryid)) {
      let index = checkedCategory.findIndex(item => item === category.categoryid);
      checkedCategory.splice(index, 1)
      setCheckedCategory([...checkedCategory])

    } else {
      checkedCategory.push(category.categoryid)
      setCheckedCategory([...checkedCategory])
    }

    if (checkedCategory.some(item => item === category.categoryid)) {
      for (let i = 0; i < category.support.length; i++) {
        if (isSelect.some(item => item.supportid === category.support[i].supportid)) {

        }
        else {
          isSelect.push({
            supportid: category.support[i].supportid,
            name: category.support[i].name
          })

          if (support.some(item => item.categoryId === category.categoryid)) {
            let index = support.findIndex(item => item.categoryId === category.categoryid);
    
            support[index].supports.push({
              name: category.support[i].name,
              supportid: category.support[i].supportid
            })
            console.log("sSUPPORT",support);
    
          } else {
    
            let array = [{name:category.support[i].name,supportid:category.support[i].supportid}]
            support.push({
              supports:array,
              categoryId: category.categoryid,
              category_arm: category.category
            })
            console.log("sSUPPORT",support);
    
          }


        }
      }
    } else {
      for (let i = 0; i < category.support.length; i++) {
        if (isSelect.some(item => item.supportid === category.support[i].supportid)) {

          let index = isSelect.findIndex(item => item.supportid === category.support[i].supportid);
          isSelect.splice(index, 1)

          let index1 = support.findIndex(item => item.categoryId === category.categoryid);

          if (support[index1].supports.some(item => item.supportid === category.support[i].supportid)) {
            
            let index2 = support[index1].supports.findIndex(item => item.supportid === category.support[i].supportid);
            support[index1].supports.splice(index2,1)
            if(support[index1].supports.length == 0) {
              support.splice(index1,1)
            }
          }

        }
       
      }
    }

    changeIsSelect([...isSelect])
    // dispatch(editProg({ ...program, support: support }))
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
        <label className="support_type" id="11">Աջակցության տեսակ(ներ)<img className="star" src={require("../AdminIcons/red-star.svg").default} /></label>

        <button className={`${supErr.classname} btnSities`} id='btnSelect' onClick={() => { setArrow_iconCategory(!arrow_icon_category) }}>
          {
            isSelect.length > 0 ?
              <label className="label_city">Ընտրված է {isSelect.length} տեսակ</label>
              : <label className="label_city" >Աջակցության տեսակ</label>

          }
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

                            }} key={index} className="li" onClick={() => selectSupport(support.supportid, support.name, categore.categoryid, categore.category)}>
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
        <label className="inputiError">{supErr.editError}</label>

      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {

    isSelect: state.prog.isSelect,
    suppForMoreInfo: state.moreInfo.suppForMoreInfo,
    supErr: state.prog.supErr,
    program: state.prog.program,
    support: state.prog.support

  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeIsSelect: (isSelect) => dispatch(changeIsSelect(isSelect)),
    // changeSupMoreInfo: (sup) => dispatch(changeSupMoreInfo(sup))
    editProg: (prog) => dispatch(editProg(prog))


  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SupportTypes)
