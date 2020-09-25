import React, {useState} from 'react';
import {Navbar, Button, DropdownButton, FormControl, InputGroup, Dropdown} from 'react-bootstrap';

const CoolNavbar = ({history, queryHandler}) => {
    
    const [searchQuery, setQuery] = useState(null);
    const [collection, setCollection] = useState('Batteries');
    const [{searchStyle, btnAndTitle}, setStyle] = useState({searchStyle:'none',btnAndTitle:'flex'});

    const search = e => {
        e.preventDefault();
        history.push(`/search?query=${searchQuery}&collection=${collection}`)
        queryHandler(searchQuery, collection)
    }

    return (
        <Navbar bg="light">

            <Navbar.Brand style={{display:btnAndTitle}} href="/">Fictional Shop</Navbar.Brand>

            <InputGroup 
                className={`searchBar ${searchStyle}`} 
                onKeyPress={e=>e.key==='Enter'?search(e):null} 
                onChange={e=>setQuery(e.target.value)}
            >
                <InputGroup.Append>
                <Button 
                    variant="outline-secondary" 
                    onClick={()=>setStyle({searchStyle:'none',btnAndTitle:'block'})}
                    className='back'
                >
                    &#10229;
                </Button>
                </InputGroup.Append>
                <FormControl
                    placeholder="search model..."
                    aria-label="search model"
                    aria-describedby="search bar"
                />
                <DropdownButton
                    className={`dropdownBtn ${searchStyle}`}
                    variant="outline-secondary"
                    alignRight
                    title={collection}
                    id="input-group-dropdown-2"
                    >
                    <Dropdown.Item onClick={()=>setCollection('Batteries')} as="button">Batteries</Dropdown.Item>
                    <Dropdown.Item onClick={()=>setCollection('Accessories')} as="button">Accessories</Dropdown.Item>
                    <Dropdown.Item onClick={()=>setCollection('Phones')} as="button">Phones</Dropdown.Item>
                </DropdownButton>    
                <InputGroup.Append>
                <Button variant="outline-secondary" onClick={e=>search(e)}>
                    &#128269;
                </Button>
                </InputGroup.Append>
            </InputGroup>
            <Button 
                className={`searchBtn ${btnAndTitle}`} 
                variant="light" 
                onClick={()=>setStyle({searchStyle:'flex',btnAndTitle:'none'})}
            >
                &#128269; 
            </Button> 
        </Navbar>  
    )
}

export default CoolNavbar;