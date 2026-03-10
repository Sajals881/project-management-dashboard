import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

export type TaskStatus = 'todo' | 'inProgress' | 'done';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  projectId: string;
  assigneeId?: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'admin' | 'member';
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  taskIds: string[];
  memberIds: string[];
}

interface ProjectsState {
  projects: Project[];
  tasks: Task[];
  members: TeamMember[];
  selectedProjectId?: string;
}

const initialState: ProjectsState = {
  projects: [
    {
      id: 'p1',
      name: 'Website Redesign',
      description: 'Revamp the marketing site',
      taskIds: ['t1', 't2', 't3'],
      memberIds: ['m1', 'm2'],
    },
  ],
  tasks: [
    {
      id: 't1',
      title: 'Create wireframes',
      status: 'todo',
      projectId: 'p1',
      assigneeId: 'm1',
      description: '<p>Initial UX wireframes for homepage.</p>',
    },
    {
      id: 't2',
      title: 'Implement landing page',
      status: 'inProgress',
      projectId: 'p1',
      assigneeId: 'm2',
      description: '<p>Responsive layout with React.</p>',
    },
    {
      id: 't3',
      title: 'QA and accessibility',
      status: 'done',
      projectId: 'p1',
      assigneeId: 'm1',
      description: '<p>Run Lighthouse and axe checks.</p>',
    },
  ],
  members: [
    { id: 'm1', name: 'Alice', role: 'admin' },
    { id: 'm2', name: 'Bob', role: 'member' },
  ],
  selectedProjectId: 'p1',
};

interface AddProjectPayload {
  name: string;
  description?: string;
}

interface AddTaskPayload {
  projectId: string;
  title: string;
}

interface UpdateTaskPayload {
  id: string;
  changes: Partial<Omit<Task, 'id' | 'projectId'>>;
}

interface MoveTaskPayload {
  taskId: string;
  status: TaskStatus;
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<AddProjectPayload>) => {
      const id = nanoid();
      state.projects.push({
        id,
        name: action.payload.name,
        description: action.payload.description,
        taskIds: [],
        memberIds: [],
      });
    },
    addTask: (state, action: PayloadAction<AddTaskPayload>) => {
      const id = nanoid();
      const project = state.projects.find((p) => p.id === action.payload.projectId);
      if (!project) return;
      state.tasks.push({
        id,
        title: action.payload.title,
        status: 'todo',
        projectId: action.payload.projectId,
        description: '',
      });
      project.taskIds.push(id);
    },
    updateTask: (state, action: PayloadAction<UpdateTaskPayload>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (!task) return;
      Object.assign(task, action.payload.changes);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      const task = state.tasks.find((t) => t.id === taskId);
      if (!task) return;
      const project = state.projects.find((p) => p.id === task.projectId);
      if (project) {
        project.taskIds = project.taskIds.filter((id) => id !== taskId);
      }
      state.tasks = state.tasks.filter((t) => t.id !== taskId);
    },
    moveTask: (state, action: PayloadAction<MoveTaskPayload>) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (!task) return;
      task.status = action.payload.status;
    },
    selectProject: (state, action: PayloadAction<string | undefined>) => {
      state.selectedProjectId = action.payload;
    },
  },
});

export const {
  addProject,
  addTask,
  updateTask,
  deleteTask,
  moveTask,
  selectProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;

