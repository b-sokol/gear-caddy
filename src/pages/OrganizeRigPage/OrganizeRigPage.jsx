import React, { Component, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableChainCard from '../../components/DraggableChainCard/DraggableChainCard';

const Container = styled.div`
  // display: flex;
`;

class InnerList extends PureComponent {
  render() {
    const { chain, pedalMap, index } = this.props;
    const pedals = chain.pedals.map((p) =>
      pedalMap.find((pedal) => pedal._id === p)
    );
    return <DraggableChainCard chain={chain} pedals={pedals} index={index} />;
  }
}

class OrganizeRigPage extends Component {
  state = {
    formData: this.props.location.state.rig,
    pedals: this.props.pedals,
    chains: this.props.location.state.rig.chains,
    chainOrder: this.props.location.state.rig.chains.map((chain) => {
      return chain._id;
    }),
  };

  formRef = React.createRef();

  handleSubmit = (e) => {
    e.preventDefault();
    const organizedRig = {
      ...this.state.formData,
      chains: this.state.chains,
    }
    console.log(organizedRig)
    this.props.handleUpdateeRig(organizedRig);
  };

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'chain') {
      const newChainOrder = [...this.state.chainOrder];
      console.log(newChainOrder);
      newChainOrder.splice(source.index, 1);
      newChainOrder.splice(destination.index, 0, draggableId);
      console.log(newChainOrder);

      const newState = {
        ...this.state,
        chainOrder: newChainOrder,
      };
      this.setState(newState);
      return;
    }

    const start = this.state.chains.find((c) => c._id === source.droppableId);
    const finish = this.state.chains.find(
      (c) => c._id === destination.droppableId
    );

    const startIdx = this.state.chains.indexOf(start);
    const finishIdx = this.state.chains.indexOf(finish);

    if (start === finish) {
      const newPedals = [...start.pedals];
      newPedals.splice(source.index, 1);
      newPedals.splice(destination.index, 0, draggableId);

      const newChain = {
        ...start,
        pedals: newPedals,
      };

      const newChains = [...this.state.chains];
      newChains[startIdx] = { ...newChains[startIdx], pedals: newPedals };

      const newState = {
        ...this.state,
        chains: newChains,
      };

      this.setState(newState);
      return;
    }

    const startPedals = [...start.pedals];
    startPedals.splice(source.index, 1);
    const newStart = {
      ...start,
      pedals: startPedals,
    };

    const finishPedals = [...finish.pedals];
    finishPedals.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      pedals: finishPedals,
    };

    const newChains = [...this.state.chains];
    newChains[startIdx] = { ...newChains[startIdx], pedals: startPedals };
    newChains[finishIdx] = { ...newChains[finishIdx], pedals: finishPedals };

    const newState = {
      ...this.state,
      chains: newChains,
    };
    this.setState(newState);
  };

  render() {
    return (
      <>
        <h1>Organize Rig</h1>
        <form
          ref={this.formRef}
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="all-chains" type="chain">
              {(provided) => (
                <Container {...provided.droppableProps} ref={provided.innerRef}>
                  {this.state.chainOrder.map((chainName, index) => {
                    const chain = this.state.chains[index];
                    return (
                      <InnerList
                        key={chain._id}
                        chain={chain}
                        pedalMap={this.state.pedals}
                        index={index}
                      />
                    );
                  })}
                  {provided.placeholder}
                </Container>
              )}
            </Droppable>
          </DragDropContext>
          <button
            type="submit"
            className="btn"
          >
            SAVE Rig
          </button>
          &nbsp;&nbsp;
          <Link to="/rigs">CANCEL</Link>
        </form>
      </>
    );
  }
}

export default OrganizeRigPage;
