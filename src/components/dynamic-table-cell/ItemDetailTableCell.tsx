import * as React from 'react';
import { Avatar, Box, Link, Typography } from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { makeStyles } from '@mui/styles';
import type { Theme } from '@mui/material'; 
import { ITableDataChanged } from '../component.types';

/**
 * Interfaces
 */

export interface ItemDetailTableCellProps extends ITableDataChanged {
  cell: { value: any };
  row: { index: number; original: any };
  column: { id: number };
  onNavigationLinkClick?: React.MouseEventHandler<HTMLAnchorElement> &
    React.MouseEventHandler<HTMLSpanElement>;
  uid?: string | number | null;
  title?: string;
  subTitle?: string;
  avatar?: string;
  avatarInitials?: string;
  path?: string;
}

export type ItemDetailTableCellType =
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
export const ItemDetailTableCell: React.FC<ItemDetailTableCellProps> = ({
  cell: { value: initialValue },
  row: { index, original },
  column: { id },
  uid,
  title,
  subTitle,
  avatar,
  avatarInitials,
  path,
  onNavigationLinkClick,
  onDataChange, // This is a custom function that we supplied to our table instance
}) => {
  const rowData = original ? original : {};
  const DEFAULT_TITLE = 'Unknown';

  console.log(`ROWID: ${uid}`);

  let safeRowDataValue: any;

  if (uid && rowData[uid]) {
    const rowDataVal = rowData[uid];

    if (typeof rowDataVal == 'number') {
      safeRowDataValue = rowDataVal.toString();
    } else if (typeof rowDataVal == 'string') {
      safeRowDataValue =
        rowDataVal && rowDataVal.trim().length > 0 ? rowDataVal : '1';
    }
  }

  const cellItemId = safeRowDataValue; //rowData[uid] && rowData[uid].trim().length > 0 ? rowData[uid]  : '1';
  const cellTitle =
    rowData[title] && rowData[title].trim().length > 0
      ? rowData[title]
      : DEFAULT_TITLE;
  const cellSubTitle =
    rowData[subTitle] && rowData[subTitle].trim().length > 0
      ? rowData[subTitle]
      : 'None';

  const cellPath = path ? `${path}/${cellItemId}` : '/'; //"/dashboard/customers/1"
  const cellAvatar = avatar ? avatar : 'default';
  const cellAvatarInitials =
    cellTitle != DEFAULT_TITLE ? getInitials(cellTitle) : '--';

  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);
  const [isChanging, setIsChanging] = React.useState(false);
  const [originalValue, setOriginalValue] = React.useState(initialValue);

  //   console.log(`Cell Path:${cellPath} `)
  //   console.log(`Cell Title${cellTitle} ${cellTitle.length}`);
  //   console.log(`Row Value: ${JSON.stringify(row, null, '\t')}`);
  //   const onChange = (e: { target: { value: any } }) => {
  //     setIsChanging(true);
  //     setValue(e.target.value);
  //   };

  //   // We'll only update the external data when the input is blurred
  //   const onBlur = () => {
  //     //setOriginalValue(value)

  //     setIsChanging(false);
  //     if (onDataChange) {
  //       // onDataChange(index, id, value)
  //     }
  //   };

  //   const onFocus = () => {
  //     setOriginalValue(value);
  //     setIsChanging(false);
  //     if (onDataChange) {
  //       // onDataChange(index, id, value)
  //     }
  //   };

  const classes = useStyles();

  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
      }}
    >
      <Avatar
        src={cellAvatar}
        sx={{
          height: 42,
          width: 42,
        }}
      >
        {cellAvatarInitials}
      </Avatar>
      <Box sx={{ ml: 1 }}>
        <Link
          color="inherit"
          onClick={(ev: React.MouseEvent<HTMLAnchorElement>): void =>
            onNavigationLinkClick(cellItemId)
          }
          //   onClick={onNavigationLinkClick}
          style={{ cursor: 'pointer' }}
          //   component={RouterLink}
          //   to={cellPath}
          variant="subtitle2"
        >
          {cellTitle}
        </Link>
        <Typography color="textSecondary" variant="body2">
          {cellSubTitle}
        </Typography>
      </Box>
    </Box>
    // <TextField
    //   label={isChanging ? originalValue : null}
    //   id="filled-size-small"
    //   value={value}
    //   onFocus={onFocus}
    //   // helperText="Some important text"
    //   // margin="dense"
    //   variant="outlined"
    //   size="small"
    //   onChange={onChange}
    //   onBlur={onBlur}
    //   color="primary"
    // />
  );
};

export default ItemDetailTableCell;

// EditableCell.propTypes = {
//   cell: PropTypes.shape({
//     value: PropTypes.any.isRequired,
//   }),
//   row: PropTypes.shape({
//     index: PropTypes.number.isRequired,
//   }),
//   column: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//   }),
//   updateMyData: PropTypes.func.isRequired,
// }

{
  /* <Box
  sx={{
    alignItems: 'center',
    display: 'flex',
  }}
>
  <Avatar
    src={customer.avatar}
    sx={{
      height: 42,
      width: 42,
    }}
  >
    {getInitials(customer.name)}
  </Avatar>
  <Box sx={{ ml: 1 }}>
    <Link
      color="inherit"
      component={RouterLink}
      to="/dashboard/customers/1"
      variant="subtitle2"
    >
      {customer.name}
    </Link>
    <Typography color="textSecondary" variant="body2">
      {customer.email}
    </Typography>
  </Box>
</Box>; */
}
