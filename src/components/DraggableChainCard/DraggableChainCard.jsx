import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import DraggablePedalCard from '../DraggablePedalCard/DraggablePedalCard';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray:
  border-radius: 2px;
  
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const PedalList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? 'skyblue' : 'inherit'};
  height: 75px;
  display: flex;
`;

class InnerList extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.pedals === this.props.pedals) {
      return false;
    }
    return true;
  }
  render() {
    return this.props.pedals.map((pedal, index) => (
      <DraggablePedalCard key={pedal._id} pedal={pedal} index={index} />
    ));
  }
}

class DraggableChainCard extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.chain._id} index={this.props.index}>
        {(provided) => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <Title {...provided.dragHandleProps}>{this.props.chain.name}</Title>
            <Droppable
              droppableId={this.props.chain._id}
              direction="horizontal"
              type="pedal"
            >
              {(provided, snapshot) => (
                <PedalList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <InnerList pedals={this.props.pedals} />
                  {provided.placeholder}
                </PedalList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default DraggableChainCard;
