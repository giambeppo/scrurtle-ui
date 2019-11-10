import React, {Component} from 'react';
import './App.css';
import ErrorMessage from "./ErrorMessage";
import Path from "./Path";
import * as Utils from './utils';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: "maya",
            size: 5,
            current: 0
        };
        // This binding is necessary to make `this` work in the callback
        this.loadInfo = this.loadInfo.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }

    componentDidMount() {
        this.loadInfo();
    }

    async loadInfo() {
        try {
            const response = await fetch(Utils.getUrl(this.state.counter));
            if (response.status === 200) {
                const json = await response.json();
                this.setState({
                    current: json.value
                });
            } else {
                throw new Error('HTTP ' + response.status + ' ' + response.statusText);
            }
        } catch(ex) {
            this.setState({
                error: "Error"
            });
        }
    }

    async nextStep() {
        try {
            let response;
            if (this.state.current >= this.state.size - 1) {
                response = await fetch(Utils.resetUrl(this.state.counter));
            } else {
                response = await fetch(Utils.incrementUrl(this.state.counter));
            }
            if (response.status === 200) {
                const json = await response.json();
                this.setState({
                    current: json.value
                });
            } else {
                throw new Error('HTTP ' + response.status + ' ' + response.statusText);
            }
        } catch(ex) {
            this.setState({
                error: "Error"
            });
        }
    }

    render() {
        return (
            <div id="main-container">
                <Path size={this.state.size} current={this.state.current}/>
                <ErrorMessage errorMessage={this.state.error} />
                <div className="next-row">
                    <div className="next-margin" />
                    <button className="next-button" onClick={this.nextStep}>Next</button>
                    <div className="next-margin" />
                </div>
            </div>
        )
    }
}

export default App;
