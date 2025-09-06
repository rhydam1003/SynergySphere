import { CalendarIcon, UserIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";

const priorityColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

export default function TaskCard({ task, onDragStart, onClick }) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task._id)}
      onClick={onClick}
      className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer task-card"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 line-clamp-2">{task.title}</h4>
        {task.priority && (
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              priorityColors[task.priority]
            }`}
          >
            {task.priority}
          </span>
        )}
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        {task.assignee && (
          <div className="flex items-center gap-1">
            <UserIcon className="h-3 w-3" />
            <span>{task.assignee.name || "Unassigned"}</span>
          </div>
        )}

        {task.dueDate && (
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-3 w-3" />
            <span>{format(new Date(task.dueDate), "MMM d")}</span>
          </div>
        )}
      </div>
    </div>
  );
}
