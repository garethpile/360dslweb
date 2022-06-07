import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
 import Button from '@material-ui/core/Button';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import DialogActions from '@material-ui/core/DialogActions';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    // width: 700,
    backgroundColor: "#ed143d",
  },
  whiteColor : {
    color: "white !important",

  },
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',

  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.common.white
  }
});
const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
      <MuiDialogTitle disableTypography className={`${classes.root}` }>
        <Typography className={`${classes.whiteColor}`} variant="h6">{children}</Typography>
        {onClose ? (
            <IconButton
                aria-label="close"
                className={classes.closeButton}
                onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
        ) : null}
      </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);


const Modal = props => {
  // const handleClickOpen = () => {
  //   props.closeHandler();
  // };
  const handleClose = () => {
    props.closeHandler();
  };
  // const handleChange = event => {
  //   // console.log(event);
  // };
  return (
      <div>
        <Dialog
            //classes={props.size ? '' : {paper: styles.dialogPaper}}
            onClose={handleClose}
            maxWidth={props.size ? props.size : "lg"}
            aria-labelledby="customized-dialog-title"
            open={props.open}
            fullWidth={props.fullWidth ? props.fullWidth : true}
        >
          <DialogTitle onClose={handleClose}>
            {props.header ?  props.header : 'Create Applicant'}
          </DialogTitle>
          <DialogContent dividers>
              {props.children}
          </DialogContent>
        </Dialog>
      </div>
  );
};

export default Modal;
