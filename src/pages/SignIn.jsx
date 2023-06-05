import React, { useState } from 'react'
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import { resetCookie } from '../utils/login';

import Typewriter from 'typewriter-effect';
import "../css/SignIn.css"
import * as scripts from "../utils/scripts"

const SignIn = () => {
  const clientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID
  const navigate = useNavigate();
  const [loginFailure, setLoginFailure] = useState(false)

  async function handleCallbackResponse(res) {
    var date = new Date();
    var userObject = jwt_decode(res.credential)

    if (userObject.email.endsWith("bergen.org")) {
      document.cookie = "google-oauth-assembly.session=" + res.credential + "; expires=" + date.setDate(date.getDate() + 1) + ";SameSite=lax"
      setLoginFailure(false)
      navigate('/game')
    } else {
      resetCookie()
      setLoginFailure(true)
      googleLogout();
    }
  }

  return (

    
    <div className='container'>
      <div className="title">
        <Typewriter onInit={(typewriter) => {
          typewriter
            .typeString("TEACHERLE")
            .start()

        }}
        />
      </div>
      <div className='subtitle'>
        <Typewriter onInit={(typewriter) => {
          typewriter
            .typeString("BCA Teacher Wordle")
            .start()
        }}
        />
      </div>

      <div>
        <div className="login-button">
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
              render={(renderProps) => (
                <button type="button" id="google-login"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}>
                  <FcGoogle /> Sign in and play!
                </button>
              )}
              onSuccess={handleCallbackResponse}
              onFailure={() => console.log('could not login')}
              cookiePolicy="single_host_origin" />
          </GoogleOAuthProvider>
        </div>
      </div>


      {loginFailure ?
        <p className='failure-message'><br />*Please login use your bergen.org email*</p>
        : null}


      {/* <button onClick={scripts.getTodaysTeacher}>date?</button> */}

      <div className='bottom-text'>
        <div className='date'>{scripts.getTodaysDate()}</div>
        <div> Day No.{scripts.getDayNumber()}</div>
        <p>Built by Safa Karagoz and Matthew Lerman</p>
      </div>

    </div>


  )
}

export default SignIn