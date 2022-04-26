import React, { useState } from "react";
import { TextField, Select, MenuItem , Grid , FormControlLabel, InputLabel, FormControl , Autocomplete, Checkbox} from "@mui/material";
import CountryList from "./ContryList"
import "./Profile.css";
import { Box } from "@mui/system";



const Profile = () => {
    const [user, setUser] = useState({});
    const handleChange = (e) => {
        debugger
        setUser({...user , [e.target.name] :  e.target.value });
    }
    return (
    <div className="ProfileMainDiv">
        {/* <Paper> */}
            <Grid container spacing={2}>
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
                    <TextField type="number" name="MobileNumber" label="Mobile Number" onChange={handleChange} fullWidth />
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
                        renderInput={(params) => <TextField {...params} label="Select Country" />}
                    />
                </Grid>
                <Grid xs={12} lg={3} md={3} sm={6} />
                <Grid xs={12} lg={12} md={12} sm={12}>
                    <Box textAlign="center" my={2}>
                       <h1>TrainingDays</h1> 
                    </Box>
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                    <FormControlLabel control={<Checkbox name="FridayTrain" checked={user.FridayTrain} onChange={handleChange} />}  label="FridayTrain" />
                    <br />
                    <TextField type="number" name="FridayTrainHours" label="Friday Train Hours" onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                    <FormControlLabel control={<Checkbox name="SaturdayTrain" checked={user.SaturdayTrain} onChange={handleChange} />} label="SaturdayTrain" />
                    <br />
                    <TextField type="number" name="SaturdayTrainHours" label="Saturday Train Hours" onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                    <FormControlLabel control={<Checkbox name="SundayTrain" checked={user.SundayTrain}  onChange={handleChange} />} label="SundayTrain" />
                    <br />
                    <TextField type="number" name="SundayTrainHours" label="Sunday Train Hours" onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                    <FormControlLabel control={<Checkbox name="MondayTrain" checked={user.MondayTrain} onChange={handleChange}  />} label="MondayTrain" />
                    <br />
                    <TextField type="number" name="MondayTrainHours" label="Monday Train Hours" onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                    <FormControlLabel control={<Checkbox onChange={handleChange} checked={user.TuesdayTrain}  name="TuesdayTrain" />} label="TuesdayTrain" />
                    <br />
                    <TextField type="number" name="TuesdayTrainHours" label="Tuesday Train Hours" onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                    <FormControlLabel control={<Checkbox name="WednesdayTrain" checked={user.WednesdayTrain}  onChange={handleChange} />} label="WednesdayTrain" />
                    <br />
                    <TextField type="number" name="WednesdayTrainHours" label="Wednesday Train Hours" onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} lg={3} md={3} sm={6}>
                    <FormControlLabel control={<Checkbox name="ThursdayTrain" checked={user.ThursdayTrain === "on" ? true : false} onChange={handleChange} />} label="ThursdayTrain" />
                    <br />
                    <TextField type="number" disabled={!user.ThursdayTrain} name="ThursdayTrainHours" label="Thursday Train Hours" onChange={handleChange} fullWidth />
                </Grid>
            </Grid>
        {/* </Paper> */}
    </div>)
}


export default Profile;