import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

interface Temp {
    id: number
    timestamp: string
    make: string
    model: string
    year: number
    vin: string
    licensePlate: string
    status: string
}

export default function CustomerEnroll() {
    const TempRequests = [
        {
          "id": 1,
          "timestamp": "2015-05-01T12:00:00.000",
          "make": "make1",
          "model": "model1",
          "year": 2018,
          "vin": "8HgtH41JXMN109186",
          "licensePlate": "ABC123",
          "status": "Pending",
        },
        {
          "id": 2,
          "timestamp": "2021-09-01T12:00:00.000",
          "make": "make2",
          "model": "model2",
          "year": 2001,
          "vin": "2SGBH41JXMN109186",
          "licensePlate": "ABC123",
          "status": "Approved",
        },
        {
          "id": 3,
          "timestamp": "2012-05-01T12:00:00.000",
          "make": "make3",
          "model": "model3",
          "year": 2012,
          "vin": "5KGBH41JXMN109186",
          "licensePlate": "ABC123",
          "status": "Rejected",
        }
      ];

    
      const [sortingOption, setSortingOption] = useState('timestamp');
      const [requests, setRequests] = useState(
        TempRequests
      );
      
      const [filters, setFilters] = useState({
        status: '',
        year: '',
        vin: '',
      });
    
      useEffect(() => {
        axios
          .get('http://localhost:6969/api/admin/getVehicles')
          .then((res) => {
            if (Array.isArray(res.data)) {
              setRequests(res.data);
            } else {
              console.error('API response data is not an array:', res.data);
            }
          })
          .catch((err) => {
            console.error('Error fetching data:', err);
          });
      }, []);
      
      const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
      };
      const handleSortingChange = (e) => {
        setSortingOption(e.target.value);
      };
     
      const RequestHandler=()=>{
        window.location.href="/customer/requests"
      }
      const SignoutHandler=()=>{
        window.location.href="/login"
      }
      const handleSearch = () => {
       
        const filteredData = TempRequests.filter((vehicle) => {
          
          return (
            ((filters.status === 'all') &&
            (vehicle.year == parseInt(filters.year)|| filters.year==='') &&
            (vehicle.vin.includes(filters.vin))|| filters.vin==='')||
            ((filters.status === 'mmy') &&
            (vehicle.year == parseInt(filters.year)))||
            ((filters.status === 'vin') &&
            (vehicle.vin.includes(filters.vin)))
          );
        });
        const sortedData = [...TempRequests];
        if (sortingOption === 'timestamp') {
          sortedData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        } else if (sortingOption === 'vin') {
          sortedData.sort((a, b) => a.vin.localeCompare(b.vin));
        } else if (sortingOption === 'year') {
          sortedData.sort((a, b) => a.year - b.year);
        }
    
        setRequests(sortedData);
      };
      useEffect(() => {
        handleSearch(); 
      }, [filters, sortingOption]);
    return (
        <>
            <div>
            <Button onClick={RequestHandler}>
          
    See Requests
   </Button>
   <Button onClick={SignoutHandler}>Signout</Button>

              <h1>Enrollment Requests</h1>
              <div>
                <select name="status" value={filters.status} onChange={handleFilterChange}>
                  <option value="all">All</option>
                  <option value="mmy">MMY</option>
                  <option value="vin">VIN</option>
                </select>
                <select value={sortingOption} onChange={handleSortingChange}>
                  <option value="timestamp">Sort by Timestamp</option>
                  <option value="vin">Sort by VIN</option>
                  <option value="year">Sort by Year</option>
                </select>
                <input
                  type="text"
                  name="year"
                  value={filters.year}
                  onChange={handleFilterChange}
                  placeholder="Filter by MMY"
                />
                <input
                  type="text"
                  name="vin"
                  value={filters.vin}
                  onChange={handleFilterChange}
                  placeholder="Search by VIN"
                />
                <button onClick={handleSearch}>Search</button>
              </div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Vehicle</th>
                      <th>Enrollment Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((vehicle) => (
                      <tr key={vehicle.id}>
                        <td>{/* Add customer information here */}</td>
                        <td>{`${vehicle.make} ${vehicle.model} ${vehicle.year}`}</td>
                        <td>{vehicle.status}</td>
                        <td>{/* Add actions here */}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            </>
        
    )
}










