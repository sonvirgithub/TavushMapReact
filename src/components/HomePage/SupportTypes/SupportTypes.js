import React, { useState, useContext, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import '../AddProgram/AddProgram.css'
import UseOutSideClick from "../../HomePage/UseOutSideClick"
import "react-datepicker/dist/react-datepicker.css";
import { connect, useDispatch } from "react-redux";
import { changeIsSelect, changeSupMoreInfo, editProg } from "../../../redux";

function SupportTypes({ isSelect, changeIsSelect, suppForMoreInfo, supErr, editProg, program, support }) {
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


      }).catch(err => {
      })


  }, []);

  UseOutSideClick(ref, () => {

    if (arrow_icon_category) setArrow_iconCategory(false);
  });

  const selectSupport = (supportId, name, categId, categName) => {

    if (isSelect.some(item => item.supportid === supportId)) {
      let index = isSelect.findIndex(item => item.supportid === supportId);
      isSelect.splice(index, 1)

      

      let index1 = support.findIndex(item => item.categoryId === categId);

      let arr = support[index1].supports
      let newArr = [];



      newArr = arr.filter(c => supportId !== c.supportid);
      dispatch(editProg({
        ...program, support: [...support.map((sup) => {
          if (sup.categoryId === categId) {
           
            return Object.assign({}, sup, {
              supports: newArr,
              categoryId: categId,
              category_arm: categName

            })

          }
          return sup
        })]
      }))


   
      // if (support[index1].supports.length == 0) {
      //   console.log("datark");
      //   let arr = support
      //   let newArr = []
      //   newArr = arr.filter(c => categId !== c.categoryId);

      //   dispatch(editProg({
      //     ...program, support: newArr
      //   }))


      // }

    }
    else {
      isSelect.push({ supportid: supportId, name: name })

      if (support.some(item => item.categoryId === categId)) {

        let newArr1 = []
        let index = support.findIndex(item => item.categoryId === categId)
        let arr1 = support[index].supports

        newArr1 = [...arr1, {
          name: name,
          supportid: supportId
        }]

        dispatch(editProg({
          ...program, support: [...support.map((sup) => {
            if (sup.categoryId === categId) {
              return Object.assign({}, sup, {
                supports: newArr1,
                categoryId: categId,
                category_arm: categName

              })

            }

            return sup
          })]
        }))


      }

      else {
        let array = [{ name: name, supportid: supportId }]

        let arr = support
        let newArr = [];

        newArr = [...arr, {
          supports: array,
          categoryId: categId,
          category_arm: categName
        }]
        dispatch(editProg({
          ...program, support: newArr
        }))
      }

    }

    changeIsSelect([...isSelect])
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
        if (!isSelect.some(item => item.supportid === category.support[i].supportid)) {

          isSelect.push({
            supportid: category.support[i].supportid,
            name: category.support[i].name
          })


          categores.map((cat) => {

            if (cat.categoryid === category.categoryid) {

              let arr = support.filter(c => c.categoryId !== category.categoryid)
              let newArr = arr
              newArr = [...newArr, {
                supports: cat.support,
                categoryId: cat.categoryid,
                category_arm: cat.category
              }]
              dispatch(editProg({
                ...program, support: newArr
              }))

            }
          })


        }
      }
    } else {
      for (let i = 0; i < category.support.length; i++) {
        if (isSelect.some(item => item.supportid === category.support[i].supportid)) {

          let index = isSelect.findIndex(item => item.supportid === category.support[i].supportid);
          isSelect.splice(index, 1)

          // let index1 = support.findIndex(item => item.categoryId === category.categoryid);

          // if (support[index1].supports.some(item => item.supportid === category.support[i].supportid)) {

          //   let index2 = support[index1].supports.findIndex(item => item.supportid === category.support[i].supportid);
          //   support[index1].supports.splice(index2, 1)
          //   if (support[index1].supports.length == 0) {
          //     support.splice(index1, 1)
          //   }
          // }

          let arr = support
          let newArr = []
          newArr = arr.filter(c => category.categoryid !== c.categoryId);
          dispatch(editProg({
            ...program, support: newArr
          }))

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
        <label className="support_type" id="12">Աջակցության տեսակ(ներ)<img className="star" src={require("../AdminIcons/red-star.svg").default} /></label>

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
