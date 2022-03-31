import React, { useMemo, useState, useEffect, isValidElement } from "react";
import { Collapse, Box, Typography } from "@mui/material";

import {
  AddBox,
  IndeterminateCheckBox,
  People,
  AlarmAdd,
} from "@mui/icons-material";
import { withStyles, Theme, createStyles } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import namor from "namor";

import { isEven } from "../component.utils";

import {
  ChipTableCell,
  IconButtonTableCell,
  //   ToggleSwitchTableCell,
  ExpandingTableCell,
  EditableTableCell,
} from "../dynamic-table-cell";

import { IconButtonCellConfig } from "../dynamic-table-cell/DynamicTableCell.types";

// import PredictiveGraph from "../../../components/lab/kp/Insights/PredictiveGraph/PredictiveGraph";
// import { groupedListData } from "../checkBoxListGroup";

import { grey } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     box: {
//       backgroundColor: theme.palette.type === "dark" ? grey[900] : grey[200],
//     },
//   })
// );

//const classes = useStyles();
interface BasicCellProps {
  // any props that come into the component
  value: any;
  row?: any;
}

interface EditCellProps extends BasicCellProps {
  // any props that come into the component
  cell: any;
  column: any;
}

export function createKitchenSinkData(
  onActionButtonHandler: Function,
  canCellExpand: Function,
  handleOnRowExpanded: Function,
  actionIconsConfig: Array<IconButtonCellConfig>
) {
  return useMemo(
    () => [
      {
        // Make an expander cell
        Header: () => null, // No header
        id: "expander", // It needs an ID
        accessor: "expandable",
        Cell: ({ value, row }: BasicCellProps) => (
          <ExpandingTableCell
            value={value}
            row={row}
            expandedIcon={<IndeterminateCheckBox color="action" />}
            collapsedIcon={<AddBox color="primary" />}
            canExpand={canCellExpand}
            onRowExpanded={handleOnRowExpanded}
          />
        ),
        // We can override the cell renderer with a SubCell to be used with an expanded row
        SubCell: () => null, // No expander on an expanded row
      },
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Visits",
        accessor: "visits",
      },
      //   {
      //     Header: "Status",
      //     accessor: "status",
      //     Cell: ({ value, row }) => (
      //       <ToggleSwitchTableCell
      //         type="ant"
      //         value={value}
      //         row={row}
      //         onClick={onActionButtonHandler}
      //       />
      //     ),
      //   },
      // {
      //   Header: "Runtime",
      //   accessor: "show.runtime",
      //   // Cell method will provide the value of the cell; we can create a custom element for the Cell
      //   Cell: ({ value }) => {
      //     const hour = Math.floor(value / 60);
      //     const min = Math.floor(value % 60);
      //     return (
      //       <>
      //         {hour > 0 ? `${hour} hr${hour > 1 ? "s" : ""} ` : ""}
      //         {min > 0 ? `${min} min${min > 1 ? "s" : ""}` : ""}
      //       </>
      //     );
      //   }
      // },

      {
        Header: "Types",
        accessor: "types",
        // Cell method will provide the cell value; we pass it to render a custom component
        Cell: ({ value } : BasicCellProps) => (
          <ChipTableCell
            action="withDelete"
            size="small"
            color="secondary"
            values={value}
          />
        ),
      },
      {
        // Make an expander cell
        Header: "Actions",
        id: "actions", // It needs an ID
        accessor: "progress",
        Cell: ({ value, row } : BasicCellProps) => (
          <IconButtonTableCell
            value={value}
            row={row}
            //icons={[<IconButtonConfig><AlarmAdd/>, <People/>]}
            icons={actionIconsConfig}
            onClick={onActionButtonHandler}
          />
        ),
      },
    ],
    []
  );
}

export function createBasicDataNoMemo() {
  return [
    {
      Header: "First Name",
      accessor: "firstName",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
    },
    {
      Header: "Age",
      accessor: "age",
    },
    {
      Header: "Visits",
      accessor: "visits",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Types",
      accessor: "types",
    },
    {
      // Make an expander cell
      Header: "Progress",
      accessor: "progress",
    },
  ];
}

