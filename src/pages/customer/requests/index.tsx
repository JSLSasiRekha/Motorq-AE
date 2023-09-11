import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function CustomerRequests() {
  const [givendata, setGivendata] = useState([]);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    vin: '',
    licensePlate: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('api/customer/getMMY');
        setGivendata(response.data);
        console.log(response.data); // Log the fetched data
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const EnrollHandler=()=>{
    window.location.href="/customer/enroll"
  }
  const SignoutHandler=()=>{
    window.location.href="/login"
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add code to validate and send enrollment request to the server
  };

  return (
    <>
      <div>
        <Button onClick={EnrollHandler}>Enrolls</Button>
        <Button onClick={SignoutHandler}>Signout</Button>
        <h1>Customer Requests</h1>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Make</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="make"
            label="Make"
            onChange={handleInputChange}
          >
            
              
              <MenuItem >
                make1
              </MenuItem>
              <MenuItem >
                make2
              </MenuItem>
              <MenuItem >
                make3
              </MenuItem>
           
          </Select>
          </FormControl><FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Model</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="model"
            label="Model"
            onChange={handleInputChange}
          >
              <MenuItem >
                model1
              </MenuItem>
              <MenuItem >
                model2
              </MenuItem>
              <MenuItem >
                model3
              </MenuItem>
           
          </Select>
          </FormControl>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="year"
            label="year"
            onChange={handleInputChange}
          >  
              <MenuItem >
                2006
              </MenuItem>
              <MenuItem >
                2018
              </MenuItem>
              <MenuItem >
                2015
              </MenuItem>
           
          </Select>
        </FormControl>
        <Button variant="outlined" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
}




