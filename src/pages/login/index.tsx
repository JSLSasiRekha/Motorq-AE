import { Button, TextField } from '@mui/material';
import  { ChangeEvent, useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { UserType } from '@_types/user';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
   email: '',
    password: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
 

  const handleSubmit = async () => {
    console.log("formData",formData);
    const data = await axios.post('http://localhost:6969/api/auth/login', formData).then(res => res.data).catch(err => console.log(err));
    localStorage.setItem('user-login', data);
    if(!data) {
      alert("Login failed");
      setFormData({
        email:  '',
        password: ''
      })
      return
    }
    console.log(data)
    if(data.role === UserType.admin) {
      navigate('/admin/vehicles')
    }
    else if(data.role === UserType.customer) {
      navigate('/customer/enroll')
    }
  };

  return (
    <>
    <div>
      <h1>Login</h1>
      
      <TextField 
        type="text" 
        label="email" 
        variant="filled" 
        onChange={handleInputChange}
        name='email'
      />
       <TextField 
        type="password" 
        label="Password" 
        variant="filled" 
        onChange={handleInputChange}
        name='password'
      />
      
        <div>
        <Button variant="outlined" onClick={() => handleSubmit()}>LogIn</Button>
        </div>
    </div>
    </>
  );
}



