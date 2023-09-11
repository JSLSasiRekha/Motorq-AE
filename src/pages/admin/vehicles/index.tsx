import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import styles from './styles.module.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
export default function AdminVehicles() {
    // AddVehicleForm.js
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    vin: '',
    user: "64feb387404c5bf8ddbdc7e6"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const data = await axios.post('http://localhost:6969/api/admin/addVehicleInfo', formData).then(res => res.data).catch(err => console.log(err));
    // Add code to validate and send new vehicle data to the server
  };
  const DashboardHandler=()=>{
    window.location.href="/admin/dashboard"
  }
  const RequestHandler=()=>{
    window.location.href="/admin/requests"
  }
  const SignoutHandler=()=>{
    window.location.href="/login"
  }


  return (
    <>
    <div>
   <Button onClick={DashboardHandler}>
    DashBoards
   </Button>
   <Button onClick={RequestHandler}>
    See Requests
   </Button>
   <Button onClick={SignoutHandler}>
    Signout
   </Button>


  </div>
 <h1>Add Vechiles Form</h1>
 
    <FormControl fullWidth >
    <TextField 
        type="text" 
        label="MAKE" 
        variant="filled" 
        onChange={handleInputChange}
        name='make'
      />
          <TextField 
        type="text" 
        label="MODEL" 
        variant="filled" 
        onChange={handleInputChange}
        name='model'
      />
          <TextField 
        type="text" 
        label="YEAR" 
        variant="filled" 
        onChange={handleInputChange}
        name='year'
      />
          <TextField 
        type="text" 
        label="VIN" 
        variant="filled" 
        onChange={handleInputChange}
        name='vin'
      />
      <Button variant="outlined" onClick={handleSubmit}>Submit</Button>

   
  
   
 
</FormControl>
      
    </>
  );
}
  