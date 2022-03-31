import React, { ChangeEvent, useState } from 'react';
import MaUTable from '@mui/material/Table';
import {
  Divider,
  Paper,
  styled,
  Tab,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tabs,
} from '@mui/material';
import {
  useExpanded,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import { Guid } from '../component.utils';

import EditableTableCell from '../dynamic-table-cell/EditableTableCell';
import IndistinctCheckboxTableCell from '../dynamic-table-cell/IndistinctCheckboxTableCell';
import TablePaginationActions from './TablePaginationActions';
import TableToolbar from './TableToolbar';
import DynamicTabHeaderGroup from '../dynamic-tab-header-group/DynamicTabHeaderGroup';
import { ConfirmationOptions } from '../dialog/ConfirmationDialog';
import { useConfirmation } from '../../contexts/ConfirmationDialogContext';
import { IDynamicTable } from './DynamicTable';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import type { Theme } from '@mui/material';

/**
 * Interfaces
 */
export interface IDynamicAdvancedTable extends IDynamicTable {
  /**
   * Data for table state
   */
  setData: Function;

  /**
   * Ignore pages reset after updates
   */
  skipPageReset: boolean;

  /**
   * Data for page Reset
   */
  setSkipPageReset?: Function;

  /**
   * Sets the default page size.
   */
  defaultPageSize?: number;
  toolbarTitle?: string;
  toolbar?: React.ReactFragment;
  componentId?: string;
  onDataDeleted?: Function;
  getRowId?: Function;
  stateReducer?: Function;
}

/**
 * Styling Components
 */
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

/**
 * Other
 */
// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableTableCell,
};

const SELECTION_ROW_ID: string = 'selection';

const defaultPropGetter = () => ({});

const keyHooks = (hooks) => {
  hooks.getRowProps.push((props) => {
    console.log('get hooks');
    return {
      key: `${props.index}_${Math.random()}`,
    };
  });
};

const uuidGenerator = () => ({});

