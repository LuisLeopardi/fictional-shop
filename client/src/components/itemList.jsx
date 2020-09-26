import {Link} from 'react-router-dom';
import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

class ItemList extends Component {

    checkSize = (text) => {
        const media = matchMedia('(max-width: 600px)');
        if (!media) return;
        if (arrayText.length > 12) {
            const arrayText = text.trim().split(' ');
            arrayText.splice(13,1,'...');
            arrayText.join(" ");
            return arrayText
        } else {
            return;
        }
    }

    transformIntoImage = data => {    
        const image = btoa(
            data.data.reduce((byn, byte) => byn + String.fromCharCode(byte), '')
        )
        return image
    }

    render(){
        const {title, imagesArray, db} = this.props;
        return (
            <section>
                <h2> {title} </h2>
                <div className='articleWrap'>
                    {
                        imagesArray.map( e =>
                            <article key={e.id}>
                                <figure>
                                    <img src={`data:image/jpeg;base64,${ this.transformIntoImage(e.image) }`} alt="item"/>
                                </figure>
                                <div>
                                    <Link to={`/item?id=${e.id}&db=${e.db}`}> {this.checkSize(e.model)} </Link>
                                    <p> ${e.price} </p>  
                                </div>        
                            </article>
                        )
                    }
                    {
                        <Button variant="info">
                            <Link to={`/getAll?db=${db}`}> See All </Link>
                        </Button>
                    }
                </div>           
            </section>
        ) 
    }
}

export default ItemList;