//common toggle feature designed for use with render props

import { Component } from 'react'

export default class Toggle extends Component {
    constructor(){
        super()
        this.state = { on: false }
    }

    toggler = () => this.setState(prevState => ({ on: !prevState.on }))
    
    render(){
        return this.props.render({ on: this.state.on, toggler: this.toggler })
    }
}

