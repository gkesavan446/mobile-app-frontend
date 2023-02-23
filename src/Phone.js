import { API } from "./global.js"
import Button from '@mui/material/Button';
import { checkAuth, Logout } from "./App";

export function Phone({ mobile, getMobiles }) {
    // const mobile = {
    //   "model": "OnePlus 9 5G",
    //   "img": "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
    //   "company": "Oneplus"
    // }
    const roleid = localStorage.getItem('roleid');

    const deleteMobile = (id) => {
        fetch(`${API}/${id}`, {
            method: 'DELETE',
            headers: {
                "x-auth-token": localStorage.getItem("token"),
                roleid: roleid
            }
        })
            .then(data => checkAuth(data))
            .then(dt => getMobiles())
            .catch(err => Logout())

    }

    return (
        <div className='phone-container'>
            <img className='phone-picture' src={mobile.img} alt={mobile.model} />
            <h2 className='phone-name'>{mobile.model}</h2>
            <p className='phone-company'>{mobile.company}</p>
            {roleid === '0' ? <Button onClick={() => deleteMobile(mobile._id)} sx={{ width: "100%" }} color='error' variant="contained">
                Delete
            </Button> : null}
        </div>
    );
}
