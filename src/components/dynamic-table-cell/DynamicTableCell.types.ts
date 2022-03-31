import { ReactFragment } from 'react';

export interface IconButtonCellConfig {
  id: string;
  icon: React.ReactFragment;
  value?: any;
  label?: string;
  tooltip?: string;
}

export interface IIconButtonTableCell {
  value: any;
  row: any;
  onClick?: Function;
  icons?: Array<IconButtonCellConfig>;
}

export function getIconButtonConfig(
  id: string,
  icon: ReactFragment,
  value?: any,
  label?: any,
  tooltip?: any
) {
  return <IconButtonCellConfig>{
    id: id,
    icon: icon,
    value: value,
    label: label,
    tooltip: tooltip,
  };
}
