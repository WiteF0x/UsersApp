import React from 'react';
import Modal from '@material-ui/core/Modal';
import Dropdown from 'react-dropdown';
import DateTimePicker from 'react-datetime-picker'
import 'react-dropdown/style.css';
import './Projects.css';

const CreateTaskModal = ({ isOpened, create, close, title, description, handleTitle, handleDescription, priority, _priority, assigned, _assigned, usersList, start, _start, end, _end }) => {
  const options = ['Low', 'Medium', 'High'];

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isOpened}
        onClose={close}
      >
        <div style={{ top: `50%`, left: `50%`, transform: `translate(-50%, -50%)` }} className='modalContainer'>
          <text className='modalTitle'>Create a task</text>

          <div className='modalInputContainer'>
            <text className='modalInputLabel'>Task title</text>
            <input value={title} onChange={handleTitle}/>
          </div>

          <div className='modalInputContainer'>
            <text className='modalInputLabel'>Task description</text>
            <textarea className='modalTextArea' value={description} onChange={handleDescription} cols="40" rows="3"></textarea>
          </div>

          <div className='modalInputContainer'>
            <text className='modalInputLabel'>Priority</text>
            <Dropdown options={options} onChange={({ value }) => _priority(value)} value={priority} placeholder="Select an option" />
          </div>

          <div className='modalInputContainer'>
            <text className='modalInputLabel'>Assign to</text>
            <Dropdown options={usersList} onChange={({ value }) => _assigned(value)} value={assigned} placeholder="Select an option" />
          </div>

          <div className='modalInputContainer'>
            <text className='modalInputLabel'>Start</text>
            <DateTimePicker value={start} onChange={(value) => _start(value)} />
          </div>

          <div className='modalInputContainer'>
            <text className='modalInputLabel'>End</text>
            <DateTimePicker value={end} onChange={(value) => _end(value)} />
          </div>

          <button className='modalCreate' onClick={create}>
            <text>Create</text>
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateTaskModal;
