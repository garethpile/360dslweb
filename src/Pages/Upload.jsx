import React, { useState } from "react"
import Container from '@material-ui/core/Container';
import { Box, Button } from "@material-ui/core";
import CSVReader from 'react-csv-reader'
import "./Upload.css"
import axios from "axios";


const UploadFile = () => {
    const [file , setFile] = useState("SelectFile");
    const [txns , setTxns] = useState([]);
    // const [data , setData] = useState([{
    //     "driverId": "ecc4ddd5-5f5a-42e6-bb9b-2ee574946241",
    //     "firstName": "Themba",
    //     "lastName": "Ngobene",
    //     "trips": "12",
    //     "fare": "558",
    //     "waitTime": "5",
    //     "tip": "tip",
    //     "toll": "toll",
    //     "uberFee": "uberFee",
    //     "cashCollection": "-82",
    //     "cancellation": "",
    //     "questPromotion": "",
    //     "payouts": "5000",
    //     "total":"3090.75"
    // }]);
    const handleForce = (data, fileInfo) => {
        console.log("data " , data)
        const mapData = data.map(txnObj => {
            return {
                "driverId": txnObj?.driver_uuid,
                "firstName": txnObj?.driver_first_name,
                "lastName": txnObj?.driver_surname,
                "payouts": txnObj?.payouts || 0,
                "payouts__cash_collected": txnObj.payouts___cash_collected || 0,
                "payouts__transferred_to_bank_account": txnObj.payouts___transferred_to_bank_account || 0,
                "refunds__expenses": txnObj?.refunds___expenses || 0,
                "refunds___expenses_refunds_cleaning_and_repairs": txnObj?.refunds___expenses_refunds_cleaning_and_repairs || 0,
                "refunds___expenses_refunds_toll": txnObj?.refunds___expenses_refunds_toll || 0,
                "refunds___expenses_expenses_non_trip_balance__misc__": txnObj?.refunds___expenses_expenses_non_trip_balance__misc__,
                "total_earnings": txnObj?.total_earnings || 0,
                "total_earnings___net_fare": txnObj?.total_earnings___net_fare || 0,
                "total_earnings_promotions": txnObj?.total_earnings_promotions || 0,
                "total_earnings_tip": txnObj?.total_earnings_tip || 0
                // "trips": txnObj?.trips,
                // "fare": txnObj?.total_earnings___net_fare,
                // "waitTime":txnObj?.wait_time,
                // "tip": txnObj?.total_earnings_tip,
                // "toll": txnObj?.refunds___expenses_refunds_toll,
                // "uberFee": txnObj?.uber_fee,
                // "payouts__cash_collected": txnObj?.payouts___cash_collected,
                // "payouts__transferred_to_transferred_to_bank_account" : txnObj.payouts___transferred_to_bank_account || 0,
                // "cancellation": txnObj?.cancellation,
                // "questPromotion": txnObj?.total_earnings_promotions || null,
                // "payouts": txnObj?.payouts,
                // "total": txnObj?.total_earnings
            }
        })
        setTxns(mapData);
        console.log("mapData " , mapData)
        setFile(fileInfo)
    };
    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    };
    const uploadFile = async () => {
       const fileResponse = await axios.post(process.env.REACT_APP_CSV_URL , {fileName : file.name||"",transactions : txns})
       console.log(fileResponse)
       if(fileResponse.status === 200){
           alert("File Uploaded Succesfully");
       }else {
           alert("File not uploaded");
       }
    }
    return (
    <Container style={{marginTop : "20px"}} component="main">
        {txns.length > 0  ? <Box textAlign="center" mt={2}>
            <h3>File Name : {file.name}</h3>
            <h3>Total Transaction : {txns.length}</h3>
            <Button onClick={uploadFile} variant="contained" color="primary">
                Upload File
            </Button>
            {/* <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Driver ID</TableCell>
                        <TableCell>FirstName</TableCell>
                        <TableCell>LastName</TableCell>
                        <TableCell>Trips</TableCell>
                        <TableCell>Payouts</TableCell>
                        <TableCell>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {txns.map(txn => (
                    <TableRow>
                        <TableCell>{txn.driverId}</TableCell>
                        <TableCell>{txn.firstName}</TableCell>
                        <TableCell>{txn.lastName}</TableCell>
                        <TableCell>{txn.trips}</TableCell>
                        <TableCell>{txn.payouts}</TableCell>
                        <TableCell>{txn.total}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table> */}
        </Box>
        : <CSVReader 
            label="Select CSV File"
            onFileLoaded={handleForce}
            parserOptions={papaparseOptions}
        />}
    </Container>
    )
}

export default UploadFile