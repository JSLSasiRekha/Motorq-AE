import {useState} from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import { Button } from '@mui/material';

Chart.register(...registerables);

function AdminDashboard() {
    const [pending,setPending]=useState(0);
    const [accepted,setAccepted]=useState(0);
    const[rejected,setRejected]=useState(0);

    const data = async () => {
        try {
            const response = await axios.get('http://localhost:6969/api/admin/getEnrollments');
            const enrollments = response.data;
    
            let pendingCount = 0;
            let acceptedCount = 0;
            let rejectedCount = 0;
    
            enrollments.forEach(enrollment => {
                if (enrollment.status === "pending") {
                    pendingCount++;
                } else if (enrollment.status === "approved") {
                    acceptedCount++;
                } else if (enrollment.status === "rejected") {
                    rejectedCount++;
                }
            });
    
            // Update state variables with the counts
            setPending(pendingCount);
            setAccepted(acceptedCount);
            setRejected(rejectedCount);
        } catch (error) {
            console.error(error);
        }
    };
    
    // Call the data function to fetch and update counts
    data();
  const customers = [
    { id: 1, name: 'Customer 1', status: 'Pending' },
    { id: 2, name: 'Customer 2', status: 'Approved' },
    { id: 3, name: 'Customer 3', status: 'Pending' },
    { id: 4, name: 'Customer 4', status: 'Rejected' },
    // Add more customer data here
  ];

  const statusCounts = customers.reduce((count, customer) => {
    count[customer.status] = (count[customer.status] || 0) + 1;
    return count;
  }, {});

  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Number of Customers',
        data: Object.values(statusCounts),
        backgroundColor: ['#0000FF', '#008000', '#FF0000'], // Colors for each bar
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        type: 'category',
        labels: Object.keys(statusCounts),
        categoryPercentage: 0.8, // Adjust the bar width as needed
        offset: true, // Place the labels at the center of the bars
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  const RequestHandler=()=>{
    window.location.href="/admin/requests"
  }
  const SignoutHandler=()=>{
    window.location.href="/login"
  }
  const VehicleHandler=()=>{
    window.location.href="/admin/vehicles"
  }

  return (
    <div>
    <Button onClick={RequestHandler}>
    See Requests
   </Button>
   <Button onClick={VehicleHandler}>
    Add Vehicle
   </Button>
   <Button onClick={SignoutHandler}>
    Signout
   </Button>
      <h1>Admin Dashboard</h1>
      <div>
        Count Of Approved Vehicles:{accepted}
      </div>
      <div>
        Count Of Rejected Vehicles:{rejected}
      </div>
      <div>
        Count Of Pending Vehicles:{pending}
      </div>
      <div>
        <h2>Number of Customers by Status</h2>
        <Bar data={chartData} options={options} />
      </div>
      {/* Add other admin-specific content here */}
    </div>
  );
}

export default AdminDashboard;
