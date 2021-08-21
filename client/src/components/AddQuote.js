//this is the form to add a new quote

import React, { useState } from 'react'
import Form from '../shared/Form.js'
import QuoteForm from './QuoteForm.js'
import { withUser } from '../context/UserProvider.js'
import { Redirect } from 'react-router-dom'

const AddQuote = props => {
  const [toggle, setToggle] = useState(false)

  return (

      toggle === false ?

      <div className="contentBody">
         <Form 
            inputs={{ quote: "", attributedTo: "", source: "", comments: "", permissions: "" }}
            submit={inputs => {props.addQuote(inputs)
                                setToggle(true)}}
            render={formProps => <QuoteForm {...formProps}/>}
          />
      </div>

      : 

      <Redirect to="/profile" />
  )  
} 

export default withUser(AddQuote)