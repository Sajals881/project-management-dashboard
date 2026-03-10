import { useDrop } from 'react-dnd';
import type { Task, TaskStatus } from '../features/projects/projectsSlice';
import { moveTask } from '../features/projects/projectsSlice';
import { TaskCard } from './TaskCard';
import { useDispatch } from 'react-redux';

interface StatusColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
}

export const StatusColumn = ({ status, title, tasks }: StatusColumnProps) => {
  const dispatch = useDispatch();

  const [{ isOver, canDrop }, drop] = useDrop<{ id: string }, void, { isOver: boolean; canDrop: boolean }>(() => ({
    accept: 'TASK',
    drop: (item: { id: string }) => {
      dispatch(moveTask({ taskId: item.id, status }));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const className = [
    'status-column',
    isOver && canDrop ? 'status-column-droppable' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={drop as unknown as React.Ref<HTMLDivElement>} className={className}>
      <h3>{title}</h3>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

