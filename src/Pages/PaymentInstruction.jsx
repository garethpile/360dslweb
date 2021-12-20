import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { Button, TextField, Box, TableSortLabel, InputAdornment } from "@material-ui/core";
import Modal from '../Components/Modal';

import axios from "axios";

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Date' },
  { id: 'uberId', numeric: true, disablePadding: false, label: 'Uber ID' },
  { id: 'firstName', numeric: true, disablePadding: false, isSort: true, label: 'First Name' },
  { id: 'lastName', numeric: true, disablePadding: false, isSort: true, label: 'Last Name' },
  { id: 'total', numeric: true, disablePadding: false, label: 'Total' },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount, orderBy, order, sortHandler } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          !headCell.isSort ? <TableCell
            key={headCell.id}
            align={'center'}
          >
            {headCell.label}
          </TableCell> : <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={() => sortHandler({ orderBy: headCell.id, order: order == "desc" ? "asc" : "desc" })}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
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

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 && (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

export default function PaymentInstructions() {
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);
  const [drivers, setDrivers] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [confirmation, setConfirmation] = React.useState(false);
  const [sorting, setSorting] = React.useState({ order: "asc", orderBy: "firstName" });

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const getComparator = ({ order, orderBy }) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  useEffect(() => {
    getDrivers()
  }, [])

  const getDrivers = async () => {
    let driversData = await axios.get(`${process.env.REACT_APP_BASE_URL}/drafts`);
    if (driversData.status === 200 && driversData.data.Items) {
      setDrivers(driversData.data.Items[0]?.instructions);
    }
  }

  const sortHandler = () => {
    // drivers.sort
  }


  const getFNBFile = async () => {
    const sendObj = { instructions: [] };
    sendObj.instructions = drivers.map(x => {
      return { driverId: x.driverId, amount: x.amount || 0 }
    })
    const fnbFile = await axios.post(`${process.env.REACT_APP_BASE_URL}/instructions`, sendObj);
    setOpen(false);
    setMessage("")
    if (fnbFile.status === 200) {
      setOpen(true)
      getDrivers()
    } else {
      alert('Server Error');
    }
  }

  const saveFNBFile = async () => {
    const sendObj = { instructions: [] };
    sendObj.instructions = drivers.map(x => {
      return { driverId: x.driverId, amount: x.amount || 0, "dateCreated": x.dateCreated, "firstName": x.firstName, "lastName": x.lastName }
    })
    const saveFnbFile = await axios.post(`${process.env.REACT_APP_BASE_URL}/drafts`, sendObj);
    if (saveFnbFile.status === 200) {
      setMessage("Payment Instruction saved successfully")
      setOpen(true)
    } else {
      setMessage('Server Error');
      setOpen(true)
    }
  }
  const resetFNBFile = async () => {
    try {
      const resetFNB = await axios.delete(`${process.env.REACT_APP_BASE_URL}/drafts`);
        if (resetFNB.status === 200) {
          setMessage("Reset Succesfully");
          setOpen(true);
          setConfirmation(false)
          getDrivers()

        } else {
          setMessage('Server Error');
          setConfirmation(false)
          setOpen(true)
        }
    } catch (error) {
        setMessage('Server Error');
        setConfirmation(false)
        setOpen(true)
    }
  }

  const confirmHandler = () => {
    setOpen(true);
    setMessage("Are you sure you want to generate FNB File");
  }

  const handleClick = (event, name) => {
    console.log('error ', name)
    const selectedIndex = selected.findIndex((x) => x.driverId === name.driverId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(drivers);
      return;
    }
    setSelected([]);
  };

  const handleDeleted = async () => {
    let driversData = drivers.filter(x => !isSelected(x));
    setDrivers(driversData)
    setSelected([]);

  };

  const isSelected = (obj) => selected.some((x) => obj.driverId === x.driverId);
  return (
    <div className={classes.root}>

      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={0} />
        <TableContainer style={{ height: 300 }}>
          <Box textAlign="center"><h4>Total Amount: {drivers.map(x => (x.amount || 0)).reduce((a, b) => Number(a) + Number(b), 0)?.toFixed(2)}</h4></Box>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={drivers.length}
              orderBy={sorting.orderBy}
              order={sorting.order}
              sortHandler={setSorting}
            />
            <TableBody>
              {stableSort(drivers, getComparator(sorting))
                .map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      // onClick={(event) => handleClick(event, row)}
                      // role="checkbox"
                      // aria-checked={isItemSelected}
                      hover
                      tabIndex={-1}
                      key={row.driverId}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row)}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell align="center" component="th" id={labelId} scope="row" padding="none">
                        {new Date().toLocaleDateString()}
                      </TableCell>
                      <TableCell align="center">{row.driverId}</TableCell>
                      <TableCell align="center">{row.firstName}</TableCell>
                      <TableCell align="center">{row.lastName}</TableCell>
                      <TableCell align="center">
                        <TextField
                          label="Total"
                          name="Total"
                          type={"number"}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">R</InputAdornment>,
                          }}
                          defaultValue={Number(row.amount).toFixed(2)}
                          // value={Number(row.balance)}
                          onChange={(e) => {
                            if (e.target.value?.includes(",")) {
                              alert("Please enter value without coma");
                              return
                            }
                            console.log("e ", e.target.value)
                            let data = [...drivers];
                            let findDriverIndex = data.findIndex(x => x.driverId === row.driverId)
                            data[findDriverIndex].amount = e.target.value
                            setDrivers(data);

                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box m={1} p={1} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <div>
            <Button onClick={saveFNBFile} disabled={drivers.length > 0 ? false : true} variant="contained" color="secondary">Save Payment Instruction</Button>
          </div>
          <div>
            <Button onClick={confirmHandler} disabled={drivers.length > 0 ? false : true} variant="contained" color="secondary">Generate FNB File</Button>
          </div>
          <div>
            <Button variant="contained" onClick={handleDeleted} disabled={selected.length > 0 ? false : true} color="secondary">DELETE selected</Button>
          </div>
          <div>
            <Button variant="contained" onClick={() => setConfirmation(true)} color="secondary">Reset Payment Instruction</Button>
          </div>
        </Box>
        <Modal
          open={open}
          closeHandler={() =>{setOpen(false);setMessage("")}}
          maxWidth="lg"
          header="FNB File"
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <h3>{message ||"Generate FNB File Succesfully"}</h3>
          {message == "Are you sure you want to generate FNB File" && <Box textAlign="center">
                <Button onClick={() => {setConfirmation(false);setMessage("")}}>NO</Button> &nbsp;
                <Button onClick={getFNBFile} variant="contained" color="primary">Yes</Button>
            </Box>}
        </Modal>
        {/* Confirm pop up */}
        <Modal
            open={confirmation}
            closeHandler={() => setConfirmation(false)}
            maxWidth="sm"
            header="Are you sure you want to Reset Payment Instruction?"
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-description"
        >
            <Box textAlign="center">
                <Button onClick={() => setConfirmation(false)}>NO</Button> &nbsp;
                <Button onClick={resetFNBFile} variant="contained" color="primary">Yes</Button>
            </Box>
        </Modal>
      </Paper>
    </div>
  );
}