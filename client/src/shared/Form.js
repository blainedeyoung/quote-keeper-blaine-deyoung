//common features of forms designed for use with render props

import { Component } from 'react'

export default class Form extends Component {
    constructor(props){
        super(props)
        this.state = {
            inputs: this.props.inputs
        }
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState(prevState => ({
            inputs: {
                ...prevState.inputs,
                [name]: value
            }
        }))
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.submit(this.state.inputs)
        this.setState({ inputs: this.props.inputs })
    }

    render(){
        return this.props.render({
            inputs: this.state.inputs,
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit
        })
    }
}

