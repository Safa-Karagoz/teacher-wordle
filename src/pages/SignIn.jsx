import React, {useState} from 'react'
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import { resetCookie } from '../utils/login';

const clientId =  process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID

const SignIn = () => {
    const navigate = useNavigate();
    const [loginFailure, setLoginFailure] = useState(false)
  
    async function handleCallbackResponse(res) {
        var date = new Date();
        var userObject = jwt_decode(res.credential)
    
        if (userObject.email.endsWith("bergen.org")){
          document.cookie = "google-oauth-assembly.session=" + res.credential + "; expires=" + date.setDate(date.getDate() + 1) + ";SameSite=lax"
          setLoginFailure(false)
          navigate('/ex')
        } else {
          resetCookie()
          setLoginFailure(true)
          googleLogout();
        }
      }

  return (
    <div> 
        <div className="login-button">
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    render={(renderProps) => (
                    <button type="button" id="google-login" 
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}>
                        <FcGoogle/> Sign in with google
                    </button>
                    )}
                    onSuccess={handleCallbackResponse}
                    onFailure={() => console.log('could not login')}
                    cookiePolicy="single_host_origin" />
            </GoogleOAuthProvider>
        </div>
    </div>
    
  )
}

export default SignIn