export function createKitchenSinkDataNoMemo(
  onActionButtonHandler: Function,
  canCellExpand: Function,
  handleOnRowExpanded: Function,
  actionIconsConfig: Array<IconButtonCellConfig>
) {
  return [
    {
      // Make an expander cell
      Header: () => null, // No header
      id: "expander", // It needs an ID
      accessor: "expandable",
      Cell: ({ value, row }: BasicCellProps) => (
        <ExpandingTableCell
          value={value}
          row={row}
          expandedIcon={<IndeterminateCheckBox color="action" />}
          collapsedIcon={<AddBox color="primary" />}
          canExpand={canCellExpand}
          onRowExpanded={handleOnRowExpanded}
        />
      ),
      // We can override the cell renderer with a SubCell to be used with an expanded row
      SubCell: () => null, // No expander on an expanded row
    },
    {
      Header: "First Name",
      accessor: "firstName",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
      Cell: ({ value, row, cell, column }: EditCellProps) => (
        <EditableTableCell
          cell={cell}
          row={row}
          column={column}
          onDataChange={undefined}
        />
      ),
    },
    {
      Header: "Age",
      accessor: "age",
    },
    {
      Header: "Visits",
      accessor: "visits",
    },
    // {
    //   Header: "Status",
    //   accessor: "status",
    //   Cell: ({ value, row }) => (
    //     <ToggleSwitchTableCell
    //       type="ant"
    //       value={value}
    //       row={row}
    //       onClick={onActionButtonHandler}
    //     />
    //   ),
    // },
    // {
    //   Header: "Runtime",
    //   accessor: "show.runtime",
    //   // Cell method will provide the value of the cell; we can create a custom element for the Cell
    //   Cell: ({ value }) => {
    //     const hour = Math.floor(value / 60);
    //     const min = Math.floor(value % 60);
    //     return (
    //       <>
    //         {hour > 0 ? `${hour} hr${hour > 1 ? "s" : ""} ` : ""}
    //         {min > 0 ? `${min} min${min > 1 ? "s" : ""}` : ""}
    //       </>
    //     );
    //   }
    // },

    {
      Header: "Types",
      accessor: "types",
      // Cell method will provide the cell value; we pass it to render a custom component
      Cell: ({ value } : BasicCellProps) => (
        <ChipTableCell
          action="withDelete"
          size="small"
          color="secondary"
          values={value}
        />
      ),
    },
    {
      // Make an expander cell
      Header: "Actions",
      id: "actions", // It needs an ID
      accessor: "progress",
      Cell: ({ value, row } : BasicCellProps) => (
        <IconButtonTableCell
          value={value}
          row={row}
          //icons={[<IconButtonConfig><AlarmAdd/>, <People/>]}
          icons={actionIconsConfig}
          onClick={onActionButtonHandler}
        />
      ),
    },
  ];
}

export function createBasicData() {
  return useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Visits",
        accessor: "visits",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Types",
        accessor: "types",
      },
      {
        // Make an expander cell
        Header: "Progress",
        accessor: "progress",
      },
    ],
    []
  );
}

export const renderRowSubComponent = (props: any) => {
  return (
    <Box margin={1}>
      <Typography variant="h6" gutterBottom component="div">
        Row Content
      </Typography>
      <pre
        style={{
          fontSize: "10px",
        }}
      >
        <code>{JSON.stringify({ values: props.row.values }, null, 2)}</code>
      </pre>
    </Box>
  );
};

// export const renderRowSubComponentComplex = (props: any) => {
//   // props.styleClass

//   const classes = props.classes;
//   console.log(props);
//   return (
//     <Box m={0} className={classes.box}>
//       <PredictiveGraph
//         data={groupedListData}
//         listDepth={3}
//         listColumnWidth={100}
//         fieldName={"value"}
//         status={"none"}
//       ></PredictiveGraph>
//     </Box>
//   );
// };

function range(len: number) {
  const arr = Array<any>();
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
}

function newPerson(value?: number) {
  const statusChance = Math.random();
  return {
    expandable: isEven(value!),
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    types: ["Standard", `Spec-${Math.floor(Math.random() * 100)}`],
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33
        ? "complicated"
        : "single",
  };
}

function tableCellField(field: string, value?: number) {
  const statusChance = Math.random();
  return {
    expandable: true,
    cellType: field,
    cellValue: namor.generate({ words: 1, numbers: 0 }),
    cellValueList: [
      `Cell-${Math.floor(Math.random() * 100)}`,
      `Cell-${Math.floor(Math.random() * 100)}`,
    ],
  };
}

export function makeData(...lens: any[]) {
  const makeDataLevel: any = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(d),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

export function makeSingleFieldData(field: string, ...lens: any) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...tableCellField(field, d),
        //subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
