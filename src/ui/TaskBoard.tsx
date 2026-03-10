import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { Task, TaskStatus } from '../features/projects/projectsSlice';
import { StatusColumn } from './StatusColumn';

interface TaskBoardProps {
  tasks: Task[];
  projectId: string;
}

export const TaskBoard = ({ tasks }: TaskBoardProps) => {
  const columns: { id: TaskStatus; title: string }[] = [
    { id: 'todo', title: 'To Do' },
    { id: 'inProgress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="task-board">
        {columns.map((column) => (
          <StatusColumn
            key={column.id}
            status={column.id}
            title={column.title}
            tasks={tasks.filter((t) => t.status === column.id)}
          />
        ))}
      </div>
    </DndProvider>
  );
};

