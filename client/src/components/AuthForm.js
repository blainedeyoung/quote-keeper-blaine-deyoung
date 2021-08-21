//this is the form for the auth component

import React from 'react'

const AuthForm = props => {
    const { handleChange, handleSubmit, inputs: { username, password }, btnText } = props
    return (
        <form onSubmit={handleSubmit}>
            <input 
                className="formInputs"
                type="text" 
                name="username" 
                value={ username }
                onChange={ handleChange } 
                placeholder="Username"/>
            <input 
                className="formInputs"
                type="text" 
                name="password" 
                value={ password }
                onChange={ handleChange } 
                placeholder="Password"/>
            <button className="formButtons">{ btnText }</button>
        </form>
    )
}

export default AuthForm

