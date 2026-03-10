import React from 'react';
import { useDrag } from 'react-dnd';
import type { Task } from '../features/projects/projectsSlice';
import { useNavigate } from 'react-router-dom';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const navigate = useNavigate();

  const [{ isDragging }, drag] = useDrag<{ id: string }, void, { isDragging: boolean }>(
    () => ({
      type: 'TASK',
      item: { id: task.id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [task.id],
  );

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className="task-card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onDoubleClick={() => navigate(`/project/${task.projectId}`)}
    >
      <h4>{task.title}</h4>
    </div>
  );
};

