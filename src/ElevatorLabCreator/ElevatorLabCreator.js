import React from 'react'
import {withRouter} from 'react-router-dom';

export default class ElevatorLabCreator extends React.Component {
    constructor(props){
        super(props);
        this.state = { floorCount : 0, elevatorCount : 0}

        this.handleFloorChange = this.handleFloorChange.bind(this);
        this.handleElevatorChange = this.handleElevatorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFloorChange(event){
        this.setState({floorCount: event.target.value});
    }

    handleElevatorChange(event){
        this.setState({elevatorCount: event.target.value});
    }

    handleSubmit(event) {
        alert('Creating lab with floors: ' + this.state.floorCount + ", and elevators :" + this.state.elevatorCount);
      
        
        this.props.history.push({
            pathname:'/elevatorLab',
            state: { floorCount: this.state.floorCount,
                elevatorCount: this.state.elevatorCount}

        });
        event.preventDefault();
    }

    render() {
        return(
          <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Floor count</label>
                    <input type="number" className="form-control" id="floorCount" onChange={this.handleFloorChange} value={this.state.floorCount} aria-describedby="floorHelp" placeholder="Enter floor count" />
                    <small id="floorHelp" className="form-text text-muted">Ten should be enough, but feel free to try this out</small>
                </div>
                <div className="form-group">
                    <label>Elevator count</label>
                    <input type="number" className="form-control" id="elevatorCount" onChange={this.handleElevatorChange} value={this.state.elevatorCount} placeholder="Elevator Count" />
                </div>
               
                <button type="submit" className="btn btn-primary">Create new lab !</button>
            </form>
        )
      }

}