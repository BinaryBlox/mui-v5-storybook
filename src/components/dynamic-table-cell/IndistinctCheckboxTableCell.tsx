import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { CheckboxProps } from '@mui/material/Checkbox';
import { ReactFragment } from 'react';

/**
 * 
 */
export type IIndistinctCheckboxTableCell = {
  checked?: boolean;
  indeterminate?: boolean;
} & React.InputHTMLAttributes<HTMLButtonElement> &
  CheckboxProps;

/**
 * 
 */
const IndistinctCheckboxTableCell = forwardRef<
  HTMLButtonElement,
  IIndistinctCheckboxTableCell
>((props, inRef) => {
  const { checked = false, indeterminate, ...rest } = props;

  const ref = useRef<HTMLButtonElement>(null);
  useImperativeHandle(inRef, () => ref.current!, [ref]);

  return (
    <>
      <Checkbox ref={ref} {...props} />
    </>
  );
});

export default IndistinctCheckboxTableCell;
