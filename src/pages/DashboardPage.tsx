import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { RootState } from '../store';
import { selectProject, addProject, addTask } from '../features/projects/projectsSlice';
import { TaskBoard } from '../ui/TaskBoard';
import { TaskStatusChart } from '../ui/TaskStatusChart';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const tasks = useSelector((state: RootState) => state.projects.tasks);
  const selectedProjectId = useSelector(
    (state: RootState) => state.projects.selectedProjectId,
  );

  const currentProject = useMemo(
    () => projects.find((p) => p.id === selectedProjectId) ?? projects[0],
    [projects, selectedProjectId],
  );

  const projectTasks = useMemo(
    () => tasks.filter((t) => t.projectId === currentProject?.id),
    [tasks, currentProject?.id],
  );

  const taskCounts = useMemo(
    () => ({
      todo: projectTasks.filter((t) => t.status === 'todo').length,
      inProgress: projectTasks.filter((t) => t.status === 'inProgress').length,
      done: projectTasks.filter((t) => t.status === 'done').length,
    }),
    [projectTasks],
  );

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>Projects</h2>
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project.id}>
              <button
                type="button"
                className={
                  currentProject?.id === project.id ? 'project-item active' : 'project-item'
                }
                onClick={() => {
                  dispatch(selectProject(project.id));
                  navigate(`/project/${project.id}`);
                }}
              >
                {project.name}
              </button>
            </li>
          ))}
        </ul>

        <section className="form-section">
          <h3>Add Project</h3>
          <Formik
            initialValues={{ name: '', description: '' }}
            validationSchema={Yup.object({
              name: Yup.string().required('Project name is required'),
            })}
            onSubmit={(values, { resetForm }) => {
              dispatch(addProject(values));
              resetForm();
            }}
          >
            <Form className="form">
              <label>
                Name
                <Field name="name" />
                <ErrorMessage name="name" component="div" className="error" />
              </label>
              <label>
                Description
                <Field as="textarea" name="description" rows={3} />
              </label>
              <button type="submit">Create Project</button>
            </Form>
          </Formik>
        </section>

        {currentProject && (
          <section className="form-section">
            <h3>Add Task</h3>
            <Formik
              initialValues={{ title: '' }}
              validationSchema={Yup.object({
                title: Yup.string().required('Task title is required'),
              })}
              onSubmit={(values, { resetForm }) => {
                dispatch(addTask({ projectId: currentProject.id, title: values.title }));
                resetForm();
              }}
            >
              <Form className="form">
                <label>
                  Title
                  <Field name="title" />
                  <ErrorMessage name="title" component="div" className="error" />
                </label>
                <button type="submit">Add Task</button>
              </Form>
            </Formik>
          </section>
        )}

        <section className="link-section">
          <Link to="/settings">Go to Settings</Link>
        </section>
      </aside>

      <section className="main-content">
        {currentProject ? (
          <>
            <header className="project-header">
              <div>
                <h2>{currentProject.name}</h2>
                {currentProject.description && (
                  <p className="project-description">{currentProject.description}</p>
                )}
              </div>
              <TaskStatusChart counts={taskCounts} />
            </header>

            <TaskBoard tasks={projectTasks} projectId={currentProject.id} />
          </>
        ) : (
          <p>No projects yet. Create one to get started.</p>
        )}
      </section>
    </div>
  );
};

