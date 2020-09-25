import React from 'react';
import {Button, InputGroup, FormControl, Spinner} from 'react-bootstrap';
const input = ['model', 'description', 'price', 'stock'];

const SubmitItem = ({canvasRef, handleValues, uploadForm, setFile, uploadFormMod, uploadStatus}) => {
    return (
        <>
            <div className='uploadImageWrap'>
                <form encType="multipart/form-data">
                    <input className='uploadInput' type="file" onChange={e=>setFile(e.target.files[0])}/>
                </form>
                <div className='canvasWrap'>
                    <canvas ref={canvasRef}></canvas>
                </div>
            </div> 
            <span className='inputWrap'>
                {
                input.map(e=>
                    <InputGroup onChange={input=>handleValues(e,input.target.value)} key={e}>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">{e}</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                )}
                <Button variant='secondary' onClick={
                    uploadFormMod?
                        uploadFormMod
                    :
                        uploadForm
                    }> 
                   { 
                    uploadStatus ?
                        <Spinner variant="light" animation="grow">
                            <span className="sr-only">Loading...</span>
                        </Spinner>  
                        :
                        'Upload'
                   }
                </Button>
            </span>
        </>
    )  
}

export default SubmitItem;