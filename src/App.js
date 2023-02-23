import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Home } from './Home';
import { Notfound } from './Notfound'
import { Phone } from './Phone';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mobiles" element={
          <Protectedroute>
            <Phonelist />
          </Protectedroute>
        } />
        <Route path="*" element={<Notfound />} />
      </Routes>

    </div>
  );
}



function Protectedroute({ children }) {
  const token = localStorage.getItem("token");
  console.log(token);
  return token ? children : <Navigate replace to="/" />;
}

export function checkAuth(data) {
  if (data.status === 401) {
    console.log("Unauthorized")
    throw Error("Unauthorized")
  } else {
    return data.json();
  }
}

export function Logout() {
  localStorage.removeItem('token');
  // navigate('/') or below anyone we can use
  window.location.href = '/';
}



function Phonelist() {
  const [mobiles, setMobiles] = useState([]);

  const getMobiles = () => {
    fetch('http://localhost:4000/mobiles', {
      method: 'GET',
      headers: {
        "x-auth-token": localStorage.getItem("token")

      }
    })
      .then(data => checkAuth(data))
      .then(dt => setMobiles(dt))
      .catch(err => Logout())

  }
  const navigate = useNavigate();
  useEffect(() => getMobiles(), [])


  // const mobiles = [
  //   {
  //     model: "OnePlus 9 5G",
  //     img: "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
  //     company: "Oneplus"
  //   },
  //   {
  //     model: "Iphone 13 mini",
  //     img:
  //       "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
  //     company: "Apple"
  //   },
  //   {
  //     model: "Samsung s21 ultra",
  //     img: "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
  //     company: "Samsung"
  //   },
  //   {
  //     model: "Xiomi mi 11",
  //     img: "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
  //     company: "Xiomi"
  //   }
  // ];

  return (
    <div>
      <button onClick={() => {
        localStorage.removeItem('token');
        localStorage.removeItem('roleid');
        navigate("/");
      }}>Logout</button>
      <div className='phone-list-container' >
        {mobiles.map((mb, index) => <Phone mobile={mb} key={index} getMobiles={getMobiles} />)}
      </div>
    </div>
  )
}

export default App;
