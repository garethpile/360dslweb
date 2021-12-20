import React , {useEffect} from 'react';
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
import Box from "@material-ui/core/Box"
import { Button } from "@material-ui/core";
import axios from "axios"
import UploadFile from './Upload';
import Modal from '../Components/Modal';



// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Date' },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Uber ID' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'First Name' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Last Name' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Total' },  
];

function EnhancedTableHead(props) {
  const {onSelectAllClick, numSelected, rowCount } = props;

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
          <TableCell
            key={headCell.id}
            align={'center'}
          >
              {headCell.label}
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
}));

export default function UberTransactions() {
  const classes = useStyles();
  // const [order, setOrder] = React.useState('asc');
  // const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [txns, setTxns] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  // const [page, setPage] = React.useState(0);
  // const [dense, setDense] = React.useState(false);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    getTransactions();
  }, [])

  const getTransactions = async () => {
    let transactions = await axios.get(`${process.env.REACT_APP_BASE_URL}/transactions?status=NEW`);
    if(transactions.status === 200 && transactions.data.results){
      setTxns(transactions.data.results);
    }
    console.log(transactions)
  }
  const handleAllAsReviewed = async () => {
    let driverIDs = txns.map(x => x.driverId);
    driverIDs = [...new Set(driverIDs)];
    let updateObj = driverIDs.map(driverId => {
      return {
        driverId : driverId,
        transactions : txns.filter(x => x.driverId === driverId).map(j => {
          return {"transactionId": j.transactionId,"status":"REVIEWED", "description":"Pay","total": j.total}
        }),
      }
    })
    let response = await axios.put(`${process.env.REACT_APP_BASE_URL}/transactions` , {drivers :updateObj});
    console.log(updateObj)
    if(response.status === 200){
      getTransactions();
      setSelected([])
    }
  };

  const handleSelectedAsReviewed = async() => {
    let driverIDs = selected.map(x => x.driverId);
    driverIDs = [...new Set(driverIDs)];
    let updateObj = driverIDs.map(driverId => {
      return {
        driverId : driverId,
        transactions : selected.filter(x => x.driverId === driverId).map(j => {
          return {"transactionId": j.transactionId,"status":"REVIEWED", "description":"Pay","total": j.total}
        }),
      }
    })
    console.log(updateObj)
    let response = await axios.put(`${process.env.REACT_APP_BASE_URL}/transactions` , {drivers :updateObj});
    if(response.status === 200){
      getTransactions()
      setSelected([])
      alert("Selected transactions Reviewed Successfully")
    }
  };

  const handleDeleted = async() => {
    let driverIDs = selected.map(x => x.driverId);
    driverIDs = [...new Set(driverIDs)];
    let updateObj = driverIDs.map(driverId => {
      return {
        driverId : driverId,
        transactions : selected.filter(x => x.driverId === driverId).map(j => {
          return {"transactionId": j.transactionId,"status":"REVIEWED"}
        }),
      }
    })
    console.log(updateObj)
    let response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/transactions` , {
      data: {
        drivers :updateObj
      }
    });
    if(response.status === 200){
      getTransactions()
      setSelected([])
      alert("Selected transactions Delete Successfully")
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(txns);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    console.log('error ' , name)
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



  const isSelected = (obj) => selected.some((x) => obj.driverId === x.driverId);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer style={{height : 300}}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={ 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={txns.length}
            />
            <TableBody>
              {txns
                .map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.driverId}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell align="center" component="th" id={labelId} scope="row" padding="none">
                        {row.dateLastUpdated || row.dateCreated}
                      </TableCell>
                      <TableCell align="center">{row.driverId}</TableCell>
                      <TableCell align="center">{row.firstName}</TableCell>
                      <TableCell align="center">{row.lastName}</TableCell>
                      <TableCell align="center">{Number(row.total).toFixed(2)}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box m={1} p={1} style={{display: 'flex' , justifyContent: 'space-evenly'}}>
            <div>
                <Button variant="contained" color="primary">Save</Button>
            </div>
            <div>
                <Button variant="contained" onClick={handleSelectedAsReviewed} disabled={selected.length > 0 ? false : true} color="primary">Mark Selected as Reviewed</Button>
            </div>
            <div>
                <Button variant="contained" onClick={handleAllAsReviewed} color="primary">Mark ALL as Reviewed</Button>
            </div>
            <div>
                <Button variant="contained" onClick={() => setOpen(!open)} color="primary">Upload CSV</Button>
            </div>
            <div>
                <Button variant="contained" onClick={handleDeleted} disabled={selected.length > 0 ? false : true} color="primary">DELETE selected</Button>
            </div>
        </Box>
        <Modal
          open={open}
          closeHandler={() => setOpen(false)}
          maxWidth="sm"
          header="Upload CSV"
          aria-labelledby="upload-modal-title"
          aria-describedby="upload-modal-description"
        >
          <UploadFile />
        </Modal>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </div>
  );
}