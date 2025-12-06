import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function Edit() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div >
            <button onClick={handleShow} className='btn btn-warning me-3'><i className="fa-solid fa-pen-to-square"></i></button>



            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false} centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>Edit Notes</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex flex-column gap-3'>
                        <Form.Control type="text" placeholder="Enter Title" />
                        <Form.Control type="text" placeholder="Enter Content" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Edit