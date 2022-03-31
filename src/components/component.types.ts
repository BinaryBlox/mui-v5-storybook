import { GridSize } from "@mui/material";

export interface IApiRequest {
  requestId?: string;
  request?: Function;
}

export interface IApiRequestGroup {
  requestGroupId?: string;
  requestGroup?: IApiRequest[];
}

export interface IReduxDispatcher extends IDispatcher {
 
}

export interface IDispatcher {
  dispatcher?: any;
}


export interface IListItem {
  id: string | number;
  selected: boolean;
}
export interface ITableDataChanged {
  onDataChange?: Function;
}

export interface IStyleClass {
  styleClass?: any;
}

export interface IStyleClassName {
  className?: string;
}

export interface IBaseCheckboxListGroup extends IStyleClass {
  listDepth: number;
  listColumnWidth?: number;
  fieldName?: string;
}
export type SelectAllStatusType = "none" | "select" | "deselect";

export interface LayoutGridSize {
  /* The unique field name */
  type: GridSize;
}

export function getGridSize(gridSize: number) {
  var value: LayoutGridSize;

  switch (gridSize) {
    case 1:
      value = <LayoutGridSize>{ type: 12 };
      break;
    case 2:
      value = <LayoutGridSize>{ type: 6 };
      break;
    case 3:
      value = <LayoutGridSize>{ type: 4 };
      break;
    case 4:
      value = <LayoutGridSize>{ type: 3 };
      break;
    // case 5:
    //     value = <LayoutGridSize>{ type: 5 };
    //     break;
    // case 6:
    //     value = <LayoutGridSize>{ type: 6 };
    //     break;
    // case 7:
    //     value = <LayoutGridSize>{ type: 7 };
    //     break;
    // case 8:
    //     value = <LayoutGridSize>{ type: 8 };
    //     break;
    // case 9:
    //     value = <LayoutGridSize>{ type: 9 };
    //     break;
    // case 10:
    //     value = <LayoutGridSize>{ type: 10 };
    //     break;
    // case 11:
    //     value = <LayoutGridSize>{ type: 11 };
    //     break;
    // case 12:
    //     value = <LayoutGridSize>{ type: 12 };
    //     break;
    default:
      value = <LayoutGridSize>{ type: "auto" };
      break;
  }
  return value;
}
