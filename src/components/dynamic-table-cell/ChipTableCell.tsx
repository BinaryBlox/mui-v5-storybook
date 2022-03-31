import * as React from 'react';
import { Chip } from '@mui/material';
import { Guid } from '../component.utils';
import { makeStyles } from '@mui/styles';
import { ChipProps } from '@mui/material';
import { ReactFragment, ReactElement } from 'react';
import type { Theme } from '@mui/material';

/**
 * Interfaces
 */
// Generated with util/create-component.js
export interface IChipTableCell {
  values: any;
  color: ChipProps['color'];
  size: ChipProps['size'];
  action: ChipTableCellType;
  isOutlined?: boolean;
  icon?: ReactElement;
  deleteIcon?: ReactElement;
  handleOnClick?: any;
  handleOnDelete?: any;
}

export type ChipTableCellType =
  | 'noAction'
  | 'withClick'
  | 'withDelete'
  | 'withAll';

/**
 * Styling Components
 */
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    //justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

/**
 *
 * @param param0
 */
export const ChipTableCell: React.FC<IChipTableCell> = ({
  values,
  action,
  icon,
  deleteIcon,
  color,
  size,
  isOutlined,
  handleOnClick,
  handleOnDelete,
}) => {
  const classes = useStyles();
  // Guid.create().toString();
  // if(!deleteIcon && action === "withDelete" || "withAll"){
  //   deleteIcon = <DoneIcon />
  // }
  // Loop through the array and create a badge-like component instead of a comma-separated string

  return (
    <div className={classes.root}>
      {values.map(
        (value: React.ReactNode, idx: string | number | undefined) => {
          const chipId = Guid.create().toString();
          return (
            <Chip
              key={chipId}
              className={classes.chip}
              clickable
              variant={isOutlined ? 'outlined' : 'filled'}
              size={size}
              label={value}
              icon={icon}
              onClick={handleOnClick}
              onDelete={handleOnDelete}
              deleteIcon={deleteIcon}
              color={color}
            />
          );
        }
      )}
    </div>
  );
};

export default ChipTableCell;

// margin-right: 4px;
// padding: 4px 8px;
// border-radius: 12px;
// font-size: 12px;
// font-weight: bold;F
// text-transform: uppercase;
