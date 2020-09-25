import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import accessory from '../../src/img/icons/accessory.svg';
import battery from '../../src/img/icons/battery.svg';
import addUser from '../../src/img/icons/addUser.svg';
import edit from '../../src/img/icons/edit.svg';
import logout from '../../src/img/icons/logout.svg';
import phone from '../../src/img/icons/phone.svg';
const imgArray = [
    {img:battery,name:'Battery', render:'uploadForm'},
    {img:accessory,name:'Accessory', render:'uploadForm'},
    {img:phone,name:'Phone', render:'uploadForm'},
    {img:addUser,name:'Add New Admin', render:'uploadAdmin'},
    {img:edit,name:'Modify Items', render:'editList'},
    {img:logout,name:'Logout', render:null}
];

const AdminIconWrap = ({setSelected, selected, logOut, setMsg}) => {

    const handleClick = (e) => {
        setSelected({selected:e.name, render:e.render}) 
        setMsg(null)
    }

    const [modalShow, setShow] = useState(false)

    return (
        <div className='adminIconWrap'>

            <Modal 
                show={modalShow}
                onHide={()=>setShow(false)}
            >

                <Modal.Header>
                    <Modal.Title>Do you want to logout ?</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button variant="secondary" onClick={logOut}>
                        Yes
                    </Button>
                    <Button variant="primary" onClick={()=>setShow(false)}>
                        No
                    </Button>
                </Modal.Footer>

            </Modal>
            {
                imgArray.map(e=>
                    <img 
                        className= {
                            selected === e.name ? 'selected'
                            : null
                        } 
                        src={e.img} 
                        alt={e.name} 
                        key={e.name} 
                        onClick={()=>
                            e.name !== 'Logout' ?
                            handleClick(e)
                            :
                            setShow(true)
                        }
                    />
                )
            }
        </div>
    )
}

export default AdminIconWrap;