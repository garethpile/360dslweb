import React, { useState , useEffect } from "react";
import { Button, Grid, MenuItem, Select, TextField , Box, FormControlLabel, Checkbox } from "@material-ui/core";
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '../Components/Modal';
import axios from "axios";



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    textRight: {
      textAlign: 'right',
    },
    height: {
        height : "98%"
    }
  }));


function UberDriver(){
    const classes = useStyles();
    const [drivers , setDrivers] = useState([]);
    const [driver , setDriver] = useState({});
    const [newDriver , setNewDriver] = useState({active:true});
    const [open, setOpen] = React.useState(false);
    const [confirm, setConfirm] = React.useState(false);

    useEffect(() => {
        getDrivers()
    }, [])

    const getDrivers = async () => {
        let driversData = await axios.get(`${process.env.REACT_APP_BASE_URL}/drivers`);
        if(driversData.status === 200 && driversData.data.Items){
          setDrivers(driversData.data.Items);
        }
        console.log(driversData)
    }
    const updateDriver = async () => {
        delete driver["transactions"];
        const updateDriver = await axios.put(`${process.env.REACT_APP_BASE_URL}/drivers/${driver.driverId}` , {...driver})
        if(updateDriver.status === 200 ){
            setDriver({});
            getDrivers()
            alert("Update Driver succesfully")
        }else {
        alert("driver does not update server error")
        }
    }
    const deleteDriver = async () => {
        const deleteDriverRes = await axios.delete(`${process.env.REACT_APP_BASE_URL}/drivers/${driver.driverId}`)
        if(deleteDriverRes.status === 200 ){
            setDriver({});
            getDrivers()
            setConfirm(false);
            alert("Delete Driver succesfully")
        }else {
            alert("driver does not delete server error")
        }
    }
    const addDriver = async () => {
        if(Object.keys(newDriver).length === 10){
            const addDriver = await axios.post(`${process.env.REACT_APP_BASE_URL}/drivers` , {drivers : [{...newDriver , dateCreated : new Date()}]})
            if(addDriver.status === 200 ){
                setNewDriver({});
                getDrivers()
                alert("Add Driver succesfully")
                setOpen(false)
            }else {
            alert("driver does not added server error")
            }
        }else {
            alert("Please enter all fields")
        }
    }
    const driverHandler = (e) => {
        const findDriver = drivers.find(driv => driv.driverId === e.target.value);
        setDriver(findDriver);
    }
    const updateNewDriverFieldHandler =(event) => {
        setNewDriver({...newDriver , [event.target.name] : event.target.value})
    }
    const updateDriverFieldHandler =(event) => {
        setDriver({...driver , [event.target.name] : event.target.value})
    }
    return <div>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <TextField
                    style={{width: '100%'}}
                    id="standard-select-driver"
                    select
                    label="Select Driver"
                    value={driver.driverId || "SelectDriver" }
                    onChange={driverHandler}
                >
                    <MenuItem disabled value={"SelectDriver"}>Please select driver</MenuItem>
                    {drivers.sort((a, b) => a.firstName.localeCompare(b.firstName)).map((option) => (
                    <MenuItem key={option.driverId + Math.random()} value={option.driverId}>
                        {option.firstName || ''}
                        &nbsp;
                        {option.lastName || ''}
                    </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid className={classes.textRight} item xs={6}>
                <Button onClick={() => setOpen(true)} variant="contained">
                    Add Driver
                </Button>
            </Grid>
        </Grid>
        {driver.driverId && <><Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField onChange={updateDriverFieldHandler} disabled variant="outlined" name="driverId"  fullWidth={true} label="Uber ID" value={driver.driverId} />
            </Grid>
            <Grid item xs={6}>
                <TextField onChange={updateDriverFieldHandler} variant="outlined" name="bank" fullWidth={true} name="bank" label="Bank" value={driver.bank} />
            </Grid>
            <Grid item xs={6}>
                <TextField onChange={updateDriverFieldHandler} variant="outlined" name="lastName" fullWidth={true} label="Last Name" value={driver.lastName} />
            </Grid>
            <Grid item xs={6}>
                <TextField onChange={updateDriverFieldHandler} variant="outlined" name="bankBranch" fullWidth={true} label="Bank Branch" value={driver.bankBranch} />
            </Grid>
            <Grid item xs={6}>
                <TextField onChange={updateDriverFieldHandler} variant="outlined" name="firstName" fullWidth={true} label="First Name" value={driver.firstName} />
            </Grid>
            <Grid item xs={6}>
                <TextField onChange={updateDriverFieldHandler} variant="outlined" name="accountNumber" fullWidth={true} label="Bank Account" value={driver.accountNumber} />
            </Grid>
            <Grid item xs={6}>
                <TextField onChange={updateDriverFieldHandler} variant="outlined" name="email" fullWidth={true} label="Email" value={driver.email} />
            </Grid>
            <Grid item xs={6}>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    name="accountType"
                    variant="outlined"
                    className={classes.height}
                    value={driver.accountType}
                    onChange={updateDriverFieldHandler}
                    fullWidth={true}
                >
                    <MenuItem value={2}>Savings</MenuItem>
                    <MenuItem value={1}>Cheque</MenuItem>
                </Select>
                {/* <TextField onChange={updateDriverFieldHandler} variant="outlined" name="accountType" fullWidth={true} label="Account Type" value={driver.accountType} /> */}
            </Grid>
            <Grid item xs={6}>
                <TextField onChange={updateDriverFieldHandler} variant="outlined" name="mobile" fullWidth={true} label="Mobile" value={driver.mobile} />
            </Grid>
            <Grid item xs={6}>
                <TextField onChange={updateDriverFieldHandler} variant="outlined" name="samaritanFee" fullWidth={true} label="Samaritan Fee" value={driver.samaritanFee} />
            </Grid>
            <Grid item xs={6}>
                <FormControlLabel control={<Checkbox name="checkedC" />} label="Send Email Statements" />
            </Grid>
            <Grid item xs={6}>
                <FormControlLabel  control={<Checkbox onChange={(e) => setDriver({...driver , active: e.target.checked})} checked={driver.active} name="checkedD" />} label="Active" />
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Button onClick={updateDriver}  variant="contained" color="secondary">Save</Button>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={() => setConfirm(true)} variant="contained" color="secondary">Delete Driver</Button>
            </Grid>
        </Grid></>}
        {/* Confirm pop up */}
        <Modal
            open={confirm}
            closeHandler={() => setConfirm(false)}
            maxWidth="sm"
            header="Are you sure you want to delete?"
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-description"
        >
            <Box textAlign="center">
                <Button onClick={() => setConfirm(false)}>NO</Button> &nbsp;
                <Button onClick={deleteDriver} variant="contained" color="primary">Yes</Button>
            </Box>
        </Modal>
        {/* Add Driver popup */}
        <Modal
            open={open}
            closeHandler={() => setOpen(false)}
            maxWidth="lg"
            header="Add Driver"
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField onChange={updateNewDriverFieldHandler} variant="outlined" name="driverId"  fullWidth={true} label="Uber ID" value={newDriver.driverId} />
            </Grid>
            <Grid item xs={6}>
                <TextField onChange={updateNewDriverFieldHandler} variant="outlined" name="bank" fullWidth={true} name="bank" label="Bank" value={newDriver.bank} />
            </Grid>
            <Grid item xs={6}>
                <TextField onChange={updateNewDriverFieldHandler} variant="outlined" name="lastName" fullWidth={true} label="Last Name" value={newDriver.lastName} />
            </Grid>
            <Grid item xs={6}>
                <TextField onChange={updateNewDriverFieldHandler} variant="outlined" name="bankBranch" fullWidth={true} label="Bank Branch" value={newDriver.bankBranch} />
            </Grid>
            <Grid item xs={6}>
                <TextField onChange={updateNewDriverFieldHandler} variant="outlined" name="firstName" fullWidth={true} label="First Name" value={newDriver.firstName} />
            </Grid>
            <Grid item xs={6}>
                <TextField onChange={updateNewDriverFieldHandler} variant="outlined" name="accountNumber" fullWidth={true} label="Bank Account" value={newDriver.accountNumber} />
            </Grid>
            <Grid item xs={6}>
                <TextField onChange={updateNewDriverFieldHandler} variant="outlined" name="email" fullWidth={true} label="Email" value={newDriver.email} />
            </Grid>
            <Grid item xs={6}>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    name="accountType"
                    variant="outlined"
                    className={classes.height}
                    value={newDriver.accountType}
                    onChange={updateNewDriverFieldHandler}
                    fullWidth={true}
                >
                    <MenuItem value={2}>Savings</MenuItem>
                    <MenuItem value={1}>Cheque</MenuItem>
                </Select>
                {/* <TextField onChange={updateNewDriverFieldHandler} variant="outlined" name="accountType" fullWidth={true} label="Account Type" value={newDriver.accountType} /> */}
            </Grid>
            <Grid item xs={6}>
                <TextField onChange={updateNewDriverFieldHandler} variant="outlined" name="mobile" fullWidth={true} label="Mobile" value={newDriver.mobile} />
            </Grid>
            <Grid item xs={6}>
                <TextField onChange={updateNewDriverFieldHandler} variant="outlined" name="samaritanFee" fullWidth={true} label="Samaritan Fee" value={newDriver.samaritanFee} />
            </Grid>
            <Grid item xs={6}>
                <FormControlLabel control={<Checkbox name="checkedF" />} label="Send Email Statements" />
            </Grid>
            <Grid item xs={6}>
                <FormControlLabel control={<Checkbox onChange={(e) => setNewDriver({...newDriver , active: e.target.checked})} checked={newDriver.active} name="checkedre" />} label="Active" />
            </Grid>
            <Grid item xs={6}>
                <Button onClick={addDriver} variant="contained">Save</Button>
            </Grid>

        </Grid>
        </Modal>
    </div>
}


export default UberDriver