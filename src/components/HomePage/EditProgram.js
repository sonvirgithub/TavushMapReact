import React, { useState, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import "././AddProgram/AddProgram.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect, useDispatch } from "react-redux";
import store, {
  succeeded,
  failed,
  editShow,
  progEditSuccess,
  editProg,
  changeSupMoreInfo,
  deleteSupMoreInfo,
  moreInfoProgram,
  cityErrMessage,
  orgErrMessage,
  supErrMessage,
  findScrollId,
  changeIsSelect,
  selectedSupports,
} from "../../redux";
import Communities from "./Communities/Communities";
import Organizations from "./Organizations/Organizations";
import SupportTypes from "./SupportTypes/SupportTypes";
import Status from "./Status/Status";
import Select from "../Form/Select";

function EditProgram({
  isSelect,
  select_endDate,
  selectedSupports,
  progEditSuccess,
  showEdit,
  donorId,
  moreInfoProgram,
  program1,
  deleteSupMoreInfo,
  edit,
  changeIsSelect,
  cityErrMessage,
  orgErrMessage,
  supErrMessage,
  moreInfoProg,
  changeSupMoreInfo,
  scrollId,
  findScrollId,
  naxkinProg,
}) {
  const dispatch = useDispatch();
  const [arry, setArray] = useState([]);
  const [saveClassName, setSaveClassName] = useState("");
  const [indexes, setIndexes] = useState([]);
  const [donor, setDonor] = useState();

  const [donors, setDonors] = useState([]);
  const [selected, setSelected] = useState(true);

  const project_name_arm = useRef();
  const project_name_eng = useRef();
  const manager_arm = useRef();
  const manager_eng = useRef();
  const contact_arm = useRef();
  const contact_eng = useRef();

  useEffect(() => {
    fetch("/api/donors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language: "arm" }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDonors(data.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    setDonor(donors.find((d) => d.id === donorId));

    if (
      program1.programName_arm != "" &&
      program1.programName_eng != "" &&
      program1.budget != "" &&
      program1.manager_arm != "" &&
      program1.manager_eng != "" &&
      program1.contact_arm != "" &&
      program1.startDate !== null &&
      program1.contact_eng != "" &&
      program1.description_arm != "" &&
      program1.description_eng != "" &&
      program1.community?.length != 0 &&
      program1.organization?.length != 0 &&
      isSelect?.length != 0
    ) {
      setSaveClassName("save_class1");
    } else if (
      program1.programName_arm != "" ||
      program1.programName_eng != "" ||
      program1.budget != "" ||
      program1.manager_arm != "" ||
      program1.manager_eng != "" ||
      program1.contact_arm != "" ||
      program1.startDate !== null ||
      program1.contact_eng != "" ||
      program1.description_arm != "" ||
      program1.description_eng != "" ||
      program1.community?.length != 0 ||
      program1.organization?.length != 0 ||
      isSelect?.length != 0
    ) {
      setSaveClassName("save_class2");
    }
  }, [program1]);

  useEffect(() => {
    if (project_name_arm.current != null) {
      project_name_arm.current.style.height =
        project_name_arm.current.scrollHeight + "px";
    }
    if (project_name_eng.current != null) {
      project_name_eng.current.style.height =
        project_name_eng.current.scrollHeight + "px";
    }
    if (manager_arm.current != null) {
      manager_arm.current.style.height =
        manager_arm.current.scrollHeight + "px";
    }
    if (manager_eng.current != null) {
      manager_eng.current.style.height =
        manager_eng.current.scrollHeight + "px";
    }
    if (contact_arm.current != null) {
      contact_arm.current.style.height =
        contact_arm.current.scrollHeight + "px";
    }
    if (contact_eng.current != null) {
      contact_eng.current.style.height =
        contact_eng.current.scrollHeight + "px";
    }
  });

  const [program, setProgram] = useState([
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

  const handleClose = () => {
    if (!edit) {
      changeIsSelect([]);
      selectedSupports(naxkinProg);
    }
    dispatch(editShow());

    arry.map((item, index) => {
      program[index] = {
        editError: "",
        classname: "",
      };

      setProgram([...program]);
    });
    supErrMessage({
      editError: "",
      classname: "",
    });
    orgErrMessage({
      editError: "",
      classname: "",
    });
    cityErrMessage({
      editError: "",
      classname: "",
    });
  };

  const selectEndDate = () => {
    setSelected(true);
  };

  const auto_grow = (element) => {
    element.target.style.height = "50px";
    element.target.style.height = element.target.scrollHeight + "px";
  };
  const executeScroll = () => {
    if (
      indexes.includes(10) &&
      Math.min(...indexes) != 0 &&
      Math.min(...indexes) != 1
    ) {
      findScrollId(10);
    } else if (indexes.includes(11)) {
      const array = [0, 1, 2, 3, 4, 5, 6, 7];
      if (array.some((item) => item == Math.min(...indexes))) {
        findScrollId(Math.min(...indexes));
      } else {
        findScrollId(11);
      }
    } else if (indexes.includes(12)) {
      const array = [0, 1, 2, 3, 4, 5, 6, 7];
      if (array.some((item) => item == Math.min(...indexes))) {
        findScrollId(Math.min(...indexes));
      } else {
        findScrollId(12);
      }
    } else {
      findScrollId(Math.min(...indexes));
    }
  };

  const validate = () => {
    arry[0] = program1.programName_arm;
    arry[1] = program1.programName_eng;
    arry[2] = program1.budget;
    arry[3] = program1.startDate;
    arry[4] = program1.manager_arm;
    arry[5] = program1.manager_eng;
    arry[6] = program1.contact_arm;
    arry[7] = program1.contact_eng;
    arry[8] = program1.description_arm;
    arry[9] = program1.description_eng;
    arry[10] = program1.community;
    arry[11] = program1.organization;
    arry[12] = isSelect;

    setArray([...arry]);
    if (
      program1.programName_arm == "" ||
      program1.programName_eng == "" ||
      program1.budget == "" ||
      program1.manager_arm == "" ||
      program1.manager_eng == "" ||
      program1.contact_arm == "" ||
      program1.startDate == null ||
      program1.contact_eng == "" ||
      program1.description_arm == "" ||
      program1.description_eng == "" ||
      program1.community.length == 0 ||
      program1.organization.length == 0 ||
      isSelect.length == 0
    ) {
      arry.map((item, index) => {
        if (item === "" || item?.length == 0 || item == null) {
          if (indexes.some((item) => item == index)) {
          } else {
            indexes.push(index);
          }
          program[index] = {
            editError: "Խնդրում ենք լրացնել դաշտը",
            classname: "class_name_input",
          };

          switch (index) {
            case 10:
              cityErrMessage({
                editError: "Խնդրում ենք լրացնել դաշտը",
                classname: "class_name_input",
              });
              if (indexes.some((item) => item == index)) {
              } else {
                indexes.push(index);
              }
              break;
            case 11:
              orgErrMessage({
                editError: "Խնդրում ենք լրացնել դաշտը",
                classname: "class_name_input",
              });
              if (indexes.some((item) => item == index)) {
              } else {
                indexes.push(index);
              }
              break;
            case 12:
              supErrMessage({
                editError: "Խնդրում ենք լրացնել դաշտը",
                classname: "class_name_input",
              });
              if (indexes.some((item) => item == index)) {
              } else {
                indexes.push(index);
              }
              break;

            default:
              break;
          }
          setProgram([...program]);
        } else {
          if (indexes.some((item) => item === index)) {
            let index1 = indexes.findIndex((item) => item === index);
            indexes.splice(index1, 1);
          }

          program[index] = {
            editError: "",
            classname: "",
          };
        }
      });
      setProgram([...program]);

      return false;
    }
    return true;
  };

  const handleSubmit = (evt) => {
    let endDate = "";
    let startDate = "";
    const submitProgram = store.getState().prog.program;
    if (submitProgram.endDate !== null) {
      const year1 = submitProgram.endDate.getFullYear();
      const month1 = submitProgram.endDate.getMonth() + 1;
      const day1 = submitProgram.endDate.getDate();
      endDate = `${year1}-${month1}-${day1}`;
    } else {
      endDate = null;
    }

    if (submitProgram.startDate !== null) {
      const year = submitProgram.startDate.getFullYear();
      const month = submitProgram.startDate.getMonth() + 1;
      const day = submitProgram.startDate.getDate();
      startDate = `${year}-${month}-${day}`;
    }
    submitProgram.donorId = donor?.id;

    const isValid = validate();
    if (isValid) {
      axios
        .put(`/api/editProgram`, {
          program: submitProgram,
          isSelect,
          startDate,
          endDate,
        })
        .then((res) => {
          if (res.data.success) {
            // setSuccessPage(true);
            dispatch(succeeded(true));
            progEditSuccess(submitProgram);

            if (moreInfoProg.id == submitProgram.id) {
              deleteSupMoreInfo();
              changeSupMoreInfo(submitProgram);
              moreInfoProgram(submitProgram);
            }

            arry.map((item, index) => {
              program[index] = {
                editError: "",
                classname: "",
              };

              setProgram([...program]);
            });
            supErrMessage({
              editError: "",
              classname: "",
            });
            orgErrMessage({
              editError: "",
              classname: "",
            });
            cityErrMessage({
              editError: "",
              classname: "",
            });
            handleClose();
          } else {
            handleClose();
            dispatch(failed(true));
          }
        })
        .catch((e) => {
          handleClose();
        });
    } else {
      executeScroll();
    }
  };

  return (
    <>
      <Modal show={showEdit} onHide={handleClose} animation={false}>
        {store.getState().prog.program &&
        Object.keys(store.getState().prog.program).length ? (
          <Modal.Body>
            <div className="project_name">
              <label className="project_name_label" id="0">
                Ծրագրի անուն (Հայերեն)
                <img
                  className="star"
                  src={require("./AdminIcons/red-star.svg").default}
                />
              </label>
              <textarea
                type="text"
                className={`${program[0].classname} project_name_input`}
                onInput={(e) => auto_grow(e)}
                onLoadedData={auto_grow}
                ref={project_name_arm}
                value={store.getState().prog.program.programName_arm}
                onChange={(e) =>
                  dispatch(
                    editProg({
                      ...store.getState().prog.program,
                      programName_arm: e.target.value,
                    })
                  )
                }
                placeholder="Ծրագրի անուն հայերեն"
              />
              <label className="inputiError">{program[0].editError}</label>
            </div>
            <div className="project_name">
              <label className="project_name_label" id="1">
                Ծրագրի անուն (English){" "}
                <img
                  className="star"
                  src={require("./AdminIcons/red-star.svg").default}
                />
              </label>
              <textarea
                type="text"
                className={`${program[1].classname} project_name_input`}
                onInput={(e) => auto_grow(e)}
                onLoadedData={auto_grow}
                ref={project_name_eng}
                placeholder="Project name in English"
                value={store.getState().prog.program.programName_eng}
                onChange={(e) =>
                  dispatch(
                    editProg({
                      ...store.getState().prog.program,
                      programName_eng: e.target.value,
                    })
                  )
                }
              />
              <label className="inputiError">{program[1].editError}</label>
            </div>

            <Communities />

            {/* budget-i inputnery */}
            <div className="project_name">
              <label className="budge_name" id="2">
                Բյուջե
                <img
                  className="star"
                  src={require("./AdminIcons/red-star.svg").default}
                />
              </label>
              <input
                className={`${program[2].classname} budge_input`}
                placeholder="10 000"
                value={store.getState().prog.program.budget}
                onChange={(e) =>
                  dispatch(
                    editProg({
                      ...store.getState().prog.program,
                      budget: e.target.value,
                    })
                  )
                }
              />
              <div className="usd_input">USD</div>
              <label className="inputiError">{program[2].editError}</label>
            </div>

            {/* date-eri inputnery */}
            <div className="display_flex">
              <div className="start">
                <label className="start_date_label" id="3">
                  Սկիզբ
                  <img
                    className="star_start_date"
                    src={require("./AdminIcons/red-star.svg").default}
                  />
                </label>

                <DatePicker
                  selected={store.getState().prog.program.startDate}
                  startDate={store.getState().prog.program.startDate}
                  onChange={(date) =>
                    dispatch(
                      editProg({
                        ...store.getState().prog.program,
                        startDate: date,
                      })
                    )
                  }
                  className={`${program[3].classname} dateStart`}
                  closeOnScroll={true}
                />
                <label className="start_date_err inputiError">
                  {program[3].editError}
                </label>
              </div>
              <div className="end">
                <label className="end_date_label">Ավարտ</label>
                <DatePicker
                  selected={store.getState().prog.program.endDate}
                  startDate={store.getState().prog.program.endDate}
                  onChange={(date) => {
                    dispatch(
                      editProg({
                        ...store.getState().prog.program,
                        endDate: date,
                      })
                    );
                    selectEndDate();
                  }}
                  className="dateEnd"
                  closeOnScroll={true}
                />
              </div>
            </div>

            {/* xekavari input-nery */}
            <div className="project_name">
              <label className="project_name_label" id="4">
                Ծրագրի ղեկավար (Հայերեն)
                <img
                  className="star"
                  src={require("./AdminIcons/red-star.svg").default}
                />
              </label>
              <textarea
                type="text"
                className={`${program[4].classname} project_name_input`}
                placeholder="Անուն, Ազգանուն"
                onInput={(e) => auto_grow(e)}
                onLoadedData={auto_grow}
                ref={manager_arm}
                value={store.getState().prog.program.manager_arm}
                onChange={(e) =>
                  dispatch(
                    editProg({
                      ...store.getState().prog.program,
                      manager_arm: e.target.value,
                    })
                  )
                }
              />
              <label className="inputiError">{program[4].editError}</label>
            </div>
            <div className="project_name">
              <label className="project_name_label" id="5">
                Ծրագրի ղեկավար (English)
                <img
                  className="star"
                  src={require("./AdminIcons/red-star.svg").default}
                />
              </label>
              <textarea
                type="text"
                onInput={(e) => auto_grow(e)}
                onLoadedData={auto_grow}
                className={`${program[5].classname} project_name_input`}
                placeholder="Fistname, Lastname"
                ref={manager_eng}
                value={store.getState().prog.program.manager_eng}
                onChange={(e) =>
                  dispatch(
                    editProg({
                      ...store.getState().prog.program,
                      manager_eng: e.target.value,
                    })
                  )
                }
              />
              <label className="inputiError">{program[5].editError}</label>
            </div>

            {/* contactPerson-i input-nery  */}
            <div className="project_name">
              <label className="project_name_label" id="6">
                Կոնտակտ անձ (Հայերեն)
                <img
                  className="star"
                  src={require("./AdminIcons/red-star.svg").default}
                />
              </label>
              <textarea
                type="text"
                onInput={(e) => auto_grow(e)}
                onLoadedData={auto_grow}
                ref={contact_arm}
                className={`${program[6].classname} project_name_input`}
                placeholder="Անուն, Ազգանուն"
                value={store.getState().prog.program.contact_arm}
                onChange={(e) =>
                  dispatch(
                    editProg({
                      ...store.getState().prog.program,
                      contact_arm: e.target.value,
                    })
                  )
                }
              />
              <label className="inputiError">{program[6].editError}</label>
            </div>
            <div className="project_name">
              <label className="project_name_label" id="7">
                Կոնտակտ անձ (Անգլերեն)
                <img
                  className="star"
                  src={require("./AdminIcons/red-star.svg").default}
                />
              </label>
              <textarea
                type="text"
                onInput={(e) => auto_grow(e)}
                onLoadedData={auto_grow}
                ref={contact_eng}
                className={`${program[7].classname} project_name_input`}
                placeholder="Fistname, Lastname"
                value={store.getState().prog.program.contact_eng}
                onChange={(e) =>
                  dispatch(
                    editProg({
                      ...store.getState().prog.program,
                      contact_eng: e.target.value,
                    })
                  )
                }
              />
              <label className="inputiError">{program[7].editError}</label>
            </div>

            <Organizations />

            <SupportTypes />

            {/* discriptionneri input-nery */}
            <div className="project_name">
              <label className="project_name_label" id="8">
                Նկարագրություն (Հայերեն)
                <img
                  className="star"
                  src={require("./AdminIcons/red-star.svg").default}
                />
              </label>
              <textarea
                className={`${program[8].classname} description_input`}
                placeholder="Հակիրճ նկարագրություն"
                value={store.getState().prog.program.description_arm}
                onChange={(e) =>
                  dispatch(
                    editProg({
                      ...store.getState().prog.program,
                      description_arm: e.target.value,
                    })
                  )
                }
              />
              <label className="inputiError">{program[8].editError}</label>
            </div>
            <div className="project_name">
              <label className="project_name_label" id="9">
                Նկարագրություն (English)
                <img
                  className="star"
                  src={require("./AdminIcons/red-star.svg").default}
                />
              </label>
              <textarea
                className={`${program[9].classname} description_input`}
                placeholder="Brief description"
                value={store.getState().prog.program.description_eng}
                onChange={(e) =>
                  dispatch(
                    editProg({
                      ...store.getState().prog.program,
                      description_eng: e.target.value,
                    })
                  )
                }
              />
              <label className="inputiError">{program[9].editError}</label>
            </div>

            {/* status-i inputnery */}
            <Status />

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
                value={store.getState().prog.program.isDonor}
                defaultChecked={store.getState().prog.program.isDonor}
                onClick={() =>
                  dispatch(
                    editProg({
                      ...store.getState().prog.program,
                      isDonor: !store.getState().prog.program.isDonor,
                    })
                  )
                }
              />
            </div>
          </Modal.Body>
        ) : (
          <></>
        )}
        <Modal.Footer style={{ justifyContent: "space-between" }}>
          <button
            className="cancel"
            onClick={() => {
              handleClose();
            }}
          >
            Չեղարկել
          </button>
          <a
            className={`${saveClassName} save`}
            href={`#${scrollId}`}
            onClick={() => {
              handleSubmit();
            }}
          >
            Հաստատել
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    program1: state.prog.program,
    donorId: state.prog.program.donorId,
    showEdit: state.prog.showEdit,
    isSelect: state.prog.isSelect,
    suppForMoreInfo: state.moreInfo.suppForMoreInfo,
    moreInfoProg: state.moreInfo.moreInfoProg,
    support: state.prog.support,
    scrollId: state.prog.scrollId,
    naxkinProg: state.prog.naxkinProg,
    edit: state.prog.edit,
    select_endDate: state.prog.select_endDate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    progEditSuccess: (prog, isSelect) =>
      dispatch(progEditSuccess(prog, isSelect)),
    moreInfoProgram: (prog) => dispatch(moreInfoProgram(prog)),
    cityErrMessage: (cityErr) => dispatch(cityErrMessage(cityErr)),
    orgErrMessage: (orgErr) => dispatch(orgErrMessage(orgErr)),
    supErrMessage: (supErr) => dispatch(supErrMessage(supErr)),
    changeSupMoreInfo: (prog) => dispatch(changeSupMoreInfo(prog)),
    deleteSupMoreInfo: () => dispatch(deleteSupMoreInfo()),
    findScrollId: (id) => dispatch(findScrollId(id)),
    changeIsSelect: (arr) => dispatch(changeIsSelect(arr)),
    selectedSupports: (sup) => dispatch(selectedSupports(sup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProgram);
