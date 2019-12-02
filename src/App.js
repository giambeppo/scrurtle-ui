import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from "./Main";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" component={Main} />
                </Switch>
            </Router>
        )
    }
}

export default App;
