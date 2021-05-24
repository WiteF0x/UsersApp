import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import AddProjectModal from './AddProjectModal';
import TopPanel from '../TopPanel';
import './Tasks.css';

import { getTasksAction, getProjectsAction, createProjectAction, setCurrentProjectAction } from '../../redux/actions/tasks';
import { getMyProfileAction } from '../../redux/actions/users';

const TasksPage = (props) => {
  const {
    user,
    projects,
    
    getProfile,
    getProjects,
    createProject,
    setCurrentProject,

    history,
  } = props;

  const [isOpen, _isOpen] = useState(false);
  const [title, _title] = useState('');
  const [description, _description] = useState('');

  useEffect(() => {
    getProfile();
    getProjects();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setDefault();
    }
  }, [isOpen]);

  const renderProjects = () => !projects || projects.length === 0
    ? <text className="empty">No projects was found :(</text>
    : <div className='projectsContainerColumn'>
        { projects?.map((item) => (
          <div className='project'>
            <text className='projectTitle'>Project: <text style={{ color: 'white', fontWeight: '700' }}>{ item.title }</text></text>
            <text className='projectTitle'>{ item.description }</text>
            <text className='createdBy'>Created by: <text style={{ color: 'white' }}>{ item.createdBy }</text></text>
            <button onClick={() => open(item)}>
              <text style={{ fontWeight: '600' }}>Open</text>
            </button>
          </div>
          ))}
      </div>

  const addButton = () => (
    <button onClick={() => _isOpen(true)}>
      <text>Create Project</text>
    </button>
  );

  const open = (project) => {
    setCurrentProject(project);
    history.push('/project');
  }

  const handleTitle = (e) => _title(e.target.value);

  const handleDescription = (e) => _description(e.target.value);

  const close = () => _isOpen(false);

  const setDefault = () => {
    _title('');
    _description('');
  };

  const create = () => {
    createProject({ title, description });
    _isOpen(false);
  };

  if (!user) {
    return null;
  };

  return (
    <div style={{ alignItems: 'center', justifyContent: 'center', flex: '1' }}>
      <TopPanel user={user} />
      <AddProjectModal
        title={title}
        description={description}
        isOpen={isOpen}
        handleTitle={handleTitle}
        handleDescription={handleDescription}
        close={close}
        create={create}
      />
      <div className="container">
        { addButton() }
        { renderProjects() }
      </div>
    </div>
  );
}


const mapStateToProps = (state) => ({
  user: state.user.user,
  tasks: state.tasks.tasks,
  projects: state.projects.projects,
});

const mapDispatchToProps = (dispatch) => ({
  getTasks: () => dispatch(getTasksAction()),
  getProjects: () => dispatch(getProjectsAction()),
  getProfile: () => dispatch(getMyProfileAction()),
  createProject: (payload) => dispatch(createProjectAction(payload)),
  setCurrentProject: (payload) => dispatch(setCurrentProjectAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TasksPage));
