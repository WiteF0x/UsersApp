import React from 'react';
import Modal from '@material-ui/core/Modal';

import './Tasks.css';

const AddProjectModal = ({ isOpen, close, title, description, handleTitle, handleDescription, create }) => (
  <div>
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={isOpen}
      onClose={close}
    >
      <div style={{ top: `50%`, left: `50%`, transform: `translate(-50%, -50%)` }} className='modalContainer'>
        <text className='modalTitle'>Create a new project</text>
        <div className='modalInputContainer'>
          <text className='modalInputLabel'>Project`s title</text>
          <input value={title} onChange={handleTitle}/>
        </div>

        <div className='modalInputContainer'>
          <text className='modalInputLabel'>Project`s description</text>
          <textarea className='modalTextArea' value={description} onChange={handleDescription} cols="40" rows="3"></textarea>
        </div>
        <button className='modalCreate' onClick={create}>
          <text>Create</text>
        </button>
      </div>
    </Modal>
  </div>
);

export default AddProjectModal;
