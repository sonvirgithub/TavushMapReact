import React, { useState, useContext, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import '../AddProgram/AddProgram.css'
import UseOutSideClick from "../../HomePage/UseOutSideClick"
import "react-datepicker/dist/react-datepicker.css";
import { connect, useDispatch } from "react-redux";
import store, { findScrollId, editProg } from "../../../redux";

function Communities({ cityErr, findScrollId }) {

  const [arrow_icon_city, setArrow_iconCity] = useState(true)
  const [communities, setCommunities] = useState([])
  const [language, setLanguage] = useState("arm")
  const [selectAllCity, setSelectAllCity] = useState(false)
  const ref = useRef();
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('/api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ language })
    })
      .then(res => res.json())
      .then(data => {
        setCommunities(data.data)
      }).catch(err => {
      })

  }, [])

  const selectAllCommunities = (select) => {
    if (select) {
      setSelectAllCity(select)
      let arr = store.getState().prog.program.community;
      let newArr = [];
      // communities.map((community) => {
      //   arr.push(
      //     {
      //       communityId: community.id,
      //       community_arm: community.name
      //     }
      //   )
      // })

      // dispatch(editProg({ ...store.getState().prog.program, community: arr }))


      communities.map((city) => {

        newArr = [...newArr, {
          communityId: city.id,
          community_arm: city.name
        }]
        dispatch(editProg({
          ...store.getState().prog.program, community: newArr
        }))

      })

    } else {
      setSelectAllCity(select)
      dispatch(editProg({
        ...store.getState().prog.program, community: []
      }))
      // dispatch(editProg({ ...store.getState().prog.program, community: [] }))
    }


  }

  const selectCommunity = (city) => {
    let arr = store.getState().prog.program.community;
    let includes = store.getState().prog.program.community.some(item => item.communityId === city.id);

    let newArr = [];

    if (!includes) {
      newArr = [...arr, {
        communityId: city.id,
        community_arm: city.name
      }]
    } else {
      newArr = arr.filter(c => city.id !== c.communityId);
    }
    dispatch(editProg({
      ...store.getState().prog.program, community: newArr
    }))


  }

  UseOutSideClick(ref, () => {
    if (arrow_icon_city) setArrow_iconCity(false);

  });

  return (
    <div>
      <div className='project_name'>
        <label className="cities" id="10">??????????????<img className="star" src={require("../AdminIcons/red-star.svg").default} /></label>
        <button className={`${cityErr.classname} btnSities`} onClick={() => setArrow_iconCity(!arrow_icon_city)}>
          {
            store.getState().prog.program.community?.length > 0 ?
              <label className="label_city" >

                ?????????????? ?? {store.getState().prog.program.community.length} ??????????????
             </label>
              :
              <label className="label_city" >

                ??????????????
          </label>
          }


        </button>
        <img className="arrow_icon" src={require("../AdminIcons/arrow.svg").default} onClick={() => setArrow_iconCity(!arrow_icon_city)} />

        {
          arrow_icon_city && (

            <div ref={ref} className="NestedSelect">
              <div className="city_checkbox">
                <input type="checkbox"
                  value={selectAllCity} defaultChecked={selectAllCity}

                  onClick={() => selectAllCommunities(!selectAllCity)} />
                <label className="all_cities">???????????? ?????????? ??????????????????????</label>
              </div>
              {communities.map((city) => (
                <div className='list city' key={city.id}>
                  <li style={{
                    backgroundColor: store.getState().prog.program.community.some(item => item.communityId === city.id) ?
                      '#A4C2D8' : '#FAFAFA'
                  }} className='li1' onClick={() => selectCommunity(city)} >{city.name}</li>
                </div>
              ))}
            </div>
          )
        }
        <label className="inputiError">{cityErr.editError}</label>

      </div>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {

    program: state.prog.program,
    cityErr: state.prog.cityErr,
    scrollId: state.prog.scrollId

  };
};
const mapDispatchToProps = dispatch => {
  return {

    findScrollId: (id) => dispatch(findScrollId(id))


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Communities)
