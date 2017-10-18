import React, { Component } from 'react';
import Container from './Container';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component {
  render() {
    return (
      <Container />
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
