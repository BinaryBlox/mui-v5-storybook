import React, { useMemo, useState, useEffect } from "react";

import { Story, Meta } from "@storybook/react/types-6-0"
import DynamicAdvancedTable, { IDynamicAdvancedTable } from "./DynamicAdvancedTable";
import {
  getIconButtonConfig,
  IconButtonCellConfig,
} from "../dynamic-table-cell/DynamicTableCell.types";
import { People, AlarmAdd } from "@mui/icons-material";
import {
  createKitchenSinkData,
  createKitchenSinkDataNoMemo,
  makeData,
  renderRowSubComponent,
  createBasicDataNoMemo,
} from "./mock";
import clsx from "clsx";
import { DynamicAdvancedTableProps } from "../../model/DynamicTable.model";
import { Guid } from "../component.utils";
//import { ConfirmationServiceProvider } from "../../../Feedback/ConfirmationDialog.service";

// For Storybook
export default {
  title: "components/dynamic-table/DynamicAdvancedTable",
  //component: DynamicAdvancedTable, // Will show all available properties
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    docs: {
      description: {
        component: "DynamicAdvancedTable component _markdown_",
      },
    },
  },
} as Meta;

 

const componentId = Guid.create().toString();

const handleOnRowExpanded = (rowIndex: React.ReactText, value: any) => {};

const canCellExpand = (value: any) => {
  return value;
};

const onActionButtonClick = (value: any) => {
  alert("clicked");
};

let dataState: any = makeData(20);

const setData = (event: any) => {};
const setState = (event: any) => {};
const handleDataDeleted = (event: any) => {
  //alert(`Deleting data indeces: ${JSON.stringify(event.indexes, null, '\t')}`)
  const deleteTitle = `Items Deleted`;
  const content = `Deleting data indeces: ${JSON.stringify(
    event.indexes,
    null,
    "\t"
  )}`;

  //helper.openDialog()

  //render(<AlertDialog openStatus={true} title={deleteTitle} content={content}/>, document.querySelector(`#${componentId}`));

  //  confirm({
  //     variant: "danger",
  //     catchOnCancel: true,
  //     title: "Are you sure you want to remove this burrito?",
  //     description: "If you will remove this burrito you will regret it 😡"
  //   })
  //     .then(() => setState("angry"))
  //     .catch(() => setState("thanks"));
  //alert(`Deleting data indeces: ${JSON.stringify(event.indexes, null, '\t')}`)
};

const handleDataChanged = (
  rowIndex: React.ReactText,
  columnId: any,
  value: any
) => {
  // We also turn on the flag to not reset the page
  //console.log(`rowIndex:${rowIndex} - ColumnId: ${columnId} - value: ${value}`)
  //setSkipPageReset(true)
  // setData((old: any[]) =>
  //   old.map((row: any, index: any) => {
  //     if (index === rowIndex) {
  //       return {
  //         ...old[rowIndex],
  //         [columnId]: value,
  //       }
  //     }
  //     return row
  //   })
  //)
};

const getRowId = (row: any, relativeIndex: any) => {
  const hash = Object.keys(row)
    .map((k) => {
      // Only get the first letter of the prop and value
      // to keep the hash short, so it is easier to see
      // the full hash in dev tools
      return `${k[0]}${String(row[k])[0] || ""}`;
    })
    .join("");
  const id = `${relativeIndex}${hash}`;
  return id;
};

const tableStateReducer = (
  newState: { [key: string]: any },
  action: { type: "string"; [key: string]: any },
  prevState: { [key: string]: any }
) => {
  switch (action.type) {
    // case SET_SELECTED_ROWS:
    //   return { ...prevState, selectedRowIds: action.selectedIds };
    default:
      //console.log(`STATE ${action.type}`)
      return newState;
  }
};

const actionIconsConfig: Array<IconButtonCellConfig> = [];
actionIconsConfig.push(
  getIconButtonConfig("alarm", <AlarmAdd color="inherit" />, null, null, null)
);
actionIconsConfig.push(
  getIconButtonConfig(
    "people",
    <People color="primary" />,
    null,
    null,
    "People Tooltip"
  )
);

const Template: Story<IDynamicAdvancedTable> = (args) => (
  <DynamicAdvancedTable
    {...args}
    getRowId={getRowId}
    stateReducer={tableStateReducer}
    setData={setData}
    onDataChange={handleDataChanged}
    onDataDeleted={handleDataDeleted}
    renderRowSubComponent={renderRowSubComponent}
  />
);

export const Basic = Template.bind({});

Basic.parameters = {
  docs: {
    description: {
      component: "Basic Table _markdown_",
    },
    // source: {
    //     code: 'Some custom string here'
    // }
  },
};

 
Basic.args = { 
  toolbarTitle: "Basic Table",
  componentId: componentId,
  hideFilter: false,
  dense: false,
  skipPageReset: true,
  columns: createBasicDataNoMemo(),
  data: dataState,
};

export const Enhanced = Template.bind({});
Enhanced.parameters = {
  docs: {
    description: {
      component: "Enhanced Table _markdown_",
    },
    // source: {
    //     code: 'Some custom string here'
    // }
  },
};
Enhanced.args = {
  toolbarTitle: "Enhanced Table",
  componentId: componentId,
  hideFilter: false,
  dense: false,
  skipPageReset: true,
  columns: createKitchenSinkDataNoMemo(
    onActionButtonClick,
    canCellExpand,
    handleOnRowExpanded,
    actionIconsConfig
  ),
  data: dataState,
};
