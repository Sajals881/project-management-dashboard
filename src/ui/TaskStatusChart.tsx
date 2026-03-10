import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

interface TaskStatusChartProps {
  counts: {
    todo: number;
    inProgress: number;
    done: number;
  };
}

const COLORS = ['#f97316', '#3b82f6', '#22c55e'];

export const TaskStatusChart = ({ counts }: TaskStatusChartProps) => {
  const data = [
    { name: 'To Do', value: counts.todo },
    { name: 'In Progress', value: counts.inProgress },
    { name: 'Done', value: counts.done },
  ];

  const total = counts.todo + counts.inProgress + counts.done;
  if (total === 0) {
    return <p className="chart-empty">No tasks yet.</p>;
  }

  return (
    <div className="status-chart">
      <ResponsiveContainer width={220} height={180}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

