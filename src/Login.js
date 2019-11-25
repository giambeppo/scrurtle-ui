import React, {Component} from 'react';
import './App.css';
import {Redirect} from "react-router-dom";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            originalPath: props.location.pathname
        };
        // This binding is necessary to make `this` work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        //TODO make this more robust
        const destinationUrl = this.state.originalPath + '/' + this.state.username;
        this.setState({
            destinationUrl: destinationUrl
        });
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            username: event.target.value
        });
    }

    render() {
        if (this.state.destinationUrl) {
            return <Redirect to={this.state.destinationUrl} />
        }
        //TODO improve aesthetics
        return (
            <div>
                <h1>Who are you?</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleChange} />
                    <input type="submit" value="Go!" />
                </form>
            </div>
        )
    }
}

export default Login;
