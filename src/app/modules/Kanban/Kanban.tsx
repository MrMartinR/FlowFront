import React, { useState }  from 'react'
import { Toolbar, Grid, Card, CardHeader, CardContent, Button, ButtonGroup } from "@material-ui/core"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

const finalSpaceCharacters = [
  {
    id: '01',
    name: 'Gary Goodspeed',
    // thumb: '/media/svg/icons/status.svg'
    thumb: '/images/gary.png'

  },
  {
    id: '02',
    name: 'Little Cato',
    thumb: '/images/gary.png'
  },
  {
    id: '03',
    name: 'KVN',
    thumb: '/images/gary.png'
  },
  {
    id: '04',
    name: 'Mooncake',
    thumb: '/images/gary.png'
  },
  {
    id: '05',
    name: 'Quinn Ergon',
    thumb: '/images/gary.png'
  }
]


function Kanban (){


  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result:any) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }



  return (
      <Grid item >
        <Card>
          <CardHeader title='Kanban' />
            <Toolbar variant="dense">
              <ButtonGroup>
                <Button>
                  +
                </Button>
              </ButtonGroup>
            </Toolbar>

        </Card>
        <Card>
            <DragDropContext onDragEnd={handleOnDragEnd}>
            <Grid justify="space-between" item xs={3} alignContent="space-around" alignItems='center' spacing={3}>
              <Droppable droppableId="characters">
                {(provided) => (
                  <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                    {characters.map(({id, name, thumb}, index) => {
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided) => (
                            <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <CardContent>
                            <img src={thumb}/>   { name }
                            </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
              </Grid>
            </DragDropContext>
        </Card>
      </Grid>

  )

}

export default Kanban




