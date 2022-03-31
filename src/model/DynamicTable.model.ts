import { CheckboxProps } from '@mui/material/Checkbox'
import { ReactFragment } from 'react'

export interface ITableDataChanged { 
    onDataChange?: Function
}

export interface ExpandableIconData {
    collapsed: React.ReactFragment,
    expanded: React.ReactFragment
}

export interface ExpandableTableCellProps { 
    value: any,
    row: any,   
    canExpand: Function,
    onRowExpanded: Function,
    expandedIcon?: ReactFragment,
    collapsedIcon?: ReactFragment, 
}

export interface EditableCellProps extends ITableDataChanged {
    cell: { value: any },
    row: { index: number },
    column: { id: number }
}

export interface DynamicTableProps extends ITableDataChanged { 
    
    columns: Array<any>;
    data: Array<any>;  
    dense?: boolean,
    filter?: string,
    filterList?: Array<string>,
    filterPlaceholder?: string,
    renderRowSubComponent? : Function
}
// export interface DynamicEnhancedTableProps extends ITableDataChanged {
//     columns: Array<any>;
//     data: Array<any>; 
//     setData: Function,
//     skipPageReset: boolean
// }
export interface DynamicAdvancedTableProps extends DynamicTableProps { 
    setData: Function,
    skipPageReset: boolean
}

// columns,
// data,
// filter,
// renderRowSubComponent

export interface ExpandableTableCellProps {
    // cell: { value: any },
    // row: { index: number },
    // column: { id: number },
    //iconData: {collapsed: string, expanded, string}
    value: any,
    row: any, 
    canExpand: Function
    onRowExpanded: Function
}


export interface SearchFilterProps {
    preGlobalFilteredRows: Array<any>,
    globalFilter: string,
    setGlobalFilter: Function
}

export interface TablePaginationActionsProps {
    count: number,
    page: number,
    rowsPerPage: number,
    onChangePage: Function
}

export interface TableToolbarProps {
    numSelected: number,
    addUserHandler: Function,
    deleteUserHandler: Function,
    setGlobalFilter: Function,
    preGlobalFilteredRows: Array<any>,
    globalFilter: string,
}

export interface DynamicEnhancedTableProps extends ITableDataChanged {
    columns: Array<any>;
    data: Array<any>;
    onDataChange: Function,
    setData: Function,
    skipPageReset: boolean
}

// Types
export type IndistinctCheckboxTableCellProps = {
    checked?: boolean
    indeterminate?: boolean
} & React.InputHTMLAttributes<HTMLButtonElement> & CheckboxProps

