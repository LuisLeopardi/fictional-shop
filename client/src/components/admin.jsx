import React, {useState} from 'react';
import {Form, Button, Alert, Spinner} from 'react-bootstrap';
import axios from 'axios';

const Admin = ({history}) => {

    const [loadingStatus, setStatus] = useState(false);
    const [username, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setErrror] = useState(null);

    const postData = e => {

        e.preventDefault();

        setStatus(true)

        if (!password || !username) return (setStatus(false), setErrror('please fill all fields'));

        setErrror(null);

        axios.post('https://fictional-shop.herokuapp.com/admin',{username,password},{withCredentials:true})
        .then(res=>{
            if (res.data.token) {
                history.push('/admin/edit')
            }    
        })
        .catch(err=>{
            const {content} = err.response.data;
            if (content) {
                setErrror(content)
            } else {
                setErrror('error')
            } 
            setStatus(false);    
        })
    }

    useState(()=>{
        axios.post('https://fictional-shop.herokuapp.com/getAuth', {auth:true}, {withCredentials:true})
        .then(res=>{
            if (res.status === 204) return;
            history.push('/admin/edit')
        })
        .catch(err=> {
            console.log(err)
        })
    },[])

    return (
    <Form className='loginForm'>
        {
            error && <Alert variant='danger'> {error} </Alert>   
        }
        <Form.Group controlId="formBasicEmail">
            <Form.Label>User</Form.Label>
            <Form.Control onChange={e=>setName(e.target.value)} type="text" placeholder="admin" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={e=>setPassword(e.target.value)} type="password" placeholder="123" />
        </Form.Group>

        <span className='buttonWrap'>
            <Button variant="secondary" onClick={()=>history.push('/')}>
                Home
            </Button>

            <Button variant="primary" type="submit" onClick={postData}>
                {
                    loadingStatus ?
                    <Spinner variant="light" animation="grow">
                        <span className="sr-only">Loading...</span>
                    </Spinner>  
                    :
                    'Login'
                }
            </Button>
        </span>    

        
    </Form>
    )
}

export default Admin;
