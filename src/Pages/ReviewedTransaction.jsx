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
import { Button, Grid, MenuItem,  TextField ,  Box} from "@material-ui/core";
import Modal from '../Components/Modal';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from "axios";


const headCells = [
  { id: 'date', numeric: false, disablePadding: true, label: 'Date' },
  { id: 'txnID', numeric: true, disablePadding: false, label: 'Transaction ID' },
  { id: 'txnType', numeric: true, disablePadding: false, label: 'Transaction Type' },
  { id: 'desc', numeric: true, disablePadding: false, label: 'Description' },
  { id: 'total', numeric: true, disablePadding: false, label: 'Total' },  
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


const options = ['Option 1', 'Option 2'];


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

export default function ReviewedTransactions() {
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);
  const [drivers, setDrivers] = React.useState([]);
  const [txns, setTxns] = React.useState([]);
  const [editFields ,setEditFields] = React.useState([]);
  const [searchForm, setSearchForm] = React.useState("");
  // const [value, setValue] = React.useState(options[0]);
  const [txnForm, setTxnForm] = React.useState({
        transactionType : "",
        date: "",
        description: "",
        total: ""
  });
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getDrivers()
  }, [])

  const serialize = (obj) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        if(obj[p] && obj[p] !== null){
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      }
    return str.join("&");
  }

  const getTransactions = async () => {
    let transactions = await axios.get(`${process.env.REACT_APP_BASE_URL}/transactions?status=REVIEWED`);
    if(transactions.status === 200 && transactions.data.results){
      setTxns(transactions.data.results);
    }
    console.log(transactions)
  }
  const getDrivers = async () => {
    let getAlldrivers = await axios.get(`${process.env.REACT_APP_BASE_URL}/drivers`);
    if(getAlldrivers.status === 200 && getAlldrivers.data.Items){
      setDrivers(getAlldrivers.data.Items);
    }
    console.log(drivers)
  }
  const handleAllAsReviewed = async () => {
    let driverIDs = txns.map(x => x.driverId);
    driverIDs = [...new Set(driverIDs)];
    let updateObj = driverIDs.map(driverId => {
      return {
        driverId : driverId,
        transactions : txns.filter(x => x.driverId === driverId).map(j => j.transactionId),
        status:"REVIEWED"
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
        transactions : selected.filter(x => x.driverId === driverId).map(j => j.transactionId),
        status:"REVIEWED"
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
    // let driverIDs = selected.map(x => x.driverId);
    // driverIDs = [...new Set(driverIDs)];
    let updateObj = {
        driverId : txns[0].driverId,
        transactions : selected.map(j => {
          return {"transactionId" : j.transactionId}
        })
      }
    console.log(updateObj)
    let response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/transactions` , {
      data: {
        drivers :[updateObj]
      }
    });
    if(response.status === 200){
      setSelected([]);
      handleSearch()
      setEditFields([])
      alert("Selected transactions Delete Successfully")
    }
  };

  const saveChanges = async () => {
    let updateObj = {
      driverId : txns[0].driverId,
      transactions : txns[0].transactions.filter(x => editFields.indexOf(x.transactionId) !== -1).map(j => {
        return {
          "transactionId" : j.transactionId,
          "status": j.status,
          "description":j.description || "Pay",
          "total": Number(j.total) || 0
        }
      }) 
    }
    console.log("updateObj" , updateObj)
    let response = await axios.put(`${process.env.REACT_APP_BASE_URL}/transactions` , {drivers :[updateObj]});
    if(response.status === 200){
      handleSearch()
      setSelected([])
      setEditFields([])
      alert("Selected transactions Updated Successfully")
    }
  }

  const saveTxnHandler = async () => {
    if(Object.keys(txnForm).some(x => txnForm[x] !== "")){
      const sendObj = {driverId : txnForm?.driverId?.driverId , transactions : [{...txnForm}]}
      delete sendObj.transactions[0].driverId
      //  sendObj.transactions[0].questPromotion = ""
      //  sendObj.transactions[0].cancellation = ""
      const createtxn = await axios.post(`${process.env.REACT_APP_BASE_URL}/transactions`, {drivers : [sendObj]});
      if(createtxn.status === 200){
        console.log("Successfully" , createtxn)
        setOpen(false)
        handleSearch()
        setSelected([])
        setEditFields([])
        alert("Succesfully saved transaction")
      }
    }else {
      alert("Please Enter All Fields")
    }
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected([].concat.apply([], txns.map(tx => tx.transactions)));
      return;
    }
    setSelected([]);
  };

  const handleChange = (event) => {
    setSearchForm({...searchForm , [event.target.name] : event.target.value})
  }

  const handleClick = (event, txnObj , driver) => {
    const selectedIndex = selected.findIndex((x) => x.transactionId === txnObj.transactionId);
    console.log('selected' , selectedIndex)
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, txnObj);
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

  const handleSearch = async () => {
    console.log('handleSearch' , searchForm)
    const searchData = await axios.get(`${process.env.REACT_APP_BASE_URL}/search?${serialize(searchForm)}`);
    console.log(searchData , "searac")
    const data = searchData.data.Items
    setTxns(data.length > 0  ?[data[0]]: []);
  }


  const isSelected = (obj) => selected.some((x) => obj.transactionId === x.transactionId);
  return (
    <div className={classes.root}>
        <Modal
            open={open}
            closeHandler={() => setOpen(false)}
            maxWidth="lg"
            header="Add Transaction"
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
            <Grid container spacing={2}>
              <Grid item xs={12}>
              {/* <TextField
                style={{width: '100%'}}
                id="standard-select-driver"
                select
                label="Select Driver"
                value={txnForm.driverId || "SelectDriver" }
                onChange={(e) => setTxnForm({...txnForm , driverId : e.target.value})}
                helperText="Please select Driver"
              >
                <MenuItem disabled value={"SelectDriver"}>Please select driver</MenuItem>
                {drivers.map((option) => (
                  <MenuItem key={option.driverId + Math.random()} value={option.driverId}>
                    {option.firstName || ''}
                    &nbsp;
                    {option.lastName || ''}
                  </MenuItem>
                ))}
              </TextField> */}
              <Autocomplete
                value={txnForm.driverId}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  // setSearchForm({...searchForm , firstName : newValue})
                  setTxnForm({...txnForm , driverId : newValue})
                }}
                // inputValue={drivers}
                // onInputChange={(event, newInputValue) => {
                //   setInputValue(newInputValue);
                // }}
                id="controllable-states-driver-autocomplete"
                options={drivers}
                getOptionLabel={option => (option.firstName + ' ' + option.lastName)}
                // style={{ width: 300 }}
                fullWidth={true}
                renderInput={(params) => <TextField {...params} name="Select Driver" label="Select Driver" />}
              />
              </Grid>
              <Grid item xs={12}>
              <TextField
                style={{width: '100%'}}
                id="standard-select-txntype"
                select
                label="Select Transaction Type"
                value={txnForm.transactionType || "REFUND" }
                onChange={(e) => setTxnForm({...txnForm , transactionType : e.target.value})}
                helperText="Please select Driver"
              >
                <MenuItem disabled value={"SelectDriver"}>Please select Transaction Type</MenuItem>
                  <MenuItem key={"CREDIT"} value={"CREDIT"}>
                    CREDIT
                  </MenuItem>
                  <MenuItem key={"DEBIT"} value={"DEBIT"}>
                    DEBIT
                  </MenuItem>
                  {/* <MenuItem key={"DEDUCTION"} value={"DEDUCTION"}>
                    DEDUCTION
                  </MenuItem> */}
              </TextField>
              </Grid>
              <Grid item xs={4}>
                  <TextField 
                    required 
                    id="standard-required-balance"
                    label="Date"
                    type="date"
                    focused="true"
                    onChange={(e) => setTxnForm({...txnForm , dateCreated : e.target.value})}
                    value={txnForm.date || null}
                  />
              </Grid>
              <Grid item xs={4}>
                  <TextField 
                    required 
                    id="standard-required-balance"
                    label="Reason"
                    type="text"
                    onChange={(e) => setTxnForm({...txnForm , description : e.target.value})}
                    value={txnForm.description || null}
                  />
              </Grid>
              <Grid item xs={4}>
                  <TextField 
                    required 
                    id="standard-required-balance"
                    label="Total"
                    type="number"
                    onChange={(e) => setTxnForm({...txnForm , total : Number(e.target.value)})}
                    value={txnForm.total || null}
                  />
              </Grid>
              {/* <Grid item xs={4}>
                  <TextField 
                    required 
                    id="standard-required-balance"
                    label="Balance"
                    onChange={(e) => setTxnForm({...txnForm , balance : e.target.value})}
                    value={txnForm.balance || null}
                  />
              </Grid>
              <Grid item xs={4}>
                  <TextField 
                    required 
                    id="standard-required-trips"
                    label="Trips"
                    type="number"
                    onChange={(e) => setTxnForm({...txnForm , trips : e.target.value})}
                    value={txnForm.trips || null}
                  />
              </Grid>
              <Grid item xs={4}>
                  <TextField 
                    required 
                    id="standard-required-fare"
                    label="fair"
                    type="number"
                    onChange={(e) => setTxnForm({...txnForm , fare : e.target.value})}
                    value={txnForm.fare || null}
                  />
              </Grid>
              <Grid item xs={4}>
                  <TextField 
                    required 
                    id="standard-required-waitTime"
                    label="Wait Time"
                    onChange={(e) => setTxnForm({...txnForm , waitTime : e.target.value})}
                    value={txnForm.waitTime || null}
                  />
              </Grid>
              <Grid item xs={4}>
                  <TextField 
                    required 
                    id="standard-required-tip"
                    label="Tip"
                    onChange={(e) => setTxnForm({...txnForm , tip : e.target.value})}
                    value={txnForm.tip || null}
                  />
              </Grid>
              <Grid item xs={4}>
                  <TextField 
                    required 
                    id="standard-required-toll"
                    label="Toll"
                    onChange={(e) => setTxnForm({...txnForm , toll : e.target.value})}
                    value={txnForm.toll || null}
                  />
              </Grid>
              <Grid item xs={4}>
                  <TextField 
                    required 
                    id="standard-required-uberFee"
                    label="Uber Fee"
                    onChange={(e) => setTxnForm({...txnForm , uberFee : e.target.value})}
                    value={txnForm.uberFee || null}
                  />
              </Grid>
              <Grid item xs={4}>
                  <TextField 
                    required 
                    id="standard-required-cashCollection"
                    label="Cash Collection"
                    onChange={(e) => setTxnForm({...txnForm , cashCollection : e.target.value})}
                    value={txnForm.cashCollection || null}
                  />
              </Grid>
              <Grid item xs={4}>
                  <TextField 
                    required 
                    id="standard-required-cancellation"
                    label="Cancellation"
                    onChange={(e) => setTxnForm({...txnForm , cancellation : e.target.value})}
                    value={txnForm.cancellation || null}
                  />
              </Grid>
              <Grid item xs={4}>
                  <TextField 
                    required 
                    id="standard-required-questPromotion"
                    label="questPromotion"
                    onChange={(e) => setTxnForm({...txnForm , questPromotion : e.target.value})}
                    value={txnForm.questPromotion || null}
                  />
              </Grid> */}
              <Grid item xs={12}>
                  <Button onClick={saveTxnHandler} variant="contained" color="primary">Save Transaction</Button>
              </Grid>
            </Grid>
            {/* {body} */}
        </Modal>
      <Paper className={classes.paper}>
        {selected.length > 0 &&<EnhancedTableToolbar numSelected={selected.length} />}
        <TableContainer style={{height : 300}}>
        <Box textAlign="center">
          <h4>Please specify search criteria</h4>
        </Box>
        <Grid container style={{ padding: "24px" }} spacing={1}>
	<Grid container item xs={12} sm={12} lg={2} xl={2} spacing={1}>
		<TextField
			id="startDate"
			label="From"
			type="date"
      name="startDate"
      onChange={handleChange}
			InputLabelProps={{
				shrink: true,
			}}
		/>
	</Grid>
	<Grid container item xs={12} lg={2} xl={2} spacing={1}>
		<TextField
			id="endDate"
			label="to"
      onChange={handleChange}
			type="date"
      name="endDate"
			InputLabelProps={{
				shrink: true,
			}}
		/>
	</Grid>
    <Grid container item xs={12} style={{paddingLeft: '20px'}} lg={2} xl={2} spacing={1}>
          <Autocomplete
            value={searchForm.name}
            onChange={(event, newValue) => {
              // setValue(newValue);
              setSearchForm({...searchForm , firstName : newValue})
            }}
            inputValue={searchForm.firstName}
            // onInputChange={(event, newInputValue) => {
            //   setInputValue(newInputValue);
            // }}
            id="controllable-states-firstname"
            options={drivers?.map(driv => driv.firstName)}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} name="firstName" label="first Name" />}
          />
	  </Grid>
    <Grid container item xs={12} style={{paddingLeft: '20px'}} lg={2} xl={2} spacing={1}>
          <Autocomplete
            value={searchForm.lastName}
            onChange={(event, newValue) => {
              // setValue(newValue);
              setSearchForm({...searchForm , lastName : newValue})
            }}
            inputValue={searchForm.lastName}
            // onInputChange={(event, newInputValue) => {
            //   setInputValue(newInputValue);
            // }}
            id="controllable-states-demo"
            options={drivers?.map(driv => driv.lastName)}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} name="lastName" label="Last Name" />}
          />
	  </Grid>
    <Grid container item xs={12} style={{paddingLeft: '20px'}} lg={2} xl={2} spacing={1}>
		<Button variant="contained" onClick={handleSearch} color="primary">Search</Button>
	</Grid>
    <Grid container item xs={12} style={{justifyContent: 'flex-end'}} lg={2} xl={2} spacing={1}>
		<Button onClick={() => setOpen(true)} variant="contained" color="primary">Add Transaction</Button>
	</Grid>
                        
 </Grid>
          {txns.map((txn , driverIndex) => {
            return (
              <>
                <Divider />
                <Grid container style={{paddingLeft: '20px', alignItems: 'center', 'height': "67px"}}>
                      <Grid item xs={2} lg={3} xl={3} spacing={1}><b>First Name</b>: {txn.firstName}</Grid>
                      <Grid item xs={2} lg={3} xl={3} spacing={1}><b>Last Name</b>: {txn.lastName}</Grid>
                      <Grid item xs={2} lg={3} xl={3} spacing={1}><b>Uber ID</b>: {txn.driverId}</Grid>
                      <Grid item xs={2} lg={3} xl={3} spacing={1}><b>Balance</b>: {Number(txn.balance).toFixed(2)}</Grid>
                </Grid>
                <Divider />
              <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={txn?.transactions?.length}
            />
            <TableBody>
              {txn && txn.transactions &&txn.transactions.filter(x => x.status === "REVIEWED")
                .map((row, index) => {
                  const isItemSelected = isSelected(row); 
                  console.log("isItemSelected " , isItemSelected)
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    
                    <TableRow
                      key={row.transactionId}
                      hover
                      // onClick={(event) => handleClick(event, row)}
                      // role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.driverId}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row, txn)}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell align="center" component="th" id={labelId} scope="row" padding="none">
                        {row.dateCreated  || '-'}
                      </TableCell>
                      <TableCell align="center">{row.transactionId}</TableCell>
                      <TableCell align="center">{row.transactionType}</TableCell>
                      <TableCell align="center">
                        <TextField
                            label="Description"
                            name="description"
                            value={row.description}
                              onChange={(e) => {
                                let data = [...txns];
                                data[driverIndex].transactions[index].description = e.target.value;
                                setTxns(data);
                                setEditFields([...editFields , data[driverIndex].transactions[index].transactionId])

                            }}
                        />
                        
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                            label="Total"
                            name="Total"
                            type={row.total}
                            value={Number(row.total).toFixed(2)}
                              onChange={(e) => {
                                let data = [...txns];
                                data[driverIndex].transactions[index].total = e.target.value;
                                setTxns(data);
                                setEditFields([...editFields , data[driverIndex].transactions[index].transactionId])

                            }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          </>
            )
          })}
        </TableContainer>
        <Box m={1} p={1} style={{display: 'flex' , justifyContent: 'space-evenly'}}>
            <div>
                <Button variant="contained" disabled={editFields.length > 0 ? false : true} onClick={saveChanges} color="primary">Save Changes</Button>
            </div>
            <div>
                <Button variant="contained" onClick={handleDeleted} disabled={selected.length > 0 ? false : true} color="primary">DELETE selected</Button>
            </div>
        </Box>
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