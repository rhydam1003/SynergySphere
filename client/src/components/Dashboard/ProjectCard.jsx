import {
  UsersIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 task-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {project.name}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <UsersIcon className="h-4 w-4" />
          <span>{project.members?.length || 0} members</span>
        </div>
        <div className="flex items-center gap-1">
          <ClipboardDocumentListIcon className="h-4 w-4" />
          <span>{project.taskCount || 0} tasks</span>
        </div>
      </div>
    </div>
  );
}
