import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import Card from './Card';

const style = { width: '100%', display: 'flex' };

class Container extends Component {

  state = {
    waypoints: [
      {
        id: 0,
        name: 'Home',
        address: '101 Homestead Way',
        rooms: 5
      },
      {
        id: 1,
        name: 'Storage',
        address: '202 Storage Drive',
        rooms: 1
      },
      {
        id: 2,
        name: 'New Home',
        address: '303 Destination Drive',
        rooms: 4
      }
    ]
  }

  moveWaypoint = (dragIndex, hoverIndex) => {
    console.log('called');
    const { waypoints } = this.state;
    const dragCard = waypoints[dragIndex];
    this.setState(
			update(this.state, {
				waypoints: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
				},
			}),
		)
  }

  addWaypoint = () => {
    const newWaypoint = {
      name: 'new waypoint',
      address: 'new address',
      rooms: 0
    };
    const wp = [...this.state.waypoints];
    wp.splice(1, 0, newWaypoint);
    this.setState({
      waypoints: wp
    })
  }

  render() {
    const { waypoints } = this.state;

    return (
      <div>
        <div style={style}>
          {waypoints.map((wp, i) => (
            <Card
              key={wp.id}
              index={i}
              name={wp.name}
              address={wp.address}
              rooms={wp.rooms}
              moveWaypoint={this.moveWaypoint}
            />
          ))}
        </div>
        <button onClick={this.addWaypoint}>Add Waypoint</button>
      </div>
    )
  }
}

export default Container;
