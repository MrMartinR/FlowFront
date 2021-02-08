import React from 'react'
import { Avatar, CircularProgress, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { InfiniteLoader, List } from 'react-virtualized'
import { useDispatch } from 'react-redux'
import * as userAccountsActions from './state/userAccountsActions'

export default function VirtualizedListComponent(props: any) {
  const {
    setSelectedItemIndex,
    /** Are there more items to load? (This information comes from the most recent API request.) */
    hasNextPage,
    /** Are we currently loading a page of items? (This may be an in-flight flag in your Redux store for example.) */
    isNextPageLoading,
    /** List of items loaded so far */
    list,
    /** List height */
    listHeight,
    /** Callback function responsible for loading the next page of items */
    loadNextPage,
  } = props

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const rowCount = hasNextPage ? list.length + 1 : list.length

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreRows = isNextPageLoading ? () => {} : loadNextPage

  // Every row is loaded except for our loading indicator row.
  const isRowLoaded = ({ index }: any) => !hasNextPage || index < list.length

  // Accounts Redux state
  const dispatch = useDispatch()

  const rowSelected = (index: number) => {
    setSelectedItemIndex(index)
    // dispatch(userAccountsActions.fetchAccountTransaction(list[index].id))
  }

  const rowRenderer = ({ index, key, style }: any) => {
    if (!isRowLoaded({ index })) {
      return (
        <ListItem key={key} className="UserAccountsListItem" style={{ ...style, justifyContent: 'center' }}>
          <CircularProgress className="splash-screen-spinner" />
        </ListItem>
      )
    } else {
      return (
        <ListItem
          onClick={() => rowSelected(index)}
          key={key}
          className="UserAccountsListItem"
          style={index === 0 ? { ...style, cursor: 'pointer', borderStyle: 'groove' } : { ...style, cursor: 'pointer' }}
        >
          <ListItemAvatar>
            <Avatar
              // alt={``}
              // src={`/static/images/avatar/1.jpg`}
              src={''}
            />
          </ListItemAvatar>
          <ListItemText id={key} primary={list[index].name} />
        </ListItem>
      )
    }
  }
  return (
    <InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} rowCount={rowCount}>
      {({ onRowsRendered, registerChild }) => (
        <List
          ref={registerChild}
          onRowsRendered={onRowsRendered}
          rowRenderer={rowRenderer}
          rowCount={rowCount}
          height={listHeight - 70}
          rowHeight={50}
          width={250}
        />
      )}
    </InfiniteLoader>
  )
}
