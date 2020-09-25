import React, { Component } from 'react'
import headerImg from '../img/headerImg.jpg';
import ItemList from '../components/itemList';
import {Image, Spinner} from 'react-bootstrap';
import axios from 'axios';

class FrontPage extends Component {

    state = {
        batteries:null,
        accessories:null,
        phones:null
    }

    componentDidMount = () => {
        axios.get('http://localhost:5000/getNewItems')
        .then(res=>{  
            const {batteryData,accessoryData,phoneData} = res.data;
            this.setState({
                batteries: batteryData,
                accessories: accessoryData,
                phones: phoneData
            });
        })
        .catch(err=>console.log(err))
    }

    render(){

        const {batteries, accessories, phones} = this.state;

        const Array = [
            {title:'Batteries', db:'Battery',imagesArray:batteries},
            {title:'Accessories', db:'Phone', imagesArray:accessories},
            {title:'Phones', db:'Accessory', imagesArray:phones}
        ]

        return (
            <main className='frontpage'> 

                <Image src={headerImg} fluid />
                {
                    batteries && accessories && phones ?
                    <>
                        {
                            Array.map(e=>
                                <ItemList 
                                    db={e.db} 
                                    title={e.title} 
                                    imagesArray={e.imagesArray}
                                    key={e.db}
                                />
                            )
                        }
                    </>
                    :
                    <Spinner as='span' animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>  
                }
            </main>
        ) 
    }
}

export default FrontPage;