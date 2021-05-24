import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createConfirmation } from 'react-confirm';

import { createTaskAction, getTasksAction, deleteTaskAction, setTasksAction, setProjectsAction, deleteProjectAction } from '../../redux/actions/tasks';
import { getMyProfileAction } from '../../redux/actions/users';
import axios from '../../utils/axios';
import moment from 'moment';

import TopPanel from '../TopPanel';
import CreateTaskModal from './CreateTaskModal';
import './Projects.css';

const Project = (props) => {
  const {
    user,
    tasks,
    current,
    history,
    getTasks,
    setTasks,
    getMyProfile,
    createTask,
    deleteTaskAction,
    deleteProjectAction,
    setProjectsAction,
    projects,
  } = props;

  const [isOpened, _isOpened] = useState(false);
  const [title, _title] = useState('');
  const [description, _description] = useState('');
  const [priority, _priority] = useState('Low');
  const [assigned, _assigned] = useState(null);
  const [usersList, _usersList] = useState([]);
  const [start, _start] = useState(new Date());
  const [end, _end] = useState(new Date());

  useEffect(() => {
    getMyProfile();
    if (!current || !current?._id) {
      setTimeout(() => history.goBack());
    }
  }, []);

  useEffect(() => {
    getUser();
    current && current?._id && getTasks({ project: current._id });
  }, []);

  const getUser = async () => {
    const config = (token) => {
      return {
        headers: {
          'auth-token': token
        }
      }
    };

    const token = JSON.parse(localStorage.getItem('token'));
    const { data: users } = await axios.get('/tasks/users', config(token));
    const names = users?.map(_ => `${_.firstName} ${_.lastName}`);
    _usersList(names);
  };

  const deleteTask = (_id) => {
    deleteTaskAction({ _id });
    setTasks(tasks.filter(_ => _._id !== _id));
  };

  const deleteProjectFunction = () => {
    deleteProjectAction({ _id: current._id });
    setProjectsAction(projects?.filter(_ => _._id !== current._id));

    history.goBack();
  };

  const renderTasks = () => !tasks || tasks.length === 0
  ? <text className="empty">No tasks was found :(</text>
  : <div className='projectsContainerColumn'>
      { tasks?.map((_) => (
          <div className='taskContainer'>
            <div className='taskTop'>
              <text className='taskTitle'>{ _.title }</text>
              <button className='deleteTaskButton' onClick={() => deleteTask(_._id)}>
                <text className='deleteX'>x</text>
              </button>
            </div>
            <text className='taskDescription'>{ _.description }</text>
            <text className='taskDescription'>{ _.priority } Priority</text>
            <text className='taskDescription'>Assigned to: { _.assignedTo }</text>
            <text className='taskDescription' style={{ fontSize: 12 }}>Started at: { moment(_.startedAt).format('DD-MM-YYYY HH:MM') }</text>
            <text className='taskDescription' style={{ fontSize: 12 }}>Ended at: { moment(_.endedAt).format('DD-MM-YYYY HH:MM') }</text>
          </div>
        ))}
    </div>


  const handleTitle = (e) => _title(e.target.value);

  const handleDescription = (e) => _description(e.target.value);
  
  const openModal = () => {
    _isOpened(true);
    _title('');
    _description('');
    _priority('Low');
    _assigned(null);
    _start(new Date());
    _end(new Date());
  };

  const close = () => {
    _isOpened(false);
  };

  const create = () => {
    if (
      !title
      || title.trim() === ''
      || !description
      || description.trim() === ''
      || !priority
      || !assigned
      || !start
      || !end
    ) {
      alert('Fill all fields, please!');
    } else {
      createTask({
        title,
        description,
        priority,
        assignedTo: assigned,
        project: current._id,
        startedAt: start,
        endedAt: end,
      });
      _isOpened(false);
    };
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <TopPanel user={user}/>
      <CreateTaskModal
        isOpened={isOpened}
        close={close}
        handleTitle={handleTitle}
        title={title}
        handleDescription={handleDescription}
        description={description}
        create={create}
        priority={priority}
        _priority={_priority}
        assigned={assigned}
        _assigned={_assigned}
        usersList={usersList}
        start={start}
        _start={_start}
        end={end}
        _end={_end}
      />
      <div className='card'>
        <div className='topCard'><text className='title'>{ current.title }</text><text>created by: { current.createdBy }</text></div>
        <text className='description'>{ current.description }</text>
        <button className='delete' onClick={deleteProjectFunction}>
          <text className='deleteLabel'>Delete project</text>
        </button>

        <div className='tasks'>
          <text className='tasksLabel'>Tasks</text>
          <button className='createTask' onClick={openModal}>
            <text className='createTaskLabel'>Create task</text>
          </button>

          { renderTasks() }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  tasks: state.tasks.tasks,
  current: state.current.current,
  projects: state.projects.projects,
});

const mapDispatchToProps = (dispatch) => ({
  setTasks: (payload) => dispatch(setTasksAction(payload)),
  getTasks: (payload) => dispatch(getTasksAction(payload)),
  getMyProfile: () => dispatch(getMyProfileAction()),
  createTask: (payload) => dispatch(createTaskAction(payload)),
  setProjectsAction: (payload) => dispatch(setProjectsAction(payload)),
  deleteTaskAction: (payload) => dispatch(deleteTaskAction(payload)),
  deleteProjectAction: (payload) => dispatch(deleteProjectAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Project));
