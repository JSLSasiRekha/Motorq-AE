import AdminDashboard from "@pages/admin/dashboard"
import AdminRequests from "@pages/admin/requests"
import AdminVehicles from "@pages/admin/vehicles"
import CustomerEnroll from "@pages/customer/enroll"
import CustomerRequests from "@pages/customer/requests"
import Login from "@pages/login"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <Routes>
          <Route path="/admin/requests" element={<AdminRequests />} />
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
          <Route path="/admin/vehicles" element={<AdminVehicles />} />
          <Route path="/customer/enroll" element={<CustomerEnroll />} />
          <Route path="/customer/requests" element={<CustomerRequests />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
