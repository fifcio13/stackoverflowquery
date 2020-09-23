import React, { Component } from 'react'
import { Redirect } from "react-router-dom"

export class Error extends Component {
    render() {
        return <Redirect to="/" />;
    }
}

export default Error
