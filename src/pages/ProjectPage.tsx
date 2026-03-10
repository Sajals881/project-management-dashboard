import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import type { RootState } from '../store';
import { updateTask } from '../features/projects/projectsSlice';

export const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) =>
    state.projects.projects.find((p) => p.id === id),
  );
  const tasks = useSelector((state: RootState) =>
    state.projects.tasks.filter((t) => t.projectId === id),
  );
  const members = useSelector((state: RootState) => state.projects.members);

  if (!project) {
    return (
      <div className="page">
        <p>Project not found.</p>
        <Link to="/dashboard">Back to dashboard</Link>
      </div>
    );
  }

  return (
    <div className="project-page page">
      <header className="project-header">
        <div>
          <h2>{project.name}</h2>
          {project.description && (
            <p className="project-description">{project.description}</p>
          )}
        </div>
        <Link to="/dashboard">Back to dashboard</Link>
      </header>

      <section className="project-section">
        <h3>Team members</h3>
        <ul className="member-list">
          {project.memberIds.map((memberId) => {
            const member = members.find((m) => m.id === memberId);
            if (!member) return null;
            return (
              <li key={member.id}>
                {member.name} <span className="tag">{member.role}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="project-section">
        <h3>Tasks & descriptions</h3>
        <div className="task-description-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-description-card">
              <h4>{task.title}</h4>
              <ReactQuill
                theme="snow"
                value={task.description}
                onChange={(value) =>
                  dispatch(updateTask({ id: task.id, changes: { description: value } }))
                }
              />
            </div>
          ))}
          {tasks.length === 0 && <p>No tasks yet for this project.</p>}
        </div>
      </section>
    </div>
  );
};

