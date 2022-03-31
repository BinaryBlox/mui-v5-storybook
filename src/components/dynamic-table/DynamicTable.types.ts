
import { IconButtonCellConfig } from '../dynamic-table-cell/DynamicTableCell.types';
import { ReactFragment } from 'react'
 
export function getIconButtonConfig(id: string, icon: ReactFragment, value?: any, label?: any, tooltip?: any ) {
 
    return <IconButtonCellConfig>{ id: id, icon: icon, value: value, label: label, tooltip: tooltip } 
    
}
 
