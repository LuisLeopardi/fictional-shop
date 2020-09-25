import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Card, Spinner, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import queryString from 'query-string';

const Search = ({history, searchQuery, collection}) => {

    const [isLoading, setLoadingStatus] = useState(true);
    const [error, setError] = useState(null)
    const [data,setData] = useState(null);

    useEffect(()=>{
        setLoadingStatus(true)
        const parsed = queryString.parse(window.location.search);
        const {query, collection} = parsed;
        if(!query || !collection) return history.push('/');
        axios.post('https://fictional-shop.herokuapp.com/search',{query:query, collection:collection.toLowerCase()})
        .then(res=>{
            setLoadingStatus(false);
            if (res.data.result.length === 0) {
                setData(null)
                setError({type:'noMatch',content:`no match for: "${query}"`});
            } else {
                setError(null)
                setData(res.data.result);
            }
        })
        .catch(e=>{
            console.log(e);
            setLoadingStatus(false);
            setError({type:'bad',content:`Sorry, an error has ocurred, try again later`});
        })
    },[searchQuery, collection])

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

                <article key={e._id}>
                    <Card>
                        <Card.Img variant="top" src={`data:image/jpeg;base64,${ transformIntoImage(e.image) }`} alt={e.model}/>
                            <Card.Body>
                                <Card.Title>{e.model}</Card.Title>
                                <Card.Text>
                                   ${e.price} 
                                </Card.Text>
                            <Button variant="primary"> 
                                <Link 
                                    to={`/item?id=${e._id}&db=${e.is}`}
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

export default Search;