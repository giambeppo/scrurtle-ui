import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from "./Main";
import Login from "./Login";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/:counter/:user" component={Main} />
                    <Route path="/:counter" component={Login} />
                </Switch>
            </Router>
        )
    }
}

export default App;
