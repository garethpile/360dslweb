import React, { useEffect, useState } from "react"
import Container from '@material-ui/core/Container';
import {Paper , Tabs , Tab} from "@material-ui/core";
import TabPanel from "../Components/TabPanel"
import UberTransaction from "../Pages/UberTransaction"
import ReviewedTransactions from "./ReviewedTransaction";
import PaymentInstructions from "./PaymentInstruction";
import UberDriver from "./UberDrivers";
import UploadFile from "./Upload";
import AdmissonofDebt from "./AdmissonOfDebt";

function LandingPage(props){
  const [value, setValue] = React.useState(0);
//   const [user , setUser] = useState({})
  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  


  useEffect(() => {
    
  }, [])
    return(
        <Container style={{marginTop : "20px"}} component="main">
            <Paper square>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="disabled tabs example"
                >
                    <Tab label="Uber Transactions" {...a11yProps(0)} />
                    <Tab label="Reviewed Transactions" {...a11yProps(1)}/>
                    <Tab label="Payment Instructions" {...a11yProps(2)}/>
                    <Tab label="Uber Drivers" {...a11yProps(3)}/>
                    <Tab label="AOD" {...a11yProps(4)}/>
                    {/* <Tab label="Upload CSV" {...a11yProps(4)}/> */}
                </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
                <UberTransaction />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ReviewedTransactions />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <PaymentInstructions />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <UberDriver />
            </TabPanel>
            <TabPanel value={value} index={4}>
               <AdmissonofDebt />
            </TabPanel>
            {/* <TabPanel value={value} index={4}>
                <UploadFile />
            </TabPanel> */}
        </Container>
    )
}


export default LandingPage
