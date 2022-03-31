
import * as React from "react";   
import { AddBox, IndeterminateCheckBox } from '@mui/icons-material'; 
import { IconButton } from "@mui/material";  

/**
 * Interfaces
 */
 export interface ExpandableIconData {
  collapsed: React.ReactFragment;
  expanded: React.ReactFragment;
}

export interface IExpandableTableCell {
  value: any;
  row: any;
  canExpand: Function;
  onRowExpanded: Function;
  expandedIcon?: React.ReactFragment;
  collapsedIcon?: React.ReactFragment;
}

 
/**
 * 
 * @param param0 
 */
export const ExpandingTableCell: React.FC<IExpandableTableCell> = ({
    value,
    row,  
    canExpand,
    onRowExpanded,
    expandedIcon,
    collapsedIcon
  }) => {
    
     if(canExpand(value)){ 
        const expandedIconType = (expandedIcon) ? expandedIcon : <IndeterminateCheckBox color="primary"/>;
        const collapsedIconType = (collapsedIcon) ? collapsedIcon : <AddBox color="primary"/>;
     
        return (
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          // <span {...row.getToggleRowExpandedProps()} style={{verticalAlign: 'middle' }}></span>
          <span {...row.getToggleRowExpandedProps()} >
            <IconButton  >
            {row.isExpanded ? expandedIconType : collapsedIconType}
            </IconButton>
          </span>
        )
      }
    else{
      return null;
    }
  }

  export default ExpandingTableCell;

      // Loop through the array and create a badge-like component instead of a comma-separated string
  //   return (
  //     <>
  //       {values.map((genre: React.ReactNode, idx: string | number | undefined) => {
  //         return (
  //           <span key={idx} className="badge">
  //             {genre}
  //           </span>
  //         );
  //       })}
  //     </>
  //   );
  // };