const previewHandler = (file, setImage, canvasRef) => {

    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load',()=>{
        const image = new Image();      
        image.onload = () => {

            let width = image.width
            let height = image.height

            if (width > 500) width = 500;
            if (height > 500) height = 500;
            
            const canvas = canvasRef.current;
            canvas.height = height
            canvas.width = width
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(image, 0, 0, width, height);
            canvas.toBlob(blob=>{
                setImage(blob)
            },'image/jpeg')
        }     
        image.src = fileReader.result;       
    })
}

export default previewHandler;