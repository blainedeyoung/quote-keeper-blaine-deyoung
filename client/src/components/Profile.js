//this is where users can view their private quotes and edit or delete quotes they've created

import React, { Component } from 'react'
import { withUser } from '../context/UserProvider.js'
import { Redirect } from 'react-router-dom'


class Profile extends Component {
    constructor() {
        super()
        this.state = {
            //redirect is the controller to send the user to the details page 
            redirect: false,
            //id for the selected quote
            id: ""
        }
    }

    //get quotes for the logged in user on page load
    componentDidMount() {
        this.props.getUserQuotes()
    }

    //go to the details screen where you can see and edit
    //all the information about a quote
    goToDetails = id => {
        this.setState({ id: id, 
                        redirect: true            
        })
    }

    render() {
        const { quotes, username, deleteQuote } = this.props
    
        //redirect to details page uses route params to send the id for the selected quote
        if(this.state.redirect) {
            return <Redirect to={`/detailsPage/${this.state.id}`} />
        }

    return (
        <div>
            <h1 className="userGreeting">Hello @{username}!</h1>
            <div className="contentBody">
              <div className="quotesDisplay">
                { quotes.map(quote => 
                    <div className="quoteBlock" key={quote._id}>
                        <h2>{quote.quote}</h2>
                        <h1 className="attribution">-{quote.attributedTo}</h1>
                        <button className="otherButton" onClick={() => deleteQuote(quote._id)}>Delete</button>
                        <button className="otherButton" onClick={() => this.goToDetails(quote._id)}>Details</button>
                    </div>
                ) }
              </div>
            </div>
        </div>
    )
    }
}

export default withUser(Profile)