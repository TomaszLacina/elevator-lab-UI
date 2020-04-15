import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';

import ElevatorLabCreator from './ElevatorLabCreator/ElevatorLabCreator';
import ElevatorLab from './ElevatorLab/ElevatorLab';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class App extends React.Component {
   

    render() {
        return (
            <Router>
                <div className="container">
                    <Route exact path="/" component={ElevatorLabCreator} />
                    <Route path="/elevatorLab" component={ElevatorLab} />
                </div>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
  );