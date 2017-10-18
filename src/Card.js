import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';


const style = {
	border: '1px solid gray',
	height: '300px',
  flex: 1,
  flexBasis: '30%',
	padding: '1rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
	textAlign: 'center',
	margin: '10px'
}
/**
 * Implements the drag source contract.
 */
 const cardSource = {
 	beginDrag(props) {
 		return {
 			id: props.id,
 			index: props.index,
 		}
 	},
 }

/**
 * Specifies the props to inject into your component.
 */
function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function targetCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const cardTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

		// Get horizontal middle
		const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the right
		const hoverClientX = clientOffset.x - hoverBoundingRect.left

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
			return
		}

		// Time to actually perform the action
		props.moveWaypoint(dragIndex, hoverIndex)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex
	},
}

class Card extends Component {
  render() {
    const {
			name,
			address,
			rooms,
			isDragging,
			connectDragSource,
			connectDropTarget,
		} = this.props;
    const opacity = isDragging ? 0 : 1

    return connectDragSource(connectDropTarget(
      <div style={{ ...style, opacity }}>
        <h2>{name}</h2>
				<h3>{address}</h3>
				<p>{rooms}</p>
      </div>
    ));
  }
}

// Export the wrapped component:
export default flow(
  DragSource('card', cardSource, sourceCollect),
  DropTarget('card', cardTarget, targetCollect)
)(Card);
