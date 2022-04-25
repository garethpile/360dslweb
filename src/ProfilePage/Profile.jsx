import React, { useState } from "react";
import { TextField, Select, MenuItem , Grid , InputLabel, FormControl , Autocomplete} from "@mui/material";
import CountryList from "./ContryList"
import "./Profile.css";



const Profile = () => {
    const [user, setUser] = useState({});
    const handleChange = (e) => {
        setUser({...user , [e.target.name] : e.target.value });
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
            </Grid>
        {/* </Paper> */}
    </div>)
}


export default Profile;