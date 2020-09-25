import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Card, Spinner, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import queryString from 'query-string';

const GetAll = ({history}) => {

    const [isLoading, setLoadingStatus] = useState(true);
    const [error, setError] = useState(null)
    const [data,setData] = useState(null);

    useEffect(()=>{
        setLoadingStatus(true)
        const parsed = queryString.parse(window.location.search);
        const {db} = parsed;
        if(!db) return history.push('/');
        axios.post('http://localhost:5000/getAllItemsInCollection',{db})
        .then(res=>{
            setLoadingStatus(false);
            setError(null)
            setData(res.data);
            console.log(res.data[0])
        })
        .catch(e=>{
            console.log(e);
            setLoadingStatus(false);
            setError({type:'bad',content:`Sorry, an error has ocurred, try again later`});
        })
    },[])

    const transformIntoImage = data => {     
        const image = btoa(
            data.data.reduce((byn, byte) => byn + String.fromCharCode(byte), '')
        )
        return image
    }

    return (
        <main className='search'>
            {
                isLoading?
                               
                <Spinner as='span' animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>         
                
                :error?
                <p> {error.content} </p>  

                :data && data.map(e=>

                <article key={e.id}>
                    <Card>
                        <Card.Img variant="top" src={`data:image/jpeg;base64,${ transformIntoImage(e.image) }`} alt={e}/>
                            <Card.Body>
                                <Card.Title>{e.model}</Card.Title>
                                <Card.Text>
                                   ${e.price} 
                                </Card.Text>
                            <Button variant="primary"> 
                                <Link 
                                    to={`/item?id=${e.id}&db=${e.db}`}
                                    style={{color:'#fff'}}
                                >
                                    see more
                                </Link> 
                            </Button>
                        </Card.Body>
                    </Card>
                </article>
                )
            }  
        </main>
    )
    
}

export default GetAll;