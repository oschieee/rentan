import React, {useContext, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import { useSelector } from 'react-redux';
import { data } from 'autoprefixer';

const EditVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  
const [payload, setPayload] = useState({
  Email: '',
  Password: '',
  Username: '',
  Name: '',
  Phone: '+62',
  Address: '',
  Image: '',
  Type: '',
  Year: '',

});

// const { token } = useContext(AuthContext);
const {token} = useSelector((state) => state.Auth.user)
const [data, setData] = useState({})

console.log("token get data", token);


useEffect(() => {
  const fetchData = async () => {
    try {
      console.log(token);
      const response = await axios.get(`https://rentan-be.vercel.app/api/vehicle/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      setData(response.data)
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (token) {
    fetchData();
  }
}, [token]);

console.log("data", data);


const handleChange = (e) => {
  const { value, name } = e.target;
  setPayload({ ...payload, [name]: value });
};


const handleSubmit = (e) => {
  e.preventDefault();
  // Here you would typically handle the login logic, e.g., API call
  console.log(payload);
  navigate('/home');
};

  return (
    <>
    <Navbar/>
    <div className="penyewa-container">
      <div className="penyewa-card">
        <div className='penyewa-kiri'> 
        <h2><span>Data Kendaraan</span></h2>
        <p>Daftarkan Kendaraan Anda</p>
        <div className="input-group">
              <i className="fa fa-envelope"></i>
              <input
                type="text"
                name="Nama Kendaraan"
                placeholder="Nama Kendaraan"
                value={payload.NamaKendaraan}
                required
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <i className="fa fa-envelope"></i>
              <input
                type="text"
                name="Description"
                placeholder="Description"
                value={payload.Description}
                required
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <i className="fa fa-envelope"></i>
              <input
                type="number"
                name="Harga"
                placeholder="Harga"
                value={payload.Description}
                required
                onChange={handleChange}
              />
            </div>
            
            
        </div>
        <div className="penyewa-form">
          <form onSubmit={handleSubmit}>
            <div className="input-image">    
            <select
                name="Tipe"
                className='dropdown-car-type'
                // value={payload.Type}
                required
                onChange={handleChange}
              >
                <option value="default">--pilih jenis--</option>
                <option value="car">Car</option>
                <option value="motor">Motor</option>
                <option value="bus">Bus</option>
              </select>
            </div>
            <div className="input-group">
              <i className="fa fa-lock"></i>
              <input
                type="text"
                name="Tahun Pembuatan"
                placeholder="Tahun Pembuatan"
                value={payload.Year}
                required
                onChange={handleChange}
              />
            </div>
            <div className="input-image">
            <p>Image</p>
              <input
                type="file"
                name="Image"
                placeholder="Image"
                value={payload.Image}
                required
                onChange={handleChange}
              />
            </div>
            

            <div>
            </div>
            <button className="button-penyewa" type="submit" onClick={handleSubmit}>Submit</button>
          </form>
          
        </div>
      </div>
    </div>
    </>
  );
}

export default EditVehicle;
