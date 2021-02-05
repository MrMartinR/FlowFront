import React from 'react'
import { Card, Button, Toolbar, Grid } from '@material-ui/core'
import VirtualizedListComponent from './UserAccountListComponent'
import { AutoSizer } from 'react-virtualized'

export const UserAccountsList = (props: any) => {
  const {
    newAccountFunc,
    setSelectedItemIndex,
    // perPage,
    isLoading,
    list,
    currentPage,
    totalPages,
  } = props

  return (
    <Grid>
      <Toolbar>
        <Button
          onClick={(e) => {
            newAccountFunc()
          }}
        >
          + New Account
        </Button>
      </Toolbar>
      <Card
      // style={
      //   window.innerWidth < 600 ? { minWidth: '200px', maxWidth: '200px' } : { minWidth: '250px', maxWidth: '250px' }
      // }
      >
        <AutoSizer>
          {({ height, width }) => {
            return (
              <VirtualizedListComponent
                setSelectedItemIndex={setSelectedItemIndex}
                hasNextPage={currentPage < totalPages}
                isNextPageLoading={isLoading}
                list={list}
                listHeight={height}
                loadNextPage={() => {
                  // loadMore();
                }}
              />
            )
          }}
        </AutoSizer>
      </Card>
    </Grid>
  )
}
