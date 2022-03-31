import React from "react";
import InputBase from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, TextField } from "@mui/material";
import { alpha, lighten } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import type { Theme } from "@mui/material";
import { isUndefined } from "util";

/**
 * Interfaces
 */
export type TableSearchFilterType = "default" | "advanced";

export interface ITableSearchFilter {
  type: TableSearchFilterType;
  properties: IDefaultTableSearchFilter | IAdvancedTableSearchFilter;
}

export interface IAdvancedTableSearchFilter {
  preGlobalFilteredRows: Array<any>;
  globalFilter: string;
  setGlobalFilter: Function;
}

export interface IDefaultTableSearchFilter {
  //preGlobalFilteredRows: Array<any>,
  filterInput: string;
  filterPlaceholder: string;
  handleFilterChange: Function;
}

/**
 * Styled Components
 */
const useStyles = makeStyles((theme: Theme) => ({
  defaultSearch: {
    //paddingTop: theme.spacing(2),
    //paddingBottom: theme.spacing(2),
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor:
      theme.palette.mode == "dark"
        ? alpha(theme.palette.common.black, 0.15)
        : alpha(theme.palette.common.black, 0.08),
    "&:hover": {
      backgroundColor:
        theme.palette.mode == "dark"
          ? alpha(theme.palette.primary.dark, 0.25)
          : alpha(theme.palette.primary.dark, 0.12),
    },
    //margin: theme.spacing(2),
    // marginRight: theme.spacing(2),
    //marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(0),
      width: "auto",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor:
      theme.palette.mode == "dark"
        ? alpha(theme.palette.common.black, 0.15)
        : alpha(theme.palette.common.black, 0.06),
    "&:hover": {
      backgroundColor:
        theme.palette.mode == "dark"
          ? alpha(theme.palette.primary.dark, 0.25)
          : alpha(theme.palette.primary.dark, 0.12),
    },
    // marginRight: theme.spacing(2),
    // marginLeft: 0,
    // marginBottom: 6,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 400,
    },
  },
}));

const TableSearchFilter: React.FC<ITableSearchFilter> = ({
  type,
  properties,
}) => {
  const classes = useStyles();

  let count = 0;
  let advancedProps: IAdvancedTableSearchFilter | undefined =
    type === "advanced"
      ? (properties as IAdvancedTableSearchFilter)
      : undefined;
  let defaultProps: IDefaultTableSearchFilter | undefined =
    type === "default" ? (properties as IDefaultTableSearchFilter) : undefined;

  /**
   *
   * @param type
   */
  function performFilterActions(type: TableSearchFilterType) {
    if (advancedProps === undefined) return;

    switch (type) {
      case "advanced":
        count = advancedProps!.preGlobalFilteredRows.length;
        break;

      case "default":
        break;

      default:
        break;
    }
  }

  performFilterActions(type);

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexWrap: "wrap",
        m: -1,
        p: 2,
      }}
    >
      <Box
        sx={{
          m: 1,
          maxWidth: "100%",
          width: 500, // Replace with parameter or style prop
        }}
      >
        {type === "advanced" ? (
          <React.Fragment>
            {/* Maybe use InputBase Later to be lightweight */}
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                advancedProps!.setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
              }}
              placeholder={`${count} records...`}
              value={advancedProps!.globalFilter || ""}
              variant="outlined"
            />
          </React.Fragment>
        ) : (
          // Global filter only works with pagination from the first page.
          // This may not be a problem for server side pagination when
          // only the current page is downloaded.
          <React.Fragment>
            {/* Maybe use InputBase Later to be lightweight */}{" "}
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              value={defaultProps!.filterInput || ""}
              onChange={(e) => {
                defaultProps!.handleFilterChange(e); // Set undefined to remove the filter entirely
              }}
              placeholder={defaultProps!.filterPlaceholder || "Search"}
            />
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
};

export default TableSearchFilter;
