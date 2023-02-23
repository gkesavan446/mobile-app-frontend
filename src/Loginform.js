import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export function Loginform() {

    const navigate = useNavigate();

    const [formstate, setFormstate] = useState("success")


    const { handleChange, values, handleSubmit } = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: async (values) => {
            console.log("Formik values:", values);

            const data = await fetch('http://localhost:4000/login', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json" },
            })
            if (data.status === 400) {
                console.log("🤐, error")
                setFormstate('error')

            } else {
                const result = await data.json()
                console.log(result);
                localStorage.setItem('token', result.token)
                localStorage.setItem('roleid', result.roleid)
                navigate("/mobiles")
            }

        }
    })



    return (
        <form className='login-form-container' onSubmit={handleSubmit}>
            <h2>Login</h2>
            <TextField name='username' label="Username" variant="outlined" onChange={handleChange} value={values.username} />
            <TextField name='password' label="Password" variant="outlined" onChange={handleChange} value={values.password} />
            <Button color={formstate} type="submit" variant="contained">
                {formstate === "success" ? "submit" : "Try Again"}
            </Button>
            <Link to="/">Forget password</Link>
        </form>
    );
}
