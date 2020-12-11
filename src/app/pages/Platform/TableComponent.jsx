import React from 'react'
import { AutoSizer } from 'react-virtualized'

const TableComponent = ({list}) => {
  return (
    <div>
      <AutoSizer disableHeight>
        {({width}) => (
          <Table
            ref="Table"
            disableHeader={false}
            // headerClassName={styles.headerColumn}
            headerHeight={30}
            height={270}
            // noRowsRenderer={this._noRowsRenderer}
            // overscanRowCount={overscanRowCount}
            // rowClassName={this._rowClassName}
            // rowHeight={useDynamicRowHeight ? this._getRowHeight : rowHeight}
            // rowGetter={rowGetter}
            rowCount={rowCount}
            scrollToIndex={scrollToIndex}
            sort={this._sort}
            sortBy={sortBy}
            sortDirection={sortDirection}
            width={width}>
            {!hideIndexRow && (
              <Column
                label="Index"
                cellDataGetter={({rowData}) => rowData.index}
                dataKey="index"
                disableSort={!this._isSortEnabled()}
                width={60}
              />
            )}
            <Column
              dataKey="name"
              disableSort={!this._isSortEnabled()}
              headerRenderer={this._headerRenderer}
              width={90}
            />
            <Column
              width={210}
              disableSort
              label="The description label is really long so that it will be truncated"
              dataKey="random"
              className={styles.exampleColumn}
              cellRenderer={({cellData}) => cellData}
              flexGrow={1}
            />
          </Table>
        )}
      </AutoSizer>
    </div>
  )
}

export default TableComponent
