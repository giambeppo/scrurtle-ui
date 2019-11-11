import React, {Component} from 'react';
import './App.css';
import ErrorMessage from './ErrorMessage';
import Path from './Path';
import * as Utils from './utils';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 'maya',
            size: 5
        };
        // This binding is necessary to make `this` work in the callback
        this.loadInfo = this.loadInfo.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }

    componentDidMount() {
        this.loadInfo();
    }

    async loadInfo() {
        await this.wrapRequest(fetch(Utils.getUrl(this.state.counter)));
    }

    async nextStep() {
        let promise;
        if (this.state.current >= this.state.size - 1) {
            promise = fetch(Utils.resetUrl(this.state.counter));
        } else {
            promise = fetch(Utils.incrementUrl(this.state.counter));
        }
        await this.wrapRequest(promise)
    }

    async wrapRequest(requestPromise) {
        this.setState({
            loading: true
        });
        try {
            const response = await requestPromise;
            if (response.status === 200) {
                const json = await response.json();
                const newValue = json.value % this.state.size;
                this.setState({
                    current: newValue,
                    loading: false
                });
            } else {
                throw new Error('HTTP ' + response.status + ' ' + response.statusText);
            }
        } catch(ex) {
            this.setState({
                error: 'Error: ' + ex.message,
                loading: false
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
                    <button className="next-button" disabled={this.state.loading} onClick={this.nextStep}>
                        Next
                    </button>
                    <div className="next-margin" />
                </div>
            </div>
        )
    }
}

export default App;
