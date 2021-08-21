//this is the form for creating quotes

import React from 'react'

const QuoteForm = props => {
    const { handleChange, handleSubmit, inputs: { quote, attributedTo, source, comments, permissions }} = props
    return (
        <form onSubmit={handleSubmit}>
            <textarea
                className="formInputs"
                type="text" 
                name="quote" 
                value={quote} 
                onChange={handleChange} 
                placeholder="Quote"/>
            <input 
                className="formInputs"
                type="text" 
                name="attributedTo" 
                value={attributedTo} 
                onChange={handleChange} 
                placeholder="Attributed To"/>
            <input 
                className="formInputs"
                type="text" 
                name="source" 
                value={source} 
                onChange={handleChange} 
                placeholder="Source"/>
            <textarea 
                className="formInputs"
                type="text" 
                name="comments" 
                value={comments} 
                onChange={handleChange} 
                placeholder="Comment"/>
            <input 
                className="formInputs"
                type="text" 
                name="permissions" 
                value={permissions} 
                onChange={handleChange} 
                placeholder="Public or Private"/>
            <button className="formButtons">Add Quote</button>
        </form>
    )
}

export default QuoteForm