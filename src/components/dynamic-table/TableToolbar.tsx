import * as React from 'react';
import {
  Toolbar,
  Tooltip,
  Badge,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import clsx from 'clsx';
import TableSearchFilter, {
  IAdvancedTableSearchFilter,
} from './TableSearchFilter';
import { makeStyles } from '@mui/styles';
import type { Theme } from '@mui/material';
import { lighten } from '@mui/material/styles';
/**
 * Interfaces
 */
export interface TableToolbarProps {
  numSelected: number;
  addUserHandler: Function;
  deleteUserHandler: Function;
  setGlobalFilter: Function;
  preGlobalFilteredRows: Array<any>;
  globalFilter: string;
  title?: string;
}

/**
 * Styling Components
 */
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.mode === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

/**
 * Component
 */
export const TableToolbar: React.FC<TableToolbarProps> = ({
  numSelected,
  addUserHandler,
  deleteUserHandler,
  preGlobalFilteredRows,
  setGlobalFilter,
  globalFilter,
  title,
}) => {
  const classes = useStyles();

  const advancedFilterProps: IAdvancedTableSearchFilter = {
    globalFilter: globalFilter,
    setGlobalFilter: setGlobalFilter,
    preGlobalFilteredRows: preGlobalFilteredRows,
  };

  return (
    <>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {/* <AddUserDialog
        addUserHandler={event => {
          addUserHandler(event.target || undefined) // Set undefined to remove the filter entirely
        }} 
      /> */}
        {numSelected > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
          >
            {numSelected} selected
          </Typography>
        ) : (
          // <Typography className={classes.title} variant="h6" id="tableTitle">
          //   {title ? title : "Toolbar"}
          // </Typography>
          <TableSearchFilter type="advanced" properties={advancedFilterProps} />
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              onClick={(event) => {
                deleteUserHandler(event.target || undefined); // Set undefined to remove the filter entirely
              }}
            >
              <Badge badgeContent={numSelected} color="primary">
                <DeleteIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        ) : (
          // <TableSearchFilter type="advanced" properties={advancedFilterProps} />
          <></>
        )}
      </Toolbar>
      {/* <Divider/> */}
    </>
  );
};

export default TableToolbar;
