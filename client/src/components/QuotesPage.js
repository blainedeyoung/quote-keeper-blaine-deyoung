//this is the main gallery where people can share their quotes with other users

import React, { Component } from 'react'
import { withUser } from '../context/UserProvider.js'

class QuotePage extends Component {
    componentDidMount(){
        // Get all users' quotes marked public on page load
        this.props.getAllQuotes()
    }

    render(){
        const { quotes } = this.props
        return (
            <div className="quotesDisplay">
                { quotes.map(quote => 
                    <div className="quoteBlock"  key={quote._id}>
                        <h2>{quote.quote}</h2>
                        <h1 className="attribution">-{quote.attributedTo}</h1>
                    </div>
                ) }
            </div>
        )
    }
}

export default withUser(QuotePage)