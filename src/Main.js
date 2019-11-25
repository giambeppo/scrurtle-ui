import React, {Component} from 'react';
import './App.css';
import ErrorMessage from './ErrorMessage';
import Path from './Path';
import * as Utils from './utils';
import {parse} from 'query-string'

class Main extends Component {
    constructor(props) {
        super(props);
        const queryParams = parse(props.location.search, {
            parseNumbers: true,
            parseBooleans: true
        });
        const step = queryParams.step || 5;
        const lastMessage = queryParams.end || 'TD';
        const currentUser = props.match.params.user || 'unknown';
        this.state = {
            counter: props.match.params.counter,
            size: step,
            lastMessage: lastMessage,
            currentUser: currentUser,
            lastUpdater: 'unknown',
            lastUpdate: 'unknown'
        };
        // This binding is necessary to make `this` work in the callback
        this.loadInfo = this.loadInfo.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }

    componentDidMount() {
        this.loadInfo();
    }

    async loadInfo() {
        await this.wrapRequest(fetch(Utils.getUrl(this.state.counter, this.state.currentUser)));
    }

    async nextStep() {
        let promise;
        if (this.state.current >= this.state.size - 1) {
            promise = fetch(Utils.resetUrl(this.state.counter, this.state.currentUser));
        } else {
            promise = fetch(Utils.incrementUrl(this.state.counter, this.state.currentUser));
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
                const lastUpdater = json.last_updater || 'unknown';
                const lastUpdate = json.last_update || 'unknown';
                this.setState({
                    current: newValue,
                    lastUpdater: lastUpdater,
                    lastUpdate: lastUpdate,
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
                <Path size={this.state.size} current={this.state.current} lastMessage={this.state.lastMessage}/>
                <ErrorMessage errorMessage={this.state.error} />
                <div className="next-row">
                    <div className="margin" />
                    <button className="next-button" disabled={this.state.loading} onClick={this.nextStep}>
                        Next
                    </button>
                    <div className="margin" />
                </div>
                <div className="audit-row">
                    <div className="margin" />
                    <p>Last update by {this.state.lastUpdater} on {this.state.lastUpdate}</p>
                    <div className="margin" />
                </div>
            </div>
        )
    }
}

export default Main;
