
import * as React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { IconButtonCellConfig, IIconButtonTableCell } from "./DynamicTableCell.types";
 
/**
 * Custom component to display expanding cell icon
 * @param param0 
 */ 
export const IconButtonTableCell: React.FC<IIconButtonTableCell> = ({
  value,
  row,
  onClick,
  icons,
}) => {
  if (icons && icons.length > 0) {
    return (
      <>
        {icons.map(
          (
            iconConfig: IconButtonCellConfig,
            idx: string | number | undefined
          ) => {
            return (
              <span key={idx}>
                {iconConfig.tooltip ? (
                  <Tooltip title={iconConfig.tooltip}>
                    <IconButton
                      onClick={(ev: React.MouseEvent<HTMLInputElement>): void =>
                        onClick(ev)
                      }
                    >
                      {iconConfig.icon}
                    </IconButton>
                  </Tooltip>
                ) : (
                  <IconButton
                    onClick={(ev: React.MouseEvent<HTMLInputElement>): void =>
                      onClick(ev)
                    }
                  >
                    {iconConfig.icon}
                  </IconButton>
                )}
              </span>
            );
          }
        )}
      </>
    );
  } else {
    return null;
  }
};

export default IconButtonTableCell;
