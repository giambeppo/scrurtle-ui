import React, {Component} from 'react';
import './App.css';
import ErrorMessage from "./ErrorMessage";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "Add some components here."
        };
        // This binding is necessary to make `this` work in the callback
        this.loadInfo = this.loadInfo.bind(this);
    }

    componentDidMount() {
        this.loadInfo();
    }

    async loadInfo() {
        const resourceUrl = 'tbd';
        try {
            const response = await fetch(resourceUrl);
            if (response.status === 200) {
                const json = await response.json();
                this.setState({
                    loaded: true
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
            <div className="App">
                <header className="App-header"/>
                <div id="main-container">
                    {this.state.message}
                    <ErrorMessage errorMessage={this.state.error} tryAgain={true} />
                </div>
            </div>
        )
    }
}

export default App;
