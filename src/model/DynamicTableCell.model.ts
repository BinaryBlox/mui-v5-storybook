import { CheckboxProps } from '@mui/material/Checkbox'

export interface ITableDataChanged { 
    onDataChange?: Function
}
 

export interface EditableCellProps extends ITableDataChanged {
    cell: { value: any },
    row: { index: number },
    column: { id: number }
}
   

// Types (Union of Types)
export type IndistinctCheckboxTableCellProps = {
    checked?: boolean
    indeterminate?: boolean
} & React.InputHTMLAttributes<HTMLButtonElement> & CheckboxProps

