import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Spinner} from 'react-bootstrap';
import List from './adminList';

const Modify = ({canvasRef}) => {

    const [{batteries,accessories,phones}, setList] = useState(false);
    const [loadingStatus, setLoading] = useState(true);
    const [updated, setUpdated] = useState (false);


    useEffect(()=>{
        setLoading(true)
        setUpdated(false)
        axios.get('http://localhost:5000/getNewItemsAdmin', {withCredentials:true})
        .then(res=>{
            const {batteryData,accessoryData,phoneData} = res.data;
            setList({
                batteries: batteryData,
                accessories: accessoryData,
                phones: phoneData
            });
            setLoading(false)
        })
        .catch(err=>{
            console.log(err)
        })
    },[updated])

    const Array = [
        {title:'Batteries', data:batteries},
        {title:'Accessories', data:accessories},
        {title:'Phones', data:phones}
    ]

    return (
        <main className='modify'>
            {
                loadingStatus?
                <Spinner animation="border">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                :
                <>
                {
                    Array.map(e=>
                        <List
                            key={e.title}
                            setUpdated={setUpdated} 
                            title={e.title} 
                            array={e.data}
                            canvasRef={canvasRef}
                        />
                    )
                }
                </>
            }
        </main>
    )
}

export default Modify;