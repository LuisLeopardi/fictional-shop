import React, {Component} from 'react';
import axios from 'axios';
import {Spinner, Image, Button, Alert} from 'react-bootstrap';
import queryString from 'query-string';

class Item extends Component {
    state = {
        image:null,
        price:null,
        description:null,
        model:null,
        stock:null,
        counter:0
    }
    componentDidMount(){
        const parsed = queryString.parse(window.location.search);
        const {id, db} = parsed;
        axios.post('https://fictional-shop.herokuapp.com/getItem',{id, db})
        .then(data=>{
            const {image, price, description, model} = data.data
            this.setState({image, price, description, model, stock})
        })
        .catch(e=>console.log(e))
    }
    transform = () =>{
        if (this.state.image.data === true) return;
        const image = btoa(
            this.state.image.data.reduce((byn, byte) => byn + String.fromCharCode(byte), '')
        )
        return `data:image/jpeg;base64,${image}` 
    }
    render(){
        const {image, price, description, model, counter} = this.state;
        return (
            image?
            <main className='item'>
                <figure>
                    <Image src={this.transform()} fluid  alt={model}/>  
                </figure>
                <section>
                    <h1>
                        {model}
                    </h1>

                    <h2>
                        ${price}
                    </h2>

                    <p>
                        {description}
                    </p>
                        {stock} in stock
                    <p>

                    </p>   

                    <div className='counter'>
                        <span>
                            {counter}
                        </span>
                        <Button variant="outline-success" 
                            onClick={()=>this.setState({counter:counter+1})}>
                            +
                        </Button>
                        <Button variant="outline-danger" style={
                            counter > 0? {display:'block'} : {display:'none'}
                        }
                            onClick={()=>this.setState({counter:counter-1})}>
                            -
                        </Button>
                    </div>
                    <div className='buyWrap'>
                        <Alert variant='warning'>
                            ${counter * price}
                        </Alert>   
                        <Button variant='warning' className='buy'>Buy</Button>
                    </div>
                             
                </section>
            </main>
            :
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>     
        )
    }
}

export default Item;