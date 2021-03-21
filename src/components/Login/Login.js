import React, { useState, useEffect } from 'react'
import './Login.css'
import { Route, useHistory } from 'react-router-dom';
import { toast } from "react-toastify";



function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [incorrect, setIncorrect] = useState(false)
    const [changeColorEmailLabel, setChangeColorEmailLabel] = useState('black_email_address_label')
    const [changeColorEmailInput, setChangeColorEmailInput] = useState('black_email_address_input')
    const [eyeVisible, setEyeVisible] = useState('password')
    const [isDisabled, setDisable] = useState(true);

    const history = useHistory() 
     
    async function log_in() {

        if (email == "" && password == "") {
            setDisable(true);
          }

        let body = { email, password }
        setEmail('')
        setPassword('')
        body = JSON.stringify(body)
        const headers = {}
        headers["Content-Type"] = "application/json"
        const res = await fetch('/api/login', {
            method: 'POST',
            body,
            headers
        });

        
        if (res.status == 200) {
            // console.log(res.json());
            //let data = await res.json()

           // console.log(data);

           history.push('/admin/program')
            window.location.reload()

        } else {

            setIncorrect(false)
            setChangeColorEmailLabel("red_email_address_label")
            setChangeColorEmailInput("red_email_address_input")
            setIncorrect(true)
            setEyeVisible("password")

        }
        //window.location.reload()

    }

    function passwordVisible() {
        if (eyeVisible == "password") {
            setEyeVisible("text")
        }
        if (eyeVisible == "text") {
            setEyeVisible("password")
        }

    }

  

    return (


        <div className="App">
            <div className="log">
            <div>
                <label className='title_login' >Մուտք</label>
            </div>
            <div className='email'>
                <div>
                    <label className={changeColorEmailLabel} ><strong>Էլ․ հասցե</strong></label>
                </div>
                <div >
                    <input type="text"  className={changeColorEmailInput} placeholder="էլ․ հասցե" value={email} onChange={e => setEmail(e.target.value)} onFocus={(e) => e.target.placeholder = ""}
                        onBlur={(e) => e.target.placeholder = "էլ․ հասցե"} />
                </div>
            </div>

            <div className=' password'>
                <div>
                    <label className={changeColorEmailLabel} ><strong>Գաղտնաբառ</strong></label>
                </div>
                <div className="input-icons" >
                    <input type={eyeVisible}   className={changeColorEmailInput} placeholder="գաղտնաբառ " value={password} onChange={e => setPassword(e.target.value)} onFocus={(e) => e.target.placeholder = ""}
                        onBlur={(e) => e.target.placeholder = "գաղտնաբառ"} />
                    {(eyeVisible == "password") ?
                        <i className="fa fa-eye-slash" onClick={passwordVisible}></i>
                        : <i className="fa fa-eye" onClick={passwordVisible}></i>
                    }
                </div>

            </div>
            {(incorrect) ? <div className='incorrect'>
                <svg className='infoIcon' xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0ZM7.00667 4C7.00667 3.73478 7.11203 3.48043 7.29956 3.29289C7.4871 3.10536 7.74145 3 8.00667 3C8.27189 3 8.52624 3.10536 8.71378 3.29289C8.90131 3.48043 9.00667 3.73478 9.00667 4V8.59333C9.00667 8.72465 8.9808 8.85469 8.93055 8.97602C8.88029 9.09734 8.80663 9.20758 8.71378 9.30044C8.62092 9.3933 8.51068 9.46696 8.38935 9.51721C8.26803 9.56747 8.13799 9.59333 8.00667 9.59333C7.87535 9.59333 7.74531 9.56747 7.62399 9.51721C7.50266 9.46696 7.39242 9.3933 7.29956 9.30044C7.2067 9.20758 7.13304 9.09734 7.08279 8.97602C7.03253 8.85469 7.00667 8.72465 7.00667 8.59333V4ZM8 13C7.77321 13 7.55152 12.9327 7.36295 12.8067C7.17438 12.6808 7.02741 12.5017 6.94062 12.2921C6.85383 12.0826 6.83112 11.8521 6.87537 11.6296C6.91961 11.4072 7.02882 11.2029 7.18919 11.0425C7.34955 10.8822 7.55387 10.7729 7.7763 10.7287C7.99873 10.6845 8.22929 10.7072 8.43881 10.794C8.64834 10.8807 8.82742 11.0277 8.95342 11.2163C9.07942 11.4048 9.14667 11.6265 9.14667 11.8533C9.14667 12.1574 9.02586 12.4491 8.81082 12.6641C8.59578 12.8792 8.30412 13 8 13Z" fill="#F10808" />
                </svg>

                <label className="invalid_email_password">Մուտքագրված տվյալները սխալ են</label>
            </div> : ""}

            <div>
                <button className='log_in ' onClick={log_in}><strong>ՄՈՒՏՔ ԳՈՐԾԵԼ</strong></button>
            </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
      isLoggedIn: state.isLoggedIn,
    };
  };

export default Login
