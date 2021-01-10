////////////////////////////////////////////////////////////////////
// 
// Documentation | https://github.com/rcdexta/react-trello
// Documentation | https://github.com/rcdexta/react-trello-example
// I had a problem with the dependency styled-components, I had to add it manually
// after the instalation "yarn add styled-components"
// This module has about 70 nodes/dependencies
// Converting the file to TSX shows a error about types, this library doesn't have @types, 
// so we need to create a folder "types" and inside a file d.ts etc...
// 
//////////////////////////////////////////////////////////////////

import React, { Component } from 'react'
import Board from 'react-trello'
import { Toolbar, Grid, Card, CardHeader, Button } from "@material-ui/core"

const data = require('./data.json')


const handleDragStart = (cardId, laneId) => {
  console.log('drag started')
  console.log(`cardId: ${cardId}`)
  console.log(`laneId: ${laneId}`)
}

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
  console.log('drag ended')
  console.log(`cardId: ${cardId}`)
  console.log(`sourceLaneId: ${sourceLaneId}`)
  console.log(`targetLaneId: ${targetLaneId}`)
}

class Kanban extends Component {
  state = { boardData: { lanes: [] } }

  setEventBus = (eventBus) => {
    this.setState({ eventBus })
  }

  async componentWillMount() {
    const response = await this.getBoard()
    this.setState({ boardData: response })
  }

  getBoard() {
    return new Promise((resolve) => {
      resolve(data)
    })
  }

  completeCard = () => {
    this.state.eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'COMPLETED',
      card: {
        id: 'Milk',
        title: 'Buy Milk',
        label: '15 mins',
        description: 'Use Headspace app',
      },
    })
    this.state.eventBus.publish({
      type: 'REMOVE_CARD',
      laneId: 'PLANNED',
      cardId: 'Milk',
    })
  }

  addCard = () => {
    this.state.eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'BLOCKED',
      card: {
        id: 'Ec2Error',
        title: 'EC2 Instance Down',
        label: '30 mins',
        description: 'Main EC2 instance down',
      },
    })
  }

  shouldReceiveNewData = (nextData) => {
    console.log('New card has been added')
    console.log(nextData)
  }

  handleCardAdd = (card, laneId) => {
    console.log(`New card added to lane ${laneId}`)
    console.dir(card)
  }

  render() {
    return (
      <Grid item >
        <Card>
          <CardHeader title='Kanban' />
             <Toolbar variant="dense">
                <Button onClick={this.completeCard}>
                Complete Buy Milk
                </Button>
                <Button onClick={this.addCard}>
                Add Blocked
                </Button>
             </Toolbar>
            <Board
              editable
              onCardAdd={this.handleCardAdd}
              data={this.state.boardData}
              draggable
              onDataChange={this.shouldReceiveNewData}
              eventBusHandle={this.setEventBus}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
            />
        </Card>
     </Grid>
    )
  }
}

export default Kanban




