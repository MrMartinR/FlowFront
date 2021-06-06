import { useState } from 'react'
import { Toolbar, Grid, Card, Button, Typography, TextField } from '@material-ui/core'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const item = {
  id: '1',
  name: 'Use Fragments instead of Div',
}

const item2 = {
  id: '2',
  name: 'Do not Use Styles or Themes',
}
const item3 = {
  id: '3',
  name: 'Comment the Code',
}
const item4 = {
  id: '4',
  name: '🐛 Fixing Bugs',
}

function Kanban1() {
  const [text, setText] = useState('')
  const [state, setState]: any = useState([
    {
      title: 'To Do',
      items: [item, item2, item3],
    },
    {
      title: 'Doing',
      items: [item4],
    },
  ])

  const handleDragEnd = ({ destination, source }: any) => {
    if (!destination) {
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    // Creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] }

    setState((prev: any) => {
      prev = { ...prev }
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1)

      // Adding to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      return prev
    })
  }

  const addItem = () => {
    setState((prev: any) => {
      return {
        ...prev,
        todo: {
          title: 'To Do',
          items: [
            {
              id: '5',
              name: text,
            },
            ...prev.todo.items,
          ],
        },
      }
    })

    setText('')
  }

  return (
    <Grid item  xs={6}>
      <Card>
        <Toolbar variant="dense">
          <TextField
            variant="outlined"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                addItem()
                /** I have no idea what is this preventDefault */
                ev.preventDefault()
              }
            }}
          />
        </Toolbar>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Grid item xs={8}>
            {state.map((data: any, key:any) => {
              return (
                <Grid item key={key}>
                  <Card >
                    <Typography variant="h5">{data.title}</Typography>
                    <Droppable droppableId={key}>
                      {(provided, snapshot) => {
                        return (
                          <Grid item>
                            <Card ref={provided.innerRef} {...provided.droppableProps}>
                              {data.items.map((el: any, index: any) => {
                                return (
                                  <Draggable key={el.id} index={index} draggableId={el.id}>
                                    {(provided, snapshot) => {
                                      return (
                                        <Card
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <Typography variant="subtitle1">
                                            {el.name}
                                            <Button onClick={addItem}>Done!</Button>
                                          </Typography>
                                        </Card>
                                      )
                                    }}
                                  </Draggable>
                                )
                              })}
                              {provided.placeholder}
                            </Card>
                          </Grid>
                        )
                      }}
                    </Droppable>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </DragDropContext>
      </Card>
    </Grid>
  )
}

export default Kanban1
