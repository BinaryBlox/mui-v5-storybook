import React, { useState } from "react";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import type { Theme } from "@mui/material";
import { useExpanded, useFilters, useSortBy, useTable } from "react-table";
import TableSearchFilter, {
  IDefaultTableSearchFilter,
} from "./TableSearchFilter";
import { ITableDataChanged, IStyleClass } from "../component.types";
import { TableTabHeaderGroup } from "../dynamic-tab-header-group/DynamicTabHeaderGroup";

/**
 * Interfaces
 */
export interface IDynamicTable extends ITableDataChanged, IStyleClass {
  columns: Array<any>;
  data: Array<any>;
  dense?: boolean;
  hideFilter?: boolean;
  filter?: string;
  filterList?: Array<string>;
  filterPlaceholder?: string;
  tabHeaderGroup?: TableTabHeaderGroup;
  renderRowSubComponent?: Function;
}

/**
 * Styling Components
 */
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
  },

  box: {
    // TODDO:
    // backgroundColor: theme.palette.mode === "dark" ? grey[900] : grey[200],
    backgroundColor: grey[900],
  },
}));

export const DynamicTable: React.FC<IDynamicTable> = ({
  columns,
  data,
  dense,
  filter,
  filterList,
  filterPlaceholder,
  styleClass,
  hideFilter,
  renderRowSubComponent,
}) => {
  const [filterInput, setFilterInput] = useState("");

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    setFilter,
    setAllFilters,
    state: { expanded },
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy,
    useExpanded
  );

  const handleFilterChange = (e: any) => {
    console.log("handlefilter");
    const value = e.target.value || "";

    if (filter || filterList) {
      setFilter(filter, value);
      //setAllFilters(["show.name", value]);
      setFilterInput(value);
    }
  };

  const classes = useStyles();

  const defaultFilterProps: IDefaultTableSearchFilter = {
    filterInput: filterInput,
    filterPlaceholder: filterPlaceholder!,
    handleFilterChange: handleFilterChange,
  };

  // Render the UI for your table
  return (
    <>
      {/* <pre>
        <code>{JSON.stringify({ expanded: expanded }, null, 2)}</code>
      </pre> */}

      <Paper className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {hideFilter ? null : (
              <TableSearchFilter
                type="default"
                properties={defaultFilterProps}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <TableContainer>
              <Table size={dense ? "small" : "medium"} {...getTableProps()}>
                <TableHead>
                  {headerGroups.map((headerGroup) => (
                    <TableRow
                      {...headerGroup.getHeaderGroupProps()}
                      style={dense ? {} : { height: 53 }}
                    >
                      {headerGroup.headers.map((column) => (
                        <TableCell
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          className={
                            column.isSorted
                              ? column.isSortedDesc
                                ? "sort-desc"
                                : "sort-asc"
                              : ""
                          }
                        >
                          {column.render("Header")}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableHead>
                <TableBody>
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      // Use a React.Fragment here so the table markup is still valid
                      <React.Fragment key={row.getRowProps().key}>
                        <TableRow
                          {...row.getRowProps()}
                          style={dense ? {} : { height: 53 }}
                        >
                          {row.cells.map((cell) => {
                            return (
                              <TableCell
                                {...cell.getCellProps()}
                                padding="default"
                              >
                                {cell.render("Cell")}
                              </TableCell>
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
                              className={classes.box}
                              colSpan={visibleColumns.length}
                            >
                              {/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
                              {renderRowSubComponent!({ row, open, classes })}
                            </TableCell>
                          </TableRow>
                        ) : null}
                      </React.Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default DynamicTable;

