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
        name: 'Home'
      },
      {
        id: 1,
        name: 'Storage'
      },
      {
        id: 2,
        name: 'Neverland'
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

  render() {
    const { waypoints } = this.state;

    return (
      <div style={style}>
        {waypoints.map((wp, i) => (
          <Card
            key={wp.id}
            index={i}
            name={wp.name}
            moveWaypoint={this.moveWaypoint}
          />
        ))}
      </div>
    )
  }
}

export default Container;