export const DynamicAdvancedTable: React.FC<IDynamicAdvancedTable> = ({
  columns,
  data,
  dense,
  setData,
  setSkipPageReset,
  onDataChange,
  onDataDeleted,
  skipPageReset,
  renderRowSubComponent,
  defaultPageSize,
  toolbarTitle,
  toolbar,
  componentId,
  getRowId,
  stateReducer,
  tabHeaderGroup,
  hideFilter,
  styleClass,
}) => {
  const handleDataChange = (
    rowIndex: React.ReactText,
    columnId: any,
    value: any
  ) => {
    // We also turn on the flag to not reset the page
    console.log(
      `rowIndex:${rowIndex} - ColumnId: ${columnId} - value: ${value}`
    );

    if (setSkipPageReset) {
      setSkipPageReset(true);
    }

    setData((old: any[]) =>
      old.map((row: any, index: any) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  // const onDataChangeHandler = onDataChange ? onDataChange : handleDataChange;

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    visibleColumns,
    page,
    gotoPage,
    setPageSize,
    setGlobalFilter,
    preGlobalFilteredRows,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter },
  } = useTable(
    {
      columns,
      data,
      getRowId,
      //defaultColumn,
      autoResetPage: !skipPageReset,
      // onDataChange isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      onDataChange,
      stateReducer,
    },
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,

    (hooks) => {
      hooks.allColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: SELECTION_ROW_ID,
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox.  Pagination is a problem since this will select all
          // rows even though not all rows are on the current page.  The solution should
          // be server side pagination.  For one, the clients should not download all
          // rows in most cases.  The client should only download data for the current page.
          // In that case, getToggleAllRowsSelectedProps works fine.
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndistinctCheckboxTableCell
                {...getToggleAllRowsSelectedProps()}
              />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndistinctCheckboxTableCell
                {...row.getToggleRowSelectedProps()}
              />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  var useTabHeader =
    tabHeaderGroup &&
    tabHeaderGroup.enabled &&
    tabHeaderGroup.tabHeaders &&
    tabHeaderGroup.tabHeaders.length > 0;

  const [currentTab, setCurrentTab] = useState<string>('active');

  const classes = styleClass ? styleClass() : useStyles();

  const handleChangePage = (
    event: any,
    newPage: number | ((pageIndex: number) => number)
  ) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: any } }) => {
    setPageSize(Number(event.target.value));
  };

  const removeByIndexs = (array: any[], indexs: string | any[]) =>
    array.filter((_: any, i: any) => !indexs.includes(i));

  const confirm = useConfirmation();

  const handleOnConfirm = (event: any) => {};
  const openDialog = (data: any, options: ConfirmationOptions) => {
    //alert("her");
    confirm({
      variant: options.variant,
      catchOnCancel: true,
      title: options.title,
      description: options.description,
    })
      .then(() => handleOnConfirm(false))
      .catch(() => handleOnConfirm(true));
    //alert(`Deleting data indeces: ${JSON.stringify("great", null, '\t')}`)
  };

  const onDeleteItemsHandler = (event: any) => {
    openDialog('', {
      description: 'Are you sure you want to delete thes records?',
      title: 'Delete Data Confirmation',
      variant: 'danger',
    });
    // const indexes: Array<number> = Object.keys(selectedRowIds).map(x => parseInt(x, 10));
    // const newState = removeByIndexs(
    //   data,
    //   indexes
    // )
    // onDataDeleted({indexes: indexes, selectedRowIds: selectedRowIds, data: newState });
  };

  const addUserHandler = (user: any) => {
    const newData = data.concat([user]);
    setData(newData);
  };

  const onRowClick = (state, rowInfo) => {
    if (!rowInfo || !rowInfo.row) {
      return;
    }

    let row = rowInfo.row;

    return {
      onClick: (e) => {
        // console.log({...e})
        // console.log(e.target.tagName)
        if (e.target && e.target.tagName && e.target.tagName === 'TD') {
          row.toggleRowSelected(row.isSelected ? false : true);
        }
      },
    };
  };

  const isRowSelected = (index: string) => {
    return Object.keys(selectedRowIds).indexOf(index) !== -1;
    //return Object.keys(selectedRowIds).indexOf(index.slice(4, index.length)) !== -1; //
  };

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);

    if (tabHeaderGroup!.onChangeHandler) {
      tabHeaderGroup!.onChangeHandler(event, value);
    }
  };

  const controlId = componentId ? componentId : Guid.create().toString();

  // Render Advanced Dynamic Table
  return (
    <div>
      <Paper key={controlId}>
        {useTabHeader ? (
          <DynamicTabHeaderGroup
            tabHeaders={tabHeaderGroup!.tabHeaders}
            value={tabHeaderGroup!.value}
            indicatorColor={tabHeaderGroup!.indicatorColor}
            onChangeHandler={tabHeaderGroup!.onChangeHandler}
            scrollButtons={tabHeaderGroup!.scrollButtons}
            textColor={tabHeaderGroup!.textColor}
            variant={tabHeaderGroup!.variant}
          />
        ) : null}
        {hideFilter ? null : (
          <TableToolbar
            title={toolbarTitle}
            numSelected={Object.keys(selectedRowIds).length}
            deleteUserHandler={onDeleteItemsHandler}
            addUserHandler={addUserHandler}
            preGlobalFilteredRows={preGlobalFilteredRows}
            setGlobalFilter={setGlobalFilter}
            globalFilter={globalFilter}
          />
        )}
        <TableContainer>
          <MaUTable size={dense ? 'small' : 'medium'} {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow
                  {...headerGroup.getHeaderGroupProps()}
                  style={dense ? { height: 33 } : { height: 53 }}
                >
                  {headerGroup.headers.map((column) => (
                    <React.Fragment key={`${column.id}-hcell`}>
                      {column.id === SELECTION_ROW_ID ? (
                        <TableCell
                          padding="checkbox"
                          {...column.getHeaderProps()}
                        >
                          {column.render('Header')}
                        </TableCell>
                      ) : (
                        <TableCell
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render('Header')}
                          <TableSortLabel
                            active={column.isSorted}
                            // react-table has a unsorted state which is not treated here
                            direction={column.isSortedDesc ? 'desc' : 'asc'}
                          />
                        </TableCell>
                      )}
                    </React.Fragment>
                    // <TableCell
                    //   {...(column.id === 'selection'
                    //     ? column.getHeaderProps()
                    //     : column.getHeaderProps(column.getSortByToggleProps()))}
                    // >
                    //   {column.render('Header')}
                    //   {column.id !== 'selection' ? (
                    //     <TableSortLabel
                    //       active={column.isSorted}
                    //       // react-table has a unsorted state which is not treated here
                    //       direction={column.isSortedDesc ? 'desc' : 'asc'}
                    //     />
                    //   ) : null}
                    // </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {page.map((row, i) => {
                prepareRow(row);

                const isItemSelected = isRowSelected(row.id);
                //console.log(row)
                return (
                  // Use a React.Fragment here so the table markup is still valid
                  <React.Fragment key={row.getRowProps().key}>
                    <TableRow
                      {...row.getRowProps(onRowClick)}
                      hover
                      tabIndex={-1}
                      selected={isItemSelected}
                      // style={(dense ? {} : {height:  80} )}
                    >
                      {row.cells.map((cell) => {
                        // console.log( cell )
                        return (
                          <TableCell
                            key={`adv-table-cell-${row.id}-${cell.column.id}`}
                            padding={
                              cell.column.id === SELECTION_ROW_ID
                                ? 'checkbox'
                                : 'normal'
                            }
                          >
                            {cell.render('Cell')}
                          </TableCell>
                          // <TableCell role {...cell.getCellProps()}>
                          //   {cell.render('Cell')}
                          // </TableCell>
                        );
                      })}
                    </TableRow>
                    {/*
                  If the row is in an expanded state, render a row with a
                  column that fills the entire length of the table.
                */}
                    {row.isExpanded ? (
                      <TableRow>
                        <TableCell
                          colSpan={visibleColumns.length}
                          padding="none"
                        >
                          {/*
                        Inside it, call our renderRowSubComponent function. In reality,
                        you could pass whatever you want as props to
                        a component like this, including the entire
                        table instance. But for this example, we'll just
                        pass the row
                      */}
                          {renderRowSubComponent!({ row })}
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </MaUTable>
        </TableContainer>
        {/* <TableFooter>
          <TableRow> */}
        {/* rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage} */}
        <TablePagination
          rowsPerPageOptions={[
            5, 10, 25,
            //{ label: 'All', value: (data) ? data.length + 1  : 0},  // duplicate row page key if length is the same.
          ]}
          component="div"
          colSpan={visibleColumns.length}
          count={data.length}
          rowsPerPage={pageSize}
          page={pageIndex}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
        {/* </TableRow> 
        </TableFooter> */}
        {/* <TablePagination
        rowsPerPageOptions={[
          5,
          10,
          25,
          { label: 'All', value: data.length },
        ]}
        colSpan={visibleColumns.length}
        count={data.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          native: true,
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      /> */}
        {/* <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              'selectedFlatRows[].original': selectedFlatRows.map(
                d => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre> */}
      </Paper>
    </div>
  );
};

export default DynamicAdvancedTable;
