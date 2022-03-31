import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle"; 
 
/**
 * 
 */
export interface IAlertDialog   { 
  openStatus: boolean,
  title: string, 
  content: string
}

/**
 * 
 * @param param0 
 */
const AlertDialog: React.FC<IAlertDialog> = ({
  openStatus,
  title,
  content,
}) => {
  const [open, setOpen] = React.useState(openStatus);
  const [alertTitle, setAlertTitle] = React.useState(title);
  const [alertContent, setAlertContent] = React.useState(content);

  /**
   * 
   */
  const handleClickOpen = () => {
    setOpen(true);
  };

  /**
   * 
   */
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alertContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
