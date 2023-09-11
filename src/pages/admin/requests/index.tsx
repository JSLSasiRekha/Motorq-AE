import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    mmy: '',
    vin: '',
  });
 
  useEffect(() => {
    const GetData=async ()=>{
        const data = await axios.get('http://localhost:6969/api/admin/getEnrollments').then(res => res.data).catch(err => console.log(err));
        setRequests(data);
        }
    GetData()
    // Fetch and set enrollment requests based on filters
  }, [filters,requests]);
  console.log(requests)

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    // Implement search functionality based on VIN
  };

  const handleAccept = async (requestId) => {
      console.log(requestId);
      
      const enrollemntId={
        enrollmentId:requestId
      }
     await axios.post('http://localhost:6969/api/admin/approveVehicle',enrollemntId).then(res => res.data).catch(err => console.log(err));
    // Implement accept request logic (e.g., make a POST request)
  };

  const handleReject = async (requestId) => {
    const enrollemntId={
        enrollmentId:requestId
      }
     await axios.post('http://localhost:6969/api/admin/rejectVehicle',enrollemntId).then(res => res.data).catch(err => console.log(err));
    // Implement reject request logic (e.g., make a POST request)
  };

  // Mock data for demonstration purposes (replace with actual data)
  const DashboardHandler=()=>{
    window.location.href="/admin/dashboard"
  }
  const SignoutHandler=()=>{
    window.location.href="/login"
  }
  const VehicleHandler=()=>{
    window.location.href="/admin/vehicles"
  }
  return (
    <div>
   
   <Button onClick={DashboardHandler}>
    DashBoards
   </Button>
   <Button onClick={VehicleHandler}>
    Add Vehicle
   </Button>
   <Button onClick={SignoutHandler}>
    Signout
   </Button>

      <h1>Enrollment Requests (Admin)</h1>
      <div>
        <select name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="">All</option>
          {/* Add options for enrollment status */}
        </select>
        <input
          type="text"
          name="mmy"
          value={filters.mmy}
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
      <table>
        <thead>
          <tr>
            
            <th>VIN</th>
            <th>USER</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests?.map((request) => (
            <tr key={request._id}>
            
              <td>{request.vinNumber}</td>
              <td>{request.user}</td>
              <td>{request.status}</td>
              <td>
                {request.status === 'pending' && (
                  <>
                    <button onClick={() =>  handleAccept(request._id)}>Accept</button>
                    <button onClick={() => handleReject(request._id)}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

