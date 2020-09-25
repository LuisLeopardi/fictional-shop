import React from 'react';
import {Button, InputGroup, FormControl, Spinner} from 'react-bootstrap';

const AddAdmin = ({handleCredentials, addNewUser, uploadStatus}) => {
    return (
        <>
            <InputGroup onChange={e=>handleCredentials(e)}>
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">username</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    name='username'
                />
             </InputGroup>
            <InputGroup  onChange={e=>handleCredentials(e)}>
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">password</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    name='password'
                />
            </InputGroup>
            <Button variant='secondary' onClick={addNewUser}> 
            { 
            uploadStatus ?
                <Spinner variant="light" animation="grow">
                    <span className="sr-only">Loading...</span>
                </Spinner>  
                :
                'Upload'
            }
            </Button>
        </>
    )
}

export default AddAdmin;