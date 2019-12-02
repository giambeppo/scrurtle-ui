import React, {Component} from 'react';
import './App.css';
import ErrorMessage from './ErrorMessage';
import Path from './Path';
import * as Utils from './utils';
import {parse} from 'query-string'
import ModalDialog from "./ModalDialog";
import SingleValueInput from "./SingleValueInput";
import YesNoInput from "./YesNoInput";

class Main extends Component {
    constructor(props) {
        super(props);
        const queryParams = parse(props.location.search, {
            parseNumbers: true,
            parseBooleans: true
        });
        const step = queryParams.step || 5;
        const lastMessage = queryParams.end || 'GO';
        this.state = {
            counter: queryParams.counter,
            size: step,
            lastMessage: lastMessage,
            currentUser: queryParams.user,
            lastUpdater: 'unknown',
            lastUpdate: 'unknown'
        };
        // This binding is necessary to make `this` work in the callback
        this.loadInfo = this.loadInfo.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.onUserSelected = this.onUserSelected.bind(this);
        this.hideUserSelected = this.hideUserSelected.bind(this);
        this.onCounterSelected = this.onCounterSelected.bind(this);
        this.hideCreateDialog = this.hideCreateDialog.bind(this);
        this.createCounter = this.createCounter.bind(this);
    }

    componentDidMount() {
        this.loadInfo();
    }

    async onCounterSelected(newCounter) {
        await this.setState({
            counter: newCounter
        });
        this.loadInfo();
    }

    async loadInfo() {
        if (this.state.counter) {
            await this.wrapRequest(fetch(Utils.getUrl(this.state.counter, this.state.currentUser)));
        }
    }

    async nextStep() {
        if (this.state.currentUser) {
            let promise;
            if (this.state.current >= this.state.size - 1) {
                promise = fetch(Utils.resetUrl(this.state.counter, this.state.currentUser));
            } else {
                promise = fetch(Utils.incrementUrl(this.state.counter, this.state.currentUser));
            }
            await this.wrapRequest(promise)
        } else {
            this.setState({
                showUserDialog: true
            });
        }
    }

    async wrapRequest(requestPromise) {
        this.setState({
            loading: true
        });
        try {
            const response = await requestPromise;
            if (response.status >= 200 && response.status < 300) {
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
            } else if (response.status === 404) {
                this.setState({
                    showCreateDialog: true
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

    async onUserSelected(newUser) {
        if (newUser) {
            await this.setState({
                currentUser: newUser,
                showUserDialog: false
            });
            this.nextStep();
        }
    }

    hideUserSelected() {
        this.setState({
            showUserDialog: false
        });
    }

    async createCounter() {
        const putRequest = fetch(Utils.getUrl(this.state.counter, this.state.currentUser), {
            method: 'PUT'
        });
        await this.wrapRequest(putRequest);
        this.setState({
            showCreateDialog: false
        });
    }

    hideCreateDialog() {
        this.setState({
            showCreateDialog: false,
            counter: undefined
        });
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
                <ModalDialog show={!this.state.counter} title="Select a counter">
                    <SingleValueInput onValueSubmitted={this.onCounterSelected}/>
                </ModalDialog>
                <ModalDialog show={this.state.showUserDialog} title="You must insert your name to move the Scrurtle!" onClose={this.hideUserSelected}>
                    <SingleValueInput onValueSubmitted={this.onUserSelected}/>
                </ModalDialog>
                <ModalDialog show={this.state.showCreateDialog} title="The selected counter does not exists, do you want to create it?">
                    <YesNoInput onYes={this.createCounter} onNo={this.hideCreateDialog}/>
                </ModalDialog>
            </div>
        )
    }
}

export default Main;
