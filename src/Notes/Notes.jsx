import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Edit from './Edit';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, deletePost, fetchPost } from '../Redux/sliceNotes';

function Notes() {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()
    const { note = [], loading, error } = useSelector(state => state.notes || {})
    const [fullNote, setFullNote] = useState({
        title: "",
        para: ""
    })
    useEffect(()=>{
        dispatch(fetchPost())
    },[dispatch])

    const handleClose = () => {
        setShow(false);
        setFullNote({ title: "", para: "" });
    };
    const handleShow = () => setShow(true);

    const handleAdd = async () => {
        const {title, para} = fullNote
        if (!title.trim() || !para.trim()) {
            alert("Enter Title and Content")
            return
        }
        dispatch(addPost(fullNote));
        handleClose();
    }
    return (
        <div className='d-flex flex-column justify-content-center align-items-center min-vh-100 px-3 px-md-0' style={{ backgroundColor: '#2b2c2cff' }}>
            <h1 className='text-info mb-4'>Notes App</h1>
            <div className="p-3 p-sm-4 p-md-5 bg-light overflow-auto rounded shadow w-100" style={{ maxWidth: '600px', height: '500px', scrollbarWidth: 'none' }}>
                
                <div className='row g-2'>
                    <div className="col-9 col-sm-10">
                        <button className='btn btn-primary rounded shadow w-100'>Notes</button>
                    </div>
                    <div className="col-3 col-sm-2">
                        <button className='btn btn-danger shadow fw-bolder w-100' onClick={handleShow}>+</button>
                    </div>
                </div>
                <div className='w-100 mt-5'>
                    <div className="row g-3">
                        
                       {
                        note && note.length > 0 ? note.map((items, idx) => {
                            return (
                                <div key={items.id ?? idx} className="col-12 p-3 p-md-4 text-light rounded bg-dark text-white shadow">
                                    <div className='d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2'>
                                        <h5 className='mb-0 text-truncate flex-grow-1'>{items?.title}</h5>
                                        <button onClick={() => dispatch(deletePost(items.id))} className='btn btn-danger btn-sm'><i className="fa-solid fa-trash"></i></button>
                                    </div>
                                    <p className='mt-3 mb-0 text-break'>{items?.para}</p>
                                </div>
                            )
                        }) : <div className='text-center w-100'>
                            <img className='img-fluid' style={{maxWidth: '300px'}} src="https://img.freepik.com/premium-vector/flat-illustration-character-checking-his-missing-notes_67813-29182.jpg?semt=ais_se_enriched&w=740&q=80" alt="No Data" />
                        </div>
                       }
                    </div>
                </div>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Notes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex flex-column gap-3'>
                        <Form.Control value={fullNote.title} onChange={(e) => setFullNote({ ...fullNote, title: e.target.value })} type="text" placeholder="Enter Title" />
                        <Form.Control value={fullNote.para} onChange={(e) => setFullNote({ ...fullNote, para: e.target.value })} as="textarea" rows={3} placeholder="Enter Content" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button onClick={handleAdd} variant="primary">Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Notes