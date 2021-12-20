import React, { useState, useEffect, useRef } from "react";
import "./AddProgram.css";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import UseOutSideClick from "../UseOutSideClick";
import store, {
  succeeded,
  failed,
  addShow,
  progAddSuccess,
  findScrollId,
  changeSupMoreInfo,
  editProg,
  deleteSupMoreInfo,
} from "../../../redux";
import { connect, useDispatch } from "react-redux";
import Select from "../../Form/Select";

function AddProgram({
  progAddSuccess,
  support,
  showAdd,
  editProg,
  findScrollId,
  scrollId,
}) {
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(addShow());
    arry.map((item, index) => {
      prog[index] = {
        editError: "",
        classname: "",
      };

      setProg([...prog]);
    });

    setCommunityName([]);
    setOrgName([]);
    setCategoryName([]);
  };

  const selectEndDate = () => {
    setSelected(true);
  };

  const handleShow = () => dispatch(addShow());
  const [saveClassName, setSaveClassName] = useState("");
  const [indexes, setIndexes] = useState([]);
  const [arry, setArray] = useState([]);

  const [program, setProgram] = useState({
    name_arm: "",
    name_eng: "",
    communityid: [],
    budget: "",
    start_date: new Date(),
    end_date: new Date(),
    manager_arm: "",
    manager_eng: "",
    contactPerson_arm: "",
    contactPerson_eng: "",
    organizationid: [],
    description_arm: "",
    description_eng: "",
    statusid: "",
    isSelect: [],
    donorId: null,
    isdonor: false,
  });

  const [regions, setRegions] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [donors, setDonors] = useState([]);
  const [categores, setCategores] = useState([]);
  const [communityid, setCommunity] = useState([]);
  const [donor, setDonor] = useState(null);
  const [organizationid, setOrganization] = useState([]);
  const [statusid, setStatus] = useState("");
  const [isSelect, setIsSelect] = useState([]);
  const [language, setLanguage] = useState("arm");
  const [arrow_icon_city, setArrow_iconCity] = useState(false);
  const [arrow_icon_org, setArrow_iconOrg] = useState(false);
  const [arrow_icon_status, setArrow_iconStatus] = useState(false);
  const [arrow_icon_category, setArrow_iconCategory] = useState(false);
  const [categoryid_supportid, setArrayCategores] = useState([]);
  const [checkedCategory, setCheckedCategory] = useState([]);
  const [checkedRegion, setCheckedRegion] = useState([]);
  const [openCategory, setOpenCategory] = useState([]);
  const [openRegions, setOpenRegions] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [communityName, setCommunityName] = useState([]);
  const [orgName, setOrgName] = useState([]);
  const [selectAllCity, setSelectAllCity] = useState(false);

  const [prog, setProg] = useState([
    { editError: "", classname: "" },
    { editError: "", classname: "" },
    { editError: "", classname: "" },
    { editError: "", classname: "" },
    { editError: "", classname: "" },
    { editError: "", classname: "" },
    { editError: "", classname: "" },
    { editError: "", classname: "" },
    { editError: "", classname: "" },
    { editError: "", classname: "" },
    { editError: "", classname: "" },
    { editError: "", classname: "" },
    { editError: "", classname: "" },
    { editError: "", classname: "" },
    { editError: "", classname: "" },
  ]);
  const ref = useRef();

  UseOutSideClick(ref, () => {
    if (arrow_icon_city) setArrow_iconCity(false);
    if (arrow_icon_org) setArrow_iconOrg(false);
    if (arrow_icon_status) setArrow_iconStatus(false);
    if (arrow_icon_category) setArrow_iconCategory(false);
  });

  useEffect(() => {
    fetch("/api/donors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDonors(data.data);
      })
      .catch((err) => {});

    fetch("/api/organizations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOrganizations(data.data);
      })
      .catch((err) => {});

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

    fetch("/api/supportsList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCategores(data.data);
      })
      .catch((err) => {});

    if (
      program.name_arm != "" &&
      program.name_eng != "" &&
      program.budget != "" &&
      program.start_date !== null &&
      program.manager_arm != "" &&
      program.manager_eng != "" &&
      program.contact_arm != "" &&
      program.contact_eng != "" &&
      program.description_arm != "" &&
      program.description_eng != "" &&
      communityid?.length != 0 &&
      donor != null &&
      organizationid?.length != 0 &&
      isSelect?.length != 0 &&
      statusid != ""
    ) {
      setSaveClassName("save_class1");
    } else if (
      program.name_arm != "" ||
      program.name_eng != "" ||
      program.budget != "" ||
      program.start_date == null ||
      program.manager_arm != "" ||
      program.manager_eng != "" ||
      program.contact_arm != "" ||
      program.contact_eng != "" ||
      program.description_arm != "" ||
      program.description_eng != "" ||
      communityid?.length != 0 ||
      organizationid?.length != 0 ||
      donor != null ||
      isSelect?.length != 0
    ) {
      setSaveClassName("save_class2");
    }
  }, []);

  async function addProject() {
    if (!selected) {
      program.end_date = null;
    }

    let body = {
      name_arm: program.name_arm,
      name_eng: program.name_eng,
      communityid,
      budget: program.budget,
      start_date: program.start_date,
      end_date: program.end_date,
      manager_arm: program.manager_arm,
      manager_eng: program.manager_eng,
      contactPerson_arm: program.contactPerson_arm,
      contactPerson_eng: program.contactPerson_eng,
      organizationid,
      categoryid_supportid,
      description_arm: program.description_arm,
      description_eng: program.description_eng,
      statusid,
      donorId: donor?.id,
      isdonor: program.isdonor,
      language,
    };

    const isValid = validate();
    if (isValid) {
      body = JSON.stringify(body);
      const headers = {};
      headers["Content-Type"] = "application/json";
      fetch("/api/addProgram", {
        method: "POST",
        body,
        headers,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            if (statusid == 1) {
              var status1 = "Ընթացիկ";
            } else {
              var status1 = "Ավարտված";
            }
            handleClose();
            const prog = {
              id: data.programid,
              programName_arm: program.name_arm,
              programName_eng: program.name_eng,
              budget: program.budget,
              startDate: program.start_date,
              endDate: program.end_date,
              manager_arm: program.manager_arm,
              manager_eng: program.manager_eng,
              contact_arm: program.contactPerson_arm,
              contact_eng: program.contactPerson_eng,
              description_arm: program.description_arm,
              description_eng: program.description_eng,
              isDonor: program.isdonor,
              status: status1,
              statusId: statusid,
              support: categoryName,
              isSelect: isSelect,
              community: communityName,
              organization: orgName,
              support: support,
              donorId: donor?.id,
            };

            progAddSuccess(prog);

            dispatch(succeeded(true));
          } else {
            dispatch(failed(true));
          }
        });
      setProgram({
        name_arm: "",
        name_eng: "",
        communityid: [],
        budget: "",
        start_date: new Date(),
        end_date: new Date(),
        manager_arm: "",
        manager_eng: "",
        contactPerson_arm: "",
        contactPerson_eng: "",
        organizationid: [],
        description_arm: "",
        description_eng: "",
        statusid: 0,
        isSelect: [],
        isdonor: false,
      });
      setCommunity([]);
      setOrganization([]);
      setIsSelect([]);
      setStatus("");

      arry.map((item, index) => {
        prog[index] = {
          editError: "",
          classname: "",
        };
        setProg([...prog]);
      });
    } else {
      executeScroll();
    }
  }
  const cancel = () => {
    handleClose();
    setProgram({
      name_arm: "",
      name_eng: "",
      communityid: [],
      budget: "",
      start_date: new Date(),
      end_date: new Date(),
      manager_arm: "",
      manager_eng: "",
      contactPerson_arm: "",
      contactPerson_eng: "",
      organizationid: [],
      description_arm: "",
      description_eng: "",
      statusid: "",
      isSelect: [],
      isdonor: false,
    });
    setCommunity([]);
    setOrganization([]);
    setIsSelect([]);
  };

  const selectSupport = (e, supportId, supName, categoryId, name) => {
    if (isSelect.some((item) => item.supportid === supportId)) {
      let index = isSelect.findIndex((item) => item.supportid === supportId);
      isSelect.splice(index, 1);

      for (let i = 0; i < categoryid_supportid.length; i++) {
        if (categoryid_supportid[i].supportid === supportId) {
          categoryid_supportid.splice(i, 1);
          categoryName.splice(i, 1);
        }
      }

      let index1 = support.findIndex((item) => item.categoryId === categoryId);

      if (
        support[index1].supports.some((item) => item.supportid === supportId)
      ) {
        let index2 = support[index1].supports.findIndex(
          (item) => item.supportid === supportId
        );
        support[index1].supports.splice(index2, 1);
        if (support[index1].supports.length == 0) {
          support.splice(index1, 1);
        }
      }

      dispatch(editProg({ ...program, support: support }));
    } else {
      isSelect.push({ supportid: supportId, name: supName });
      categoryid_supportid.push({
        categoryid: categoryId,
        supportid: supportId,
      });

      if (categoryName.some((item) => item.category_arm === name)) {
      } else {
        categoryName.push({ category_arm: name });
      }

      if (support.some((item) => item.categoryId === categoryId)) {
        let index = support.findIndex((item) => item.categoryId === categoryId);

        support[index].supports.push({
          name: supName,
          supportid: supportId,
        });
      } else {
        let array = [{ name: supName, supportid: supportId }];
        support.push({
          supports: array,
          categoryId: categoryId,
          category_arm: name,
        });
      }
    }
    setIsSelect([...isSelect]);
  };

  const openCategores = (id) => {
    if (openCategory.some((item) => item === id)) {
      let index = openCategory.findIndex((item) => item === id);
      openCategory.splice(index, 1);
      setOpenCategory([...openCategory]);
    } else {
      openCategory.push(id);
      setOpenCategory([...openCategory]);
    }
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

  const selectCommunity = (city) => {
    if (communityid.some((item) => item === city.id)) {
      let index = communityid.findIndex((item) => item === city.id);
      communityid.splice(index, 1);
      communityName.splice(index, 1);
      setCommunity([...communityid]);
    } else {
      communityid.push(city.id);
      communityName.push({ community_arm: city.name, communityId: city.id });

      setCommunity([...communityid]);
    }
  };
  const selectOrganization = (org) => {
    if (organizationid.some((item) => item === org.id)) {
      let index = organizationid.findIndex((item) => item === org.id);
      organizationid.splice(index, 1);
      orgName.splice(index, 1);
      setOrganization([...organizationid]);
    } else {
      organizationid.push(org.id);
      orgName.push({ organizationName_arm: org.name, organizationId: org.id });
      setOrganization([...organizationid]);
    }
  };

  const checkCategory = (e, category) => {
    if (checkedCategory.some((item) => item === category.categoryid)) {
      let index = checkedCategory.findIndex(
        (item) => item === category.categoryid
      );
      checkedCategory.splice(index, 1);
      setCheckedCategory([...checkedCategory]);
    } else {
      checkedCategory.push(category.categoryid);
      setCheckedCategory([...checkedCategory]);
    }

    if (checkedCategory.some((item) => item === category.categoryid)) {
      for (let i = 0; i < category.support.length; i++) {
        if (
          isSelect.some(
            (item) => item.supportid === category.support[i].supportid
          )
        ) {
        } else {
          isSelect.push({
            name: category.support[i].name,
            supportid: category.support[i].supportid,
          });

          if (support.some((item) => item.categoryId === category.categoryid)) {
            let index = support.findIndex(
              (item) => item.categoryId === category.categoryid
            );

            support[index].supports.push({
              name: category.support[i].name,
              supportid: category.support[i].supportid,
            });
          } else {
            let array = [
              {
                name: category.support[i].name,
                supportid: category.support[i].supportid,
              },
            ];
            support.push({
              supports: array,
              categoryId: category.categoryid,
              category_arm: category.category,
            });
          }

          categoryid_supportid.push({
            categoryid: category.categoryid,
            supportid: category.support[i].supportid,
          });
          if (
            categoryName.some((item) => item.category_arm === category.category)
          ) {
          } else {
            categoryName.push({ category_arm: category.category });
          }
        }
      }
    } else {
      for (let i = 0; i < category.support.length; i++) {
        if (
          isSelect.some(
            (item) => item.supportid === category.support[i].supportid
          )
        ) {
          let index = isSelect.findIndex(
            (item) => item.supportid === category.support[i].supportid
          );
          isSelect.splice(index, 1);
          categoryid_supportid.splice(index, 1);
          categoryName.splice(index, 1);

          let index1 = support.findIndex(
            (item) => item.categoryId === category.categoryid
          );

          if (
            support[index1].supports.some(
              (item) => item.supportid === category.support[i].supportid
            )
          ) {
            let index2 = support[index1].supports.findIndex(
              (item) => item.supportid === category.support[i].supportid
            );
            support[index1].supports.splice(index2, 1);
            if (support[index1].supports.length == 0) {
              support.splice(index1, 1);
            }
          }
        }
      }
    }
  };

  const checkRegion = (e, index) => {
    const checked = e.target.checked;
    const items = regions[index].cities;
    if (checked) {
      for (let i = 0; i < items.length; i++) {
        const exists = communityid.some((item) => item == items[i].id);
        if (!exists) {
          communityid.push(items[i].id);
        }
      }

      setCommunity([...communityid]);
    } else {
      let n = communityid;
      for (let i = 0; i < items.length; i++) {
        const ind = n.findIndex((item) => item == items[i].id);
        if (ind >= 0) {
          n.splice(ind, 1);
        }
      }
      setCommunity([...n]);
    }
    regions[index].active = !regions[index].active;
    setRegions([...regions]);
  };
  const auto_grow = (element) => {
    element.target.style.height = "50px";
    element.target.style.height = element.target.scrollHeight + "px";
  };

  const validate = () => {
    arry[0] = program.name_arm;
    arry[1] = program.name_eng;
    arry[2] = communityid;
    arry[3] = program.budget;
    arry[4] = program.start_date;
    arry[5] = program.manager_arm;
    arry[6] = program.manager_eng;
    arry[7] = program.contactPerson_arm;
    arry[8] = program.contactPerson_eng;
    arry[9] = organizationid;
    arry[10] = isSelect;
    arry[11] = program.description_arm;
    arry[12] = program.description_eng;
    arry[13] = statusid;

    setArray([...arry]);

    if (
      program.name_arm == "" ||
      program.name_eng == "" ||
      program.budget == "" ||
      program.start_date == null ||
      program.manager_arm == "" ||
      program.manager_eng == "" ||
      program.contactPerson_arm == "" ||
      program.contactPerson_eng == "" ||
      program.description_arm == "" ||
      program.description_eng == "" ||
      communityid.length == 0 ||
      organizationid.length == 0 ||
      isSelect.length == 0 ||
      statusid == ""
    ) {
      arry.map((item, index) => {
        if (item === "" || item?.length == 0 || item == null) {
          if (indexes.some((item) => item == index)) {
          } else {
            indexes.push(index);
          }

          prog[index] = {
            editError: "Խնդրում ենք լրացնել դաշտը",
            classname: "class_name_input",
          };

          setProg([...prog]);
        } else {
          if (indexes.some((item) => item === index)) {
            let index1 = indexes.findIndex((item) => item === index);
            indexes.splice(index1, 1);
          }
          prog[index] = {
            editError: "",
            classname: "",
          };
        }
      });
      setProg([...prog]);
      return false;
    }
    return true;
  };

  const executeScroll = () => {
    findScrollId(Math.min(...indexes));
  };

  return (
    <div>
      <div>
        <img src={require("../AdminIcons/add.svg").default} />
        <button variant="primary" className="button_add" onClick={handleShow}>
          Ավելացնել
        </button>
      </div>

      <Modal show={showAdd} onHide={handleClose} animation={false}>
        <Modal.Body>
          <div className="project_name">
            <label className="project_name_label" id="0">
              Ծրագրի անուն (Հայերեն)
              <img
                className="star"
                src={require("../AdminIcons/red-star.svg").default}
              />
            </label>
            <textarea
              className={`${prog[0].classname} project_name_input`}
              placeholder="Ծրագրի անուն հայերեն"
              value={program.name_arm}
              onChange={(e) =>
                setProgram({ ...program, name_arm: e.target.value })
              }
              onInput={(e) => auto_grow(e)}
            />
            <label className="inputiError">{prog[0].editError}</label>
          </div>
          <div className="project_name">
            <label className="project_name_label" id="1">
              Ծրագրի անուն (English)
              <img
                className="star"
                src={require("../AdminIcons/red-star.svg").default}
              />
            </label>
            <textarea
              className={`${prog[1].classname} project_name_input`}
              placeholder="Project name in English"
              value={program.name_eng}
              onChange={(e) =>
                setProgram({ ...program, name_eng: e.target.value })
              }
              onInput={(e) => auto_grow(e)}
            />
            <label className="inputiError">{prog[1].editError}</label>
          </div>

          <div className="project_name">
            <label className="support_type" id="10">
              Համայնք(ներ)
              <img
                className="star"
                src={require("../AdminIcons/red-star.svg").default}
              />
            </label>

            <button
              className={`${prog[2].classname} btnSities`}
              id="btnSelect"
              onClick={() => {
                setArrow_iconCity((prev) => !prev);
              }}
            >
              {communityid.length > 0 ? (
                <label className="label_city">
                  Ընտրված է {communityid.length} համայնք{" "}
                </label>
              ) : (
                <label className="label_city">Համայնք</label>
              )}
            </button>
            <img
              className="arrow_icon"
              src={require("../AdminIcons/arrow.svg").default}
              onClick={() => {
                setArrow_iconCity((prev) => !prev);
              }}
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
                                backgroundColor: communityid.some(
                                  (item) => item === city.id
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
            <label className="inputiError">{prog[2].editError}</label>
          </div>

          {/* budget-i inputnery */}
          <div className="project_name">
            <label className="budge_name" id="3">
              Բյուջե
              <img
                className="star"
                src={require("../AdminIcons/red-star.svg").default}
              />
            </label>
            <input
              className={`${prog[3].classname} budge_input`}
              placeholder="10 000"
              onChange={(e) =>
                setProgram({ ...program, budget: e.target.value })
              }
            />
            <div className="usd_input">USD</div>
            <label className="inputiError">{prog[3].editError}</label>
          </div>

          {/* date-eri inputnery */}
          <div className="display_flex">
            <div className="start">
              <label className="start_date_label" id="4">
                Սկիզբ
                <img
                  className="star_start_date"
                  src={require("../AdminIcons/red-star.svg").default}
                />
              </label>

              <DatePicker
                selected={program.start_date}
                onChange={(date) =>
                  setProgram({ ...program, start_date: date })
                }
                className={`${prog[4].classname} dateStart`}
                closeOnScroll={true}
              />
              <label className="start_date_err inputiError">
                {prog[4].editError}
              </label>
            </div>

            <div className="end">
              <label className="end_date_label">Ավարտ</label>
              <DatePicker
                selected={program.end_date}
                startDate={program.end_date}
                onChange={(date) => {
                  setProgram({ ...program, end_date: date });
                  selectEndDate();
                }}
                className="dateEnd"
                closeOnScroll={true}
              />
            </div>
          </div>

          {/* xekavari input-nery */}
          <div className="project_name">
            <label className="project_name_label" id="5">
              Ծրագրի ղեկավար (Հայերեն)
              <img
                className="star"
                src={require("../AdminIcons/red-star.svg").default}
              />
            </label>
            <textarea
              className={`${prog[5].classname} project_name_input`}
              placeholder="Անուն, Ազգանուն"
              value={program.manager_arm}
              onChange={(e) =>
                setProgram({ ...program, manager_arm: e.target.value })
              }
              onInput={(e) => auto_grow(e)}
            />
            <label className="inputiError">{prog[5].editError}</label>
          </div>
          <div className="project_name">
            <label className="project_name_label" id="6">
              Ծրագրի ղեկավար (English)
              <img
                className="star"
                src={require("../AdminIcons/red-star.svg").default}
              />
            </label>
            <textarea
              className={`${prog[6].classname} project_name_input`}
              placeholder="Firstname, Lastname"
              value={program.manager_eng}
              onChange={(e) =>
                setProgram({ ...program, manager_eng: e.target.value })
              }
              onInput={(e) => auto_grow(e)}
            />
            <label className="inputiError">{prog[6].editError}</label>
          </div>

          {/* contactPerson-i input-nery */}
          <div className="project_name">
            <label className="project_name_label" id="7">
              Կոնտակտ անձ (Հայերեն)
              <img
                className="star"
                src={require("../AdminIcons/red-star.svg").default}
              />
            </label>
            <textarea
              className={`${prog[7].classname} project_name_input`}
              placeholder="Անուն, Ազգանուն"
              value={program.contactPerson_arm}
              onChange={(e) =>
                setProgram({ ...program, contactPerson_arm: e.target.value })
              }
              onInput={(e) => auto_grow(e)}
            />
            <label className="inputiError">{prog[7].editError}</label>
          </div>
          <div className="project_name">
            <label className="project_name_label" id="8">
              Կոնտակտ անձ (Անգլերեն)
              <img
                className="star"
                src={require("../AdminIcons/red-star.svg").default}
              />
            </label>
            <textarea
              className={`${prog[8].classname} project_name_input`}
              placeholder="Firstname, Lastname"
              value={program.contactPerson_eng}
              onChange={(e) =>
                setProgram({ ...program, contactPerson_eng: e.target.value })
              }
              onInput={(e) => auto_grow(e)}
            />
            <label className="inputiError">{prog[8].editError}</label>
          </div>

          {/* organizationi input-nery */}
          <div className="project_name">
            <label className="kazmakerp_arm" id="9">
              Կազմակերպություններ
              <img
                className="star"
                src={require("../AdminIcons/red-star.svg").default}
              />
            </label>
            <button
              className={`${prog[9].classname} btnSities`}
              onClick={() => setArrow_iconOrg(!arrow_icon_org)}
            >
              {organizationid.length > 0 ? (
                <label className="label_city">
                  {" "}
                  Ընտրված է {organizationid.length} կազմակերպություն{" "}
                </label>
              ) : (
                <label className="label_city">Կազմակերպություն </label>
              )}
            </button>
            <img
              className="arrow_icon"
              src={require("../AdminIcons/arrow.svg").default}
              onClick={() => setArrow_iconOrg(!arrow_icon_org)}
            />

            {arrow_icon_org && (
              <div ref={ref} className="NestedSelect">
                {organizations.map((organization) => (
                  <div className="list city radio" key={organization.id}>
                    <li
                      className="li1"
                      style={{
                        backgroundColor: organizationid.some(
                          (item) => item === organization.id
                        )
                          ? "#A4C2D8"
                          : "#FAFAFA",
                      }}
                      onClick={() => selectOrganization(organization)}
                    >
                      {organization.name}
                    </li>
                  </div>
                ))}
              </div>
            )}
            <label className="inputiError">{prog[9].editError}</label>
          </div>

          {/* support_type input-nery */}

          <div className="project_name">
            <label className="support_type" id="10">
              Աջակցության տեսակ(ներ)
              <img
                className="star"
                src={require("../AdminIcons/red-star.svg").default}
              />
            </label>

            <button
              className={`${prog[10].classname} btnSities`}
              id="btnSelect"
              onClick={() => {
                setArrow_iconCategory(!arrow_icon_category);
              }}
            >
              {isSelect.length > 0 ? (
                <label className="label_city">
                  Ընտրված է {isSelect.length} տեսակ{" "}
                </label>
              ) : (
                <label className="label_city">Support Type</label>
              )}
            </button>
            <img
              className="arrow_icon"
              src={require("../AdminIcons/arrow.svg").default}
              onClick={() => {
                setArrow_iconCategory(!arrow_icon_category);
              }}
            />
            {arrow_icon_category && (
              <div ref={ref} className="nested">
                {categores.map((categore, index) => (
                  <div className="list" key={index}>
                    <ul className="ul">
                      <div className="supportList">
                        <input
                          type="checkbox"
                          id="check"
                          className="checkbox"
                          onClick={(e) => checkCategory(e, categore)}
                        />
                      </div>

                      <label className="category_name">
                        {categore.category} ({categore.support.length})
                      </label>

                      <img
                        className="arrowSelect"
                        src={require("../AdminIcons/arrow.svg").default}
                        onClick={(e) => openCategores(categore.categoryid)}
                      />
                      {openCategory.some(
                        (item) => item === categore.categoryid
                      ) ? (
                        <div className="support_types">
                          {categore.support.map((support) => (
                            <li
                              style={{
                                backgroundColor: isSelect.some(
                                  (item) => item.supportid === support.supportid
                                )
                                  ? "#A4C2D8"
                                  : "#FAFAFA",
                              }}
                              key={support.supportid}
                              className="li"
                              onClick={(e) =>
                                selectSupport(
                                  e,
                                  support.supportid,
                                  support.name,
                                  categore.categoryid,
                                  categore.category
                                )
                              }
                            >
                              {support.name}
                            </li>
                          ))}{" "}
                        </div>
                      ) : null}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            <label className="inputiError">{prog[10].editError}</label>
          </div>

          {/* discriptionneri input-nery */}
          <div className="project_name">
            <label className="project_name_label" id="11">
              Նկարագրություն (Հայերեն)
              <img
                className="star"
                src={require("../AdminIcons/red-star.svg").default}
              />
            </label>
            <textarea
              className={`${prog[11].classname} description_input`}
              placeholder="Հակիրճ նկարագրություն"
              value={program.description_arm}
              onChange={(e) =>
                setProgram({ ...program, description_arm: e.target.value })
              }
            />
            <label className="inputiError">{prog[11].editError}</label>
          </div>
          <div className="project_name">
            <label className="project_name_label" id="12">
              Նկարագրություն (English)
              <img
                className="star"
                src={require("../AdminIcons/red-star.svg").default}
              />
            </label>
            <textarea
              className={`${prog[12].classname} description_input`}
              placeholder="Brief description"
              value={program.description_eng}
              onChange={(e) =>
                setProgram({ ...program, description_eng: e.target.value })
              }
            />
            <label className="inputiError">{prog[12].editError}</label>
          </div>

          {/* status-i inputnery */}
          <div className="project_name">
            <label className="status" id="13">
              Կարգավիճակ
              <img
                className="star"
                src={require("../AdminIcons/red-star.svg").default}
              />
            </label>
            <button
              className={`${prog[13].classname} btnSities`}
              id="btnSelect"
              onClick={() => {
                setArrow_iconStatus(!arrow_icon_status);
              }}
            >
              <label className="label_city">Կարգավիճակ</label>
            </button>
            <img
              className="arrow_icon"
              src={require("../AdminIcons/arrow.svg").default}
              onClick={() => {
                setArrow_iconStatus(!setArrow_iconStatus);
              }}
            />
            {arrow_icon_status && (
              <div ref={ref} className="select_status">
                <div className="list city">
                  <div className="radio">
                    <li
                      style={{
                        backgroundColor: statusid === 1 ? "#A4C2D8" : "#FAFAFA",
                      }}
                      className="li1"
                      onClick={() => setStatus(1)}
                    >
                      Ընթացիկ
                    </li>
                  </div>
                  <div className="radio">
                    <li
                      className="li1"
                      style={{
                        backgroundColor: statusid === 2 ? "#A4C2D8" : "#FAFAFA",
                      }}
                      onClick={() => setStatus(2)}
                    >
                      Ավարտված
                    </li>
                  </div>
                </div>
              </div>
            )}
            <label className="inputiError">{prog[13].editError}</label>
          </div>
          <Select
            name="Դոնոր"
            items={donors}
            value={donor}
            placeholder="Դոնոր"
            onChange={setDonor}
          />
          <div className="donor">
            <label className="donor_label">Դոնոր խմբի անդամ է</label>
            <input
              type="checkbox"
              id="donor"
              className="isDonor"
              value={program.isdonor}
              onClick={() => {
                setProgram({ ...program, isdonor: !program.isDonor });
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "space-between" }}>
          <button variant="secondary" className="cancel" onClick={cancel}>
            Չեղարկել
          </button>
          <a
            variant="primary"
            className={`${saveClassName} save`}
            href={`#${scrollId}`}
            onClick={addProject}
          >
            Հաստատել
          </a>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    showAdd: state.prog.showAdd,
    suppForMoreInfo: state.moreInfo.suppForMoreInfo,
    support: state.prog.support,
    scrollId: state.prog.scrollId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    progAddSuccess: (prog) => dispatch(progAddSuccess(prog)),
    changeSupMoreInfo: (prog) => dispatch(changeSupMoreInfo(prog)),
    editProg: (prog) => dispatch(editProg(prog)),
    deleteSupMoreInfo: () => dispatch(deleteSupMoreInfo()),
    findScrollId: (id) => dispatch(findScrollId(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProgram);
