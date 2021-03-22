import React, { useState, useEffect, useRef,useContext } from 'react'
import './AddProgram.css'
import { Modal, Form, } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import UseOutSideClick from "../UseOutSideClick"
import { ProgramContext } from "../../../pages/ProgramsPage";


function AddProgram({ setSuccessPage, setFailPage }) {

  const programCont = useContext(ProgramContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [communities, setCommunities] = useState([])
  const [organizations, setOrganizations] = useState([])
  const [categores, setCategores] = useState([])

  const [name_arm, setName_arm] = useState("")
  const [name_eng, setName_eng] = useState("")
  const [communityid, setCommunity] = useState([])
  const [budget, setBudge] = useState()
  const [start_date, setStartDate] = useState(new Date())
  const [end_date, setEndDate] = useState(new Date())
  const [manager_arm, setManager_arm] = useState("")
  const [manager_eng, setManager_eng] = useState("")
  const [contactPerson_arm, setContactPerson_arm] = useState("")
  const [contactPerson_eng, setContactPerson_eng] = useState("")
  const [organizationid, setOrganization] = useState([])
  const [description_arm, setDescription_arm] = useState("")
  const [description_eng, setDescription_eng] = useState("")
  const [statusid, setStatus] = useState("")
  const [isSelect, setIsSelect] = useState([])
  const [isdonor, setIsDonor] = useState(false)
  const [language, setLanguage] = useState("arm")


  const [arrow_icon_city, setArrow_iconCity] = useState(false)
  const [arrow_icon_org, setArrow_iconOrg] = useState(false)
  const [arrow_icon_status, setArrow_iconStatus] = useState(false)
  const [arrow_icon_category, setArrow_iconCategory] = useState(false)
  const [categoryid_supportid, setArrayCategores] = useState([])
  const [checkedCategory, setCheckedCategory] = useState([])
  const [openCategory, setOpenCategory] = useState([])


  const ref = useRef();

  UseOutSideClick(ref, () => {
    if (arrow_icon_city) setArrow_iconCity(false);
    if (arrow_icon_org) setArrow_iconOrg(false);
    if (arrow_icon_status) setArrow_iconStatus(false);
    if (arrow_icon_category) setArrow_iconCategory(false);
  });


  useEffect(() => {

    fetch('/api/organizations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ language })
    })

      .then(res => res.json())
      .then(data => {
        setOrganizations(data.data)

      }).catch(err => {
        // console.log(err);
      })

    fetch('/api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ language })
    })

      .then(res => res.json())
      .then(data => {
        console.log(data.data);
        setCommunities(data.data)

      }).catch(err => {
        // console.log(err);
      })

    fetch('/api/supportsList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ language })
    })

      .then(res => res.json())
      .then(data => {
        console.log("support",data.data);
        setCategores(data.data)

      }).catch(err => {
        // console.log(err);
      })

  }, [])


  async function addProject() {



    let body = {
      name_arm, name_eng, communityid, budget, start_date, end_date, manager_arm, manager_eng, contactPerson_arm, contactPerson_eng, organizationid,
      categoryid_supportid, description_arm, description_eng, statusid, isdonor, language
    }

    // console.log(name_arm, name_eng, communityid, budget, start_date, end_date, manager_arm, manager_eng, contactPerson_arm, contactPerson_eng, organizationid,
    //   categoryid_supportid, description_arm, description_eng, statusid, isdonor);

    body = JSON.stringify(body)
    const headers = {}
    headers["Content-Type"] = "application/json"
    const res = await fetch('/api/addProgram', {
      method: 'POST',
      body,
      headers
    });

    if (res.status == 200) {
      setSuccessPage(true);
      handleClose()
      const prog = {
        
        ProgramName_arm: name_arm,
        ProgramName_eng: name_eng,
        budget: budget,
        startDdate: start_date,
        endDate: end_date,
        manager_arm: manager_arm,
        manager_eng: manager_eng,
        contact_arm: contactPerson_arm,
        contact_eng : contactPerson_eng,
        description_arm: description_arm,
        description_eng: description_eng,
        isDonor: isdonor,
      };
      // programCont.AddProgram(prog);

    } else {
      setFailPage(true);
      // handleClose()
      // console.log("աաաա",res);
    }

    setName_arm("")
    setName_eng("")
    setCommunity("")
    setBudge("")
    setStartDate("")
    setEndDate("")
    setManager_arm("")
    setManager_eng("")
    setOrganization("")
    setContactPerson_arm("")
    setContactPerson_eng("")
    setDescription_arm("")
    setDescription_eng("")
    setStatus("")
    setIsDonor("")
  }




  const selectSupport = (e, supportId, categoryId) => {

    if (isSelect.some(item => item.supportid === supportId)) {


      let index = isSelect.findIndex(item => item.supportid === supportId);
      isSelect.splice(index, 1)

      for (let i = 0; i < categoryid_supportid.length; i++) {
        if (categoryid_supportid[i].supportid === supportId &&
          categoryid_supportid[i].categoryid === categoryId) {
          categoryid_supportid.splice(i, 1)
        }
      }
    }
    else {
      isSelect.push({ supportid: supportId })
      categoryid_supportid.push({
        categoryid: categoryId,
        supportid: supportId
      })

    }
    setIsSelect([...isSelect])

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

  const selectCommunity = (cityid) => {
    if (communityid.some(item => item === cityid)) {
      let index = communityid.findIndex(item => item === cityid);
      communityid.splice(index, 1)
      setCommunity([...communityid])
    } else {
      communityid.push(cityid)
      setCommunity([...communityid])

    }
  }

  const selectOrganization = (orgid) => {
    // console.log(id);
    if (organizationid.some(item => item === orgid)) {
      let index = organizationid.findIndex(item => item === orgid);
      organizationid.splice(index, 1)
      setOrganization([...organizationid])
    } else {
      organizationid.push(orgid)
      setOrganization([...organizationid])

    }
    // console.log(organizationid);
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
      for (let i = 0; i < category.items.length; i++) {
        if (isSelect.some(item => item.Id === category.categoryid && item.supportid === category.items[i].supportid)) {

        }
        else {
          isSelect.push({
            Id: category.categoryid,
            supportid: category.items[i].supportid
          })
          categoryid_supportid.push({
            categoryid: category.categoryid,
            supportid: category.items[i].supportid
          })
        }
      }
    } else {
      for (let i = 0; i < category.items.length; i++) {
        if (isSelect.some(item => item.Id === category.categoryid && item.supportid === category.items[i].supportid)) {

          let index = isSelect.findIndex(item => item.Id === category.categoryid && item.supportid === category.items[i].supportid);
          isSelect.splice(index, 1)
          categoryid_supportid.splice(index, 1)

        }
        else {

        }
      }
    }

  }

  // console.log("categoryid_supportid", categoryid_supportid);
  return (
    <div>
      <div >
        <img src={require("../AdminIcons/add.svg").default} />
        <button variant="primary" className="button_add" onClick={handleShow}>
          Ավելացնել
</button>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>

        <Modal.Body>
          <div className="project_name">
            <label className="project_name_label">Ծրագրի անուն (Հայերեն)</label>
            <input className="project_name_input" placeholder="Ծրագրի անուն հայերեն" value={name_arm} onChange={e => setName_arm(e.target.value)} />

          </div>
          <div className="project_name">
            <label className="project_name_label">Ծրագրի անուն (English)</label>
            <input className="project_name_input" placeholder="Project name in English" value={name_eng} onChange={e => setName_eng(e.target.value)} />
          </div>

          <div className='project_name'>
            <label className="cities">Համայնք</label>
            <button className='btnSities' onClick={() => setArrow_iconCity(!arrow_icon_city)}>
              <label className="label_city" >Համայնք </label>

            </button>
            <img className="arrow_icon" src={require("../AdminIcons/arrow.svg").default} onClick={() => setArrow_iconCity(!arrow_icon_city)} />

            {
              arrow_icon_city && (

                <div ref={ref} className="NestedSelect">

                  {communities.map((city,index) => (
                    <div className='list city radio' key={index}>
                      <li style={{
                        backgroundColor: communityid.some(item => item === city.id) ?
                          '#A4C2D8' : '#FAFAFA'
                      }} className='li1' onClick={() => selectCommunity(city.id)} >{city.name}</li>
                    </div>
                  ))}
                </div>
              )
            }
          </div>

          {/* budget-i inputnery */}
          <div className="project_name">
            <label className="budge_name">Բյուջե</label>
            <input  className="budge_input" placeholder="10 000"  onChange={e => setBudge(e.target.value)} />
            <div className="usd_input">
              USD
            </div>
          </div>

          {/* date-eri inputnery */}
          <div className="display_flex">

            <div className="start">
              <label className="start_date_label">Սկիզբ</label>

              <DatePicker selected={start_date} onChange={date => setStartDate(date)} className="dateStart" closeOnScroll={true} />
            </div>
            <div className="end">
              <label className="end_date_label">Ավարտ</label>
              <DatePicker selected={end_date} onChange={date => setEndDate(date)} className="dateEnd" closeOnScroll={true} />
            </div>

          </div>

          {/* xekavari input-nery */}
          <div className="project_name">
            <label className="project_name_label">Ծրագրի ղեկավար (Հայերեն)</label>
            <input className="project_name_input" placeholder="Անուն, Ազգանուն" value={manager_arm} onChange={e => setManager_arm(e.target.value)} />

          </div>
          <div className="project_name">
            <label className="project_name_label">Ծրագրի ղեկավար (English)</label>
            <input className="project_name_input" placeholder="Fistname, Lastname" value={manager_eng} onChange={e => setManager_eng(e.target.value)} />
          </div>

          {/* contactPerson-i input-nery */}
          <div className="project_name">
            <label className="project_name_label">Կոնտակտ անձ (Հայերեն)</label>
            <input className="project_name_input" placeholder="Անուն, Ազգանուն" value={contactPerson_arm} onChange={e => setContactPerson_arm(e.target.value)} />

          </div>
          <div className="project_name">
            <label className="project_name_label">Կոնտակտ անձ (Անգլերեն)</label>
            <input className="project_name_input" placeholder="Fistname, Lastname" value={contactPerson_eng} onChange={e => setContactPerson_eng(e.target.value)} />
          </div>

          {/* organizationi input-nery */}
          <div className='project_name'>
            <label className="kazmakerp_arm">Կազմակերպություններ</label>
            <button className='btnSities' onClick={() => setArrow_iconOrg(!arrow_icon_org)}>
              <label className="label_city" >Կազմակերպություն </label>
            </button>
            <img className="arrow_icon" src={require("../AdminIcons/arrow.svg").default} onClick={() => setArrow_iconOrg(!arrow_icon_org)} />

            {
              arrow_icon_org && (
                <div ref={ref} className="NestedSelect">
                  {organizations.map((organization) => (
                    <div className='list city radio' key={organization.id}>

                      <li className='li1' style={{
                        backgroundColor: organizationid.some(item => item === organization.id) ?
                          '#A4C2D8' : '#FAFAFA'
                      }} onClick={() => selectOrganization(organization.id)} >{organization.name}</li>

                    </div>
                  ))}
                </div>
              )
            }
          </div>


          {/* support_type input-nery */}

          <div className="project_name">
            <label className="support_type">Աջակցության տեսակ(ներ)</label>

            <button className='btnSities' id='btnSelect' onClick={() => { setArrow_iconCategory(!arrow_icon_category) }}>
              <label className="label_city">Support Type</label>
            </button>
            <img className="arrow_icon" src={require("../AdminIcons/arrow.svg").default} onClick={() => { setArrow_iconCategory(!arrow_icon_category) }} />
            {
              arrow_icon_category && (
                <div ref={ref} className="nested">
                  {categores.map((categore,index) => (

                    <div className='list' key={index} >

                      <ul className='ul' >

                        <div className='supportList'>
                          <input type="checkbox" id='check' className="checkbox" onClick={(e) => checkCategory(e, categore)}
                          />
                        </div>

                        <label className="category_name">{categore.category} ({categore.items.length})</label>

                        <img className='arrowSelect' src={require("../AdminIcons/arrow.svg").default} onClick={(e) => openCategores(categore.categoryid)} />
                        {
                          openCategory.some(item => item === categore.categoryid) ? (
                            <div className="support_types" >


                              {categore.items.map(support => (
                                <li style={{
                                  backgroundColor: isSelect.some(item => item.supportid === support.supportid) ? '#A4C2D8' : '#FAFAFA',

                                }} key={support.supportid} className="li" onClick={(e) => selectSupport(e, support.supportid, categore.categoryid)}>
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


          {/* discriptionneri input-nery */}
          <div className="project_name">
            <label className="project_name_label">Նկարագրություն (Հայերեն)</label>
            <textarea className="description_input" placeholder="Հակիրճ նկարագրություն" value={description_arm} onChange={e => setDescription_arm(e.target.value)} />

          </div>
          <div className="project_name">
            <label className="project_name_label">Նկարագրություն (English)</label>
            <textarea className="description_input" placeholder="Brief description" value={description_eng} onChange={e => setDescription_eng(e.target.value)} />
          </div>

          {/* status-i inputnery */}
          <div className="project_name">
            <label className="status">Կարգավիճակ</label>
            <button className='btnSities' id='btnSelect' onClick={() => { setArrow_iconStatus(!arrow_icon_status) }}>
              <label className="label_city">Կարգավիճակ</label>
            </button>
            <img className="arrow_icon" src={require("../AdminIcons/arrow.svg").default} onClick={() => { setArrow_iconStatus(!setArrow_iconStatus) }} />
            {
              arrow_icon_status && (
                <div ref={ref} className="select_status">

                  <div className='list city'>
                    <div className="radio">
                      <li style={{
                        backgroundColor: statusid === 1 ?
                          '#A4C2D8' : '#FAFAFA'
                      }} className='li1' onClick={() => setStatus(1)}>Ընթացիկ</li>

                    </div>
                    <div className="radio">
                      <li className='li1' style={{
                        backgroundColor: statusid === 2 ?
                          '#A4C2D8' : '#FAFAFA'
                      }} onClick={() => setStatus(2)}>Ավարտված</li>

                    </div>
                  </div>

                </div>
              )
            }
          </div>
          <div className="donor">
            <label className="donor_label">Դոնոր խմբի անդամ է</label>
            <input type="checkbox" id='donor' className="isDonor" value={isdonor} onClick={() => { setIsDonor(!isdonor) }} />
          </div>

          <div className="btn_popup">
            <button className="cancel" onClick={() => { handleClose() }}>Չեղարկել</button>
            <button className="save" onClick={addProject}>Հաստատել</button>
          </div>

        </Modal.Body>
      </Modal>

    </div>

  );
}

export default AddProgram;