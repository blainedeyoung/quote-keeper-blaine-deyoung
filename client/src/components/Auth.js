//this is the login screen 
//it uses render props to send information to the AuthForm component
//this is an easy way to make the form dynamic

import React from 'react'
import AuthForm from './AuthForm.js'
import Form from '../shared/Form.js'
import Toggle from '../shared/Toggle.js'
import { withUser } from '../context/UserProvider.js'

const Auth = (props) => {
    const { signup, login, authErr } = props
    return (
        <div className="loginScreen">
            <h1 className="title">Quote Keeper</h1>
            <Toggle render={({on, toggler}) => 
             !on ?
                <>
                    <Form 
                        inputs={{ username: "", password: "" }}
                        submit={inputs => signup(inputs)}
                        render={formProps => <AuthForm {...formProps} btnText="Sign Up"/>}
                    />
                    <p style={{ color: "red" }}>{authErr}</p>
                    <button className="formButtons" onClick={toggler}>Already a member?</button>
                </>
              :  
                <>
                    <Form 
                        inputs={{ username: "", password: "" }}
                        submit={inputs => login(inputs)}
                        render={formProps => <AuthForm {...formProps} btnText="Login"/>}
                    />
                    <p style={{ color: "red" }}>{authErr}</p>
                    <button className="formButtons" onClick={toggler}>Not a member?</button>
                </>
            }/>
        </div>
    )
}

export default withUser(Auth)