import React, { useState, useContext, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../AddProgram/AddProgram.css";
import UseOutSideClick from "../../HomePage/UseOutSideClick";
import "react-datepicker/dist/react-datepicker.css";
import { connect, useDispatch } from "react-redux";
import store, { findScrollId, editProg } from "../../../redux";

function Communities({ cityErr, findScrollId, community }) {
  const [arrow_icon_city, setArrow_iconCity] = useState(true);
  const [regions, setRegions] = useState([]);
  const [openRegions, setOpenRegions] = useState([]);
  const [language, setLanguage] = useState("arm");
  const [selectAllCity, setSelectAllCity] = useState(false);
  const ref = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/api/communities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRegions(data.data);
      })
      .catch((err) => {});
  }, []);

  const selectCommunity = (city) => {
    let arr = store.getState().prog.program.community;
    let includes = store
      .getState()
      .prog.program.community.some((item) => item.communityId === city.id);

    let newArr = [];

    if (!includes) {
      newArr = [
        ...arr,
        {
          communityId: city.id,
          community_arm: city.name,
        },
      ];
    } else {
      newArr = arr.filter((c) => city.id !== c.communityId);
    }
    dispatch(
      editProg({
        ...store.getState().prog.program,
        community: newArr,
      })
    );
  };

  UseOutSideClick(ref, () => {
    if (arrow_icon_city) setArrow_iconCity(false);
  });

  const checkRegion = (e, index) => {
    const checked = e.target.checked;
    const items = regions[index].cities;
    let communityid = store.getState().prog.program.community;
    if (checked) {
      for (let i = 0; i < items.length; i++) {
        const exists = communityid.some((item) => item == items[i].id);
        if (!exists) {
          communityid.push(items[i].id);
        }
      }

      dispatch(
        editProg({
          ...store.getState().prog.program,
          community: [...communityid],
        })
      );
    } else {
      let n = communityid;
      for (let i = 0; i < items.length; i++) {
        const ind = n.findIndex((item) => item == items[i].id);
        if (ind >= 0) {
          n.splice(ind, 1);
        }
      }
      dispatch(
        editProg({
          ...store.getState().prog.program,
          community: [...communityid],
        })
      );
    }
    regions[index].active = !regions[index].active;
    setRegions([...regions]);
  };

  const openRegion = (id) => {
    if (openRegions.some((item) => item === id)) {
      let index = openRegions.findIndex((item) => item === id);
      openRegions.splice(index, 1);
      setOpenRegions([...openRegions]);
    } else {
      openRegions.push(id);
      setOpenRegions([...openRegions]);
    }
  };

  return (
    <div>
      <div className="project_name">
        <label className="cities" id="10">
          Համայնք(ներ)
          <img
            className="star"
            src={require("../AdminIcons/red-star.svg").default}
          />
        </label>
        <button
          className={`${cityErr.classname} btnSities`}
          onClick={() => setArrow_iconCity(!arrow_icon_city)}
        >
          {store.getState().prog.program.community?.length > 0 ? (
            <label className="label_city">
              Ընտրված է {store.getState().prog.program.community.length} համայնք
            </label>
          ) : (
            <label className="label_city">Համայնք</label>
          )}
        </button>
        <img
          className="arrow_icon"
          src={require("../AdminIcons/arrow.svg").default}
          onClick={() => setArrow_iconCity(!arrow_icon_city)}
        />

        {arrow_icon_city && (
          <div ref={ref} className="nested">
            {regions.map((region, index) => (
              <div className="list" key={index}>
                <ul className="ul">
                  <div className="supportList">
                    <input
                      type="checkbox"
                      id="check"
                      className="checkbox"
                      onClick={(e) => checkRegion(e, index)}
                    />
                  </div>

                  <label className="category_name">
                    {region.regionName} ({region.cities.length})
                  </label>

                  <img
                    className="arrowSelect"
                    src={require("../AdminIcons/arrow.svg").default}
                    onClick={(e) => openRegion(region.regionId)}
                  />
                  {openRegions.some((item) => item === region.regionId) ? (
                    <div className="support_types">
                      {region.cities.map((city) => (
                        <li
                          style={{
                            backgroundColor: community.some(
                              (item) => item.communityId === city.id
                            )
                              ? "#A4C2D8"
                              : "#FAFAFA",
                          }}
                          key={city.id}
                          className="li"
                          onClick={(e) => selectCommunity(city)}
                        >
                          {city.name}
                        </li>
                      ))}{" "}
                    </div>
                  ) : null}
                </ul>
              </div>
            ))}
          </div>
        )}
        <label className="inputiError">{cityErr.editError}</label>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    community: state.prog.program.community,
    cityErr: state.prog.cityErr,
    scrollId: state.prog.scrollId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    findScrollId: (id) => dispatch(findScrollId(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Communities);
