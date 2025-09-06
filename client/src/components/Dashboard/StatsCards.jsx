export default function StatsCards({ projects = [] }) {
  const totalProjects = projects.length;
  const totalMembers = projects.reduce(
    (acc, p) => acc + (p.members?.length || 0),
    0
  );
  const totalTasks = projects.reduce((acc, p) => acc + (p.taskCount || 0), 0);

  const cards = [
    { label: "Projects", value: totalProjects },
    { label: "Members", value: totalMembers },
    { label: "Tasks", value: totalTasks },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">{c.label}</p>
          <p className="text-2xl font-semibold text-gray-900">{c.value}</p>
        </div>
      ))}
    </div>
  );
}
