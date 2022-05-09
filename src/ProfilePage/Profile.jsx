import React, { useState } from "react";
import { TextField, Select, Card, MenuItem, Button, Grid, FormControlLabel, InputLabel, FormControl, Autocomplete, Checkbox } from "@mui/material";
import CountryList from "./ContryList"
import "./Profile.css";
import { Box } from "@mui/system";
import { createCustomer360DSL, getCustomerByID } from "../Apollo/queries";



const Profile = ({redirect}) => {
    const [user, setUser] = useState({
        FirstName: "",
        LastName: "",
        EmailAddress: "",
        gender: "",
        MobileNumber: "",
        DateOfBirth: "",
        SaturdayTrain: true,
        SundaydayTrain: true,
        MondayTrain: true,
        TuesdayTrain: true,
        WednesdayTrain: true,
        ThursdayTrain: true,
        FridayTrain: true,
        SaturdayTrainHours: 1,
        SundaydayTrainHours: 1,
        MondayTrainHours: 1,
        TuesdayTrainHours: 1,
        WednesdayTrainHours: 1,
        ThursdayTrainHours: 1,
        FridayTrainHours: 1,
    });
    const handleChange = (e) => {
        console.log(e)
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const handleCheckBox = (e) => {
        setUser({ ...user, [e.target.name]: e.target.checked });
    }
    const saveUser = () => {
        // const {} = user;
        if (Object.keys(user).every(key => user[key] !== "")) {
            console.log(user)
        }
        else {
            alert(`Please fill all the fields`)
        }
    }
    return (
        <div className="ProfileMainDiv">
            {/* <Paper> */}
            <Card sx={{padding : "20px"}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12} md={12} sm={12}>
                        <Box textAlign="center">
                            <h1>Personal Details</h1>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={3} md={3} sm={6}>
                        <TextField name="FirstName" label="First Name" onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12} lg={3} md={3} sm={6}>
                        <TextField name="LastName" label="Last Name" onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12} lg={3} md={3} sm={6}>
                        <TextField name="EmailAddress" label="Email Address" onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12} lg={3} md={3} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="genderLabel">Select Gender</InputLabel>
                            <Select
                                labelId="genderLabel"
                                id="gender"
                                name="gender"
                                value={user.gender}
                                label="Gender"
                                fullWidth
                                onChange={handleChange}
                            >
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={3} md={3} sm={6}>
                        <TextField type="number" defaultValue={1} name="MobileNumber" label="Mobile Number" onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12} lg={3} md={3} sm={6}>
                        <TextField name="DateOfBirth" type="date" label="Date Of Birth" onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12} lg={3} md={3} sm={6}>
                        <Autocomplete
                            disablePortal
                            id="country"
                            getOptionLabel={(option) => option.name}
                            options={CountryList}
                            fullWidth
                            value={user.Country}
                            componentName="Country"
                            name="Country"
                            onChange={(a, b) => setUser({ ...user, "Country": b.name })}
                            renderInput={(params) => <TextField {...params} label="Select Country" />}
                        />
                    </Grid>
                </Grid>
            </Card>
            <Card sx={{padding : "20px" , marginTop : "10px"}}>
            <Grid container spacing={2}>
                <Grid xs={12} lg={3} md={3} sm={6} />
                <Grid xs={12} lg={12} md={12} sm={12}>
                    <Box textAlign="center" my={2}>
                        <h1>TrainingDays</h1>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                    <FormControlLabel control={<Checkbox name="FridayTrain" defaultChecked checked={user.FridayTrain} onChange={handleCheckBox} />} label="FridayTrain" />
                    <br />
                    <TextField type="number" defaultValue={1} name="FridayTrainHours" label="Friday Train Hours" onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                    <FormControlLabel control={<Checkbox name="SaturdayTrain" defaultChecked checked={user.SaturdayTrain} onChange={handleCheckBox} />} label="SaturdayTrain" />
                    <br />
                    <TextField type="number" defaultValue={1} name="SaturdayTrainHours" label="Saturday Train Hours" onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                    <FormControlLabel control={<Checkbox name="SundayTrain" defaultChecked checked={user.SundayTrain} onChange={handleCheckBox} />} label="SundayTrain" />
                    <br />
                    <TextField type="number" defaultValue={1} name="SundayTrainHours" label="Sunday Train Hours" onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                    <FormControlLabel control={<Checkbox name="MondayTrain" defaultChecked checked={user.MondayTrain} onChange={handleCheckBox} />} label="MondayTrain" />
                    <br />
                    <TextField type="number" defaultValue={1} name="MondayTrainHours" label="Monday Train Hours" onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                    <FormControlLabel control={<Checkbox onChange={handleCheckBox} defaultChecked checked={user.TuesdayTrain} name="TuesdayTrain" />} label="TuesdayTrain" />
                    <br />
                    <TextField type="number" defaultValue={1} name="TuesdayTrainHours" label="Tuesday Train Hours" onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                    <FormControlLabel control={<Checkbox name="WednesdayTrain" defaultChecked checked={user.WednesdayTrain} onChange={handleCheckBox} />} label="WednesdayTrain" />
                    <br />
                    <TextField type="number" defaultValue={1} name="WednesdayTrainHours" label="Wednesday Train Hours" onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                    <FormControlLabel control={<Checkbox name="ThursdayTrain" defaultChecked checked={user.ThursdayTrain} onChange={handleCheckBox} />} label="ThursdayTrain" />
                    <br />
                    <TextField type="number" defaultValue={1} name="ThursdayTrainHours" label="Thursday Train Hours" onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                    <Box textAlign="center">
                        <Button variant="outlined" onClick={saveUser} color="primary">Save</Button>
                    </Box>
                </Grid>
            </Grid>
            </Card>
            {/* </Paper> */}
        </div>)
}


export default Profile;