import * as React from 'react';
import { TextField } from '@mui/material'; 
import { makeStyles } from '@mui/styles';
import type { Theme } from '@mui/material';
import { ITableDataChanged } from '../component.types';

/**
 * Interfaces
 */
// Generated with util/create-component.js
// export interface EditableTableCellProps {
//   values: any;
//   color: ChipProps["color"];
//   size: ChipProps["size"];
//   action: EditableTableCellType;
//   isOutlined?: boolean;
//   icon?: ReactElement;
//   deleteIcon?: ReactElement;
//   handleOnClick?: any;
//   handleOnDelete?: any;
// }

export interface IEditableTableCell extends ITableDataChanged {
  cell: { value: any };
  row: { index: number };
  column: { id: number };
}

export type EditableTableCellType =
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
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  '& label.Mui-focused': {
    color: theme.palette.primary.light,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.palette.primary.light,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'red',
    },
    '&:hover fieldset': {
      borderColor: 'yellow',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.light,
    },
  },
}));

/**
 *
 * @param param0
 */
export const EditableTableCell: React.FC<IEditableTableCell> = ({
  cell: { value: initialValue },
  row: { index },
  column: { id },
  onDataChange, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);
  const [isChanging, setIsChanging] = React.useState(false);
  const [originalValue, setOriginalValue] = React.useState(initialValue);
  const onChange = (e: { target: { value: any } }) => {
    setIsChanging(true);
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    //setOriginalValue(value)

    setIsChanging(false);
    if (onDataChange) {
      // onDataChange(index, id, value)
    }
  };

  const onFocus = () => {
    setOriginalValue(value);
    setIsChanging(false);
    if (onDataChange) {
      // onDataChange(index, id, value)
    }
  };

  const classes = useStyles();

  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <TextField
      label={isChanging ? originalValue : null}
      id="filled-size-small"
      value={value}
      onFocus={onFocus}
      // helperText="Some important text"
      // margin="dense"
      variant="outlined"
      size="small"
      onChange={onChange}
      onBlur={onBlur}
      color="primary"
    />
  );
};

export default EditableTableCell;
