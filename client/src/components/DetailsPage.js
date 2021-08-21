//this is where the user can see and edit all the details about his quote
//I could re-use the Form component but this form is substantially different than the others and this just seemed easier

import React, { Component } from 'react'
import { withUser } from '../context/UserProvider.js'
import { Redirect } from 'react-router-dom'

class DetailsPage extends Component {
    constructor() {
        super()
        this.state = {
            quote: "",
            attributedTo: "",
            source: "",
            comments: "",
            permissions: "",
            _id: "",
            redirect: false
        }
    }

    //read the route params to find the selected quote and set its details to state
    componentDidMount() {
        const thisQuote = this.props.getOneQuote(this.props.match.params.id)
        this.setState({
            quote: thisQuote.quote,
            attributedTo: thisQuote.attributedTo,
            source: thisQuote.source,
            comments: thisQuote.comments,
            permissions: thisQuote.permissions,
            _id: thisQuote._id
        })
    }
    
    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const thisQuote = {
                            quote: this.state.quote,
                            attributedTo: this.state.attributedTo,
                            source: this.state.source,
                            comments: this.state.comments,
                            permissions: this.state.permissions
        }
        this.props.editQuote(this.state._id, thisQuote)
        this.setState({ redirect: true })
    } 

    render() {                  
    
        return (
        //redirect will the user back to the profile screen on submit
        typeof this.props.match.params.id !== undefined && this.state.redirect === false ?
        
            <div className="contentBody">
                <form onSubmit={this.handleSubmit}>
                    <textarea 
                        className="formInputs"
                        type="text" 
                        name="quote" 
                        value={this.state.quote} 
                        onChange={this.handleChange} 
                        placeholder="Quote"/>
                    <input 
                        className="formInputs"
                        type="text" 
                        name="attributedTo" 
                        value={this.state.attributedTo} 
                        onChange={this.handleChange} 
                        placeholder="Attributed To"/>
                    <input 
                        className="formInputs"
                        type="text" 
                        name="source" 
                        value={this.state.source} 
                        onChange={this.handleChange} 
                        placeholder="Source"/>
                    <textarea
                        className="formInputs"
                        type="text" 
                        name="comments" 
                        value={this.state.comments} 
                        onChange={this.handleChange} 
                        placeholder="Comment"/>
                    <input 
                        className="formInputs"
                        type="text" 
                        name="permissions" 
                        value={this.state.permissions} 
                        onChange={this.handleChange} 
                        placeholder="Public or Private"/>
                    <button className="formButtons">Update Quote</button>      
                </form>
            </div>
        

        :

        <Redirect to="/profile" />

        )
    }
}

export default withUser(DetailsPage)