
import { IconButtonCellConfig } from '../components/data/TableCell/IconButtonCell/IconButtonTableCell.types';
import { ReactFragment } from 'react'
import { PropTypes } from '@material-ui/core'
export function getIconButtonConfig(id: string, icon: ReactFragment, value?: any, label?: any, tooltip?: any ) {
 
    return <IconButtonCellConfig>{ id: id, icon: icon, value: value, label: label, tooltip: tooltip } 
    
}
 
