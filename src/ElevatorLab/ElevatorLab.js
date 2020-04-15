import React from 'react'

export default class ElevatorLab extends React.Component {
    constructor(props){
        super(props);
        
       
        this.state = { floorCount : this.props.location.state.floorCount, 
            elevatorCount : this.props.location.state.elevatorCount,
            elevators : []}   
        
        this.eventSource = new EventSource(`http://localhost:8080/elevatorLab?elevatorCount=${this.state.elevatorCount}&floorCount=${this.state.floorCount}`); 
    }

    createLabView = () => {        
        let table = []
        
        const { floorCount, elevators } = this.state;
        for (let i = floorCount - 1 ; i >= 0; i--) {        
            let children = [];
            children.push(<td>{`Floor ${i}`}</td>);

            children.push(this.createFloorButtons(i, floorCount));
            for (let j = 0; j < elevators.length; j++) {
                if(elevators[j]){
                children.push(<td className={elevators[j].currentFloor === i ? "table-primary" : "   "}> {`${elevators[j].currentFloor === i ? "Elevator" : "   "}`}</td>)
                }
            }
            table.push(<tr>{children}</tr>);

        }

        return table;
    } 

    createFloorButtons = (floorNumber, floors) => {
        let cell = [];

        for (let i = 0; i < floors; i++) {            
            cell.push(<input type="button" value={i} floorFrom={floorNumber} onClick={this.callElevator.bind(floorNumber, i)}/>)
        }        

        return cell;
    }


    callElevator = (id, event) => {
        fetch('http://localhost:8080/callElevator', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                floor: event.target.getAttribute('floorfrom'),
                destinationFloor: event.target.value,
            })
          })
        
    }

    updateElevatorStatus = (elevatorStatuses) => {
        let elevators = [];
        
        for(let i = 0; i < elevatorStatuses.length; i++){          
            elevators.push({
                id : elevatorStatuses[i].id,
                currentFloor : elevatorStatuses[i].currentFloor,
                direction : elevatorStatuses[i].direction
            })
        }
        
        this.setState(Object.assign({}, {elevators: elevators}));       
    }

    async componentDidMount() {
        this.eventSource.onopen = (event: any) => console.log('open', event); 
        this.eventSource.onmessage = (event: any) => {
            this.updateElevatorStatus(JSON.parse(event.data));
        };
        this.eventSource.onerror = (event: any) => console.log('error', event);
       
    }

    render() {
        return(
          <table class="table table-bordered">
            {this.createLabView()}
          </table>
        )
      }

}