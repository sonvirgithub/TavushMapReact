import React, { useState, useContext, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import '../AddProgram/AddProgram.css'
import UseOutSideClick from "../../HomePage/UseOutSideClick"
import "react-datepicker/dist/react-datepicker.css";
import { connect, useDispatch } from "react-redux";
import { progEditSuccess, editProg } from "../../../redux";

function Organizations({ progEditSuccess, program }) {

    const [arrow_icon_org, setArrow_iconOrg] = useState(true)
    const [organizations, setOrganizations] = useState([])
    const [language, setLanguage] = useState("arm")
    const dispatch = useDispatch()
    const ref = useRef();

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

            })
    }, [])

    const selectOrganization = (organization) => {

        let index = program.organization.findIndex(item => item.organizationId == organization.id);
        let arr = program.organization;

        if (index < 0) {
            arr.push(
                {
                    organizationId: organization.id,
                    organizationName_arm: organization.name
                }
            )
        } else {
            arr.splice(index, 1)
        }
        dispatch(editProg({ ...program, organization: arr }))

    }

    UseOutSideClick(ref, () => {

        if (arrow_icon_org) setArrow_iconOrg(false);

    });

    return (
        <div>
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
                                <div className='list city' key={organization.id}>

                                    <li className='li1' style={{
                                        backgroundColor: program.organization.some(item => item.organizationId === organization.id) ?
                                            '#A4C2D8' : '#FAFAFA'
                                    }} onClick={() => selectOrganization(organization)} >{organization.name}</li>

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

        program: state.prog.program,


    };
};

const mapDispatchToProps = dispatch => {
    return {
        progEditSuccess: (prog) => dispatch(progEditSuccess(prog)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Organizations)
