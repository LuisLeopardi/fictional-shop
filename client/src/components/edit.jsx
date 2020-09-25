import React, {useState, useEffect, useRef} from 'react';
import {Alert} from 'react-bootstrap';
import SubmitItem from './submitItem';
import AddAdmin from './addAdmin';
import Modify from './modify';
import AdminIconWrap from './adminIconWrap';
import axios from 'axios';
import previewHandler from './adminhelpers';

const Edit = ({history}) => {

    const canvasRef = useRef(null);
    const [uploadStatus, setStatus] = useState(false);
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null)
    const [msg, setMsg] = useState(null);
    const [auth, setAuth] = useState(null);
    const [{selected, render}, setSelected] = useState({selected:'Battery', render:'uploadForm'});
    const [{model,description,price,stock},setValues] = useState(false);
    const [{username,password}, setCredentials] = useState(false);

    const uploadForm = () => {
        if (!file) return setMsg({type:'bad', content:'no image provided'});
        if (!model || !description || !price || !stock) return setMsg({type:'bad', content:'fill the form please'});
        if (isNaN(price) || isNaN(stock)) return setMsg({type:'bad', content:'stock and price fields must be numbers'});
        setMsg(null);
        setStatus(true);
        const fileData = new FormData();
        fileData.append('file', image);
        fileData.append('model', model);
        fileData.append('description', description);
        fileData.append('price', Number(price));
        fileData.append('stock', Number(stock));
        fileData.append('selected', selected);
        axios.post('http://localhost:5000/upload', fileData, {withCredentials:true})
        .then(res=>{
            setMsg({type:res.data.type, content:res.data.content});
        })
        .catch(()=>{
            setMsg({type:'bad', content:'error'});
        })
        .finally(()=>setStatus(false));
    }

    const addNewUser = () => {
        setStatus(true);
        axios.post('http://localhost:5000/newAdmin', {username,password}, {withCredentials:true})
        .then(res=>setMsg(res.data))
        .catch(err=>{
            const {data} = err.response;
            if (data) {
                setMsg(data)
            } else {
                setMsg('error')
            }
            console.log(err)
        })
        .finally(()=>setStatus(false));
    }

    const handleValues = (e, value) => {
        setValues(prevState=>({
             ...prevState,
            [e]:value
        }))
    }

    const handleCredentials = e => {
        const {name, value} = e.target;
        setCredentials(prevState=>({
            ...prevState,
            [name]:value
        }))
    }

    const logOut = () => {
        axios.get('http://localhost:5000/logout', {withCredentials:true})
        .catch(err=>console.log(err))
        .finally(()=>{
            document.cookie = 'adminSession' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
            history.push('/admin')
        })
    }

    useEffect(() => {
        previewHandler(file, setImage, canvasRef)
    },[file]);

    useState(()=>{
        if (auth) return;
        axios.post('http://localhost:5000/getAuth', {check:true}, {withCredentials:true})
        .then(()=>{
            setAuth(true)
        })
        .catch(err=> {
            if (err.response.status === 403) return history.push('/');
            console.log(err)
        })
    },[])

    return !auth? null : (
        <>
            <AdminIconWrap 
                selected={selected} 
                setSelected={setSelected}
                logOut={logOut}
                setMsg={setMsg}
            />

            <main className='edit'>
        
                <h1> {selected} </h1>

                {
                    msg &&
                    <Alert
                        style={{width:'100%'}}
                        variant = {
                            msg.type === 'good'?
                            'success'
                            :
                            'danger'
                        }>
                        {msg.content}
                    </Alert>
                }
                {
                    render === 'uploadForm' ?
                        <SubmitItem 
                            canvasRef={canvasRef}
                            uploadForm={uploadForm}
                            handleValues={handleValues}
                            uploadFormMod={false}
                            setFile={setFile}
                            uploadStatus={uploadStatus}
                        />
                    : render === 'uploadAdmin' ?
                        <AddAdmin 
                            handleCredentials={handleCredentials} 
                            addNewUser={addNewUser}
                            uploadStatus={uploadStatus}
                        />
                    : render === 'editList' ?
                        <Modify
                            uploadForm={uploadForm}
                            setFile={setFile}
                            canvasRef={canvasRef}
                        />
                    : null
                }         
            </main>
            
        </>
    )
}

export default Edit;