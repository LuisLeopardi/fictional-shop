import React, {useState, useEffect} from 'react';
import trash from '../img/icons/trash.svg';
import modify from '../img/icons/modify.svg';
import SubmitItem from './submitItem';
import {Button, Collapse, Alert, Modal} from 'react-bootstrap';
import previewHandler from './adminhelpers';
import axios from 'axios';

const List = ({array, title, setUpdated, canvasRef}) => {

    const [open, setOpen] = useState(false);
    const [showModal, setShow] = useState(false);
    const [{model,description,price,stock}, setValues] = useState(false);
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [msg, setMsg] = useState(null);
    const [{db, id}, setIdAndDb] = useState(false);

    useEffect(() => {
        previewHandler(file, setImage, canvasRef)
    },[file]);

    const handleValues = (e, value) => {
        setValues(prevState=>({
             ...prevState,
            [e]:value
        }))
    }

    const uploadFormMod = () => {
        
        if (price) {
            if (isNaN(price)) return setMsg({type:'bad', content:'price field must be numbers'}); 
        }
        if (stock) {
            if (isNaN(stock)) return setMsg({type:'bad', content:'stock field must be numbers'});
        } 

        setMsg(null);
        const fileData = new FormData();
        
        const arrayOfValues = [
            {
                value:image,
                name:'file'
            }, 
            {
                value:model,
                name:'model'
            }, 
            {
                value:description,
                name:'description'
            }, 
            {
                value:price,
                name:'price'
            }, 
            {
                value:stock,
                name:'stock'
            }
        ];

        arrayOfValues.forEach(e=>{
            if (!e.value) return;
            fileData.append(`${e.name}`, e.value);
        })
        fileData.append('db', db);
        fileData.append('id', id);

        axios.post('http://localhost:5000/modify', fileData, {withCredentials:true})
        .then(()=>{
            setUpdated(true)
        })
        .catch(e=>{
            setMsg({type:'bad', content:'error'})
            console.log(e)
        })
    }

    const handleCloseAndOpen = e => {
        if (e.model === open) {
            setOpen(false) 
            setIdAndDb(false)
        } else {
            setIdAndDb({db:e.db, id:e.id})
            setOpen(e.model)
        }
    }

    const deleteItem = () => {
        axios.post('http://localhost:5000/delete', {id, db}, {withCredentials:true})
        .then(()=>{
            setUpdated(true)
        })
        .catch(e=>{
            setMsg({type:'bad', content:'error'})
            console.log(e)
        })
    }

    const handleModal = e => {
        if (e.model === showModal) {
            setShow(false) 
            setIdAndDb(false)
        } else {
            setIdAndDb({db:e.db, id:e.id})
            setShow(e.model)
        }
    }

    return (
        <>
            <h1> {title} </h1>
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
            array.map(e=>
                <div key={e.id}>
                    <div className='listItem'>
                        <p> {e.model} </p>
                        <p> ${e.price} </p>
                        <Button  variant='light' onClick={()=>handleModal(e)}>
                            <img src={trash} alt="trash"/>
                        </Button>
                        <Button onClick={()=>handleCloseAndOpen(e)} variant='light'>
                            <img src={modify} alt="modify"/>
                        </Button>
                    </div>

                    <Collapse in={open===e.model}>
                        <div>
                            <SubmitItem
                                uploadFormMod={uploadFormMod}
                                canvasRef={canvasRef} 
                                handleValues={handleValues}
                                setFile={setFile}
                            />
                        </div>
                    </Collapse>

                    <Modal show={showModal===e.model} onHide={()=>handleModal(e)}>
                        <Modal.Header>
                            <Modal.Title>Delete Item ?</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={()=>handleModal(e)}>
                            No
                        </Button>
                        <Button variant="primary" onClick={deleteItem}>
                            Yes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
            }
        </>
    )
}

export default List;