import { useState, useEffect } from "react";
import { useTaskStore } from "../../store/useTaskStore";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import { PlusIcon } from "@heroicons/react/24/outline";
import Button from "../Common/Button";

const columns = [
  { id: "todo", title: "To Do", color: "bg-gray-100" },
  { id: "in_progress", title: "In Progress", color: "bg-blue-50" },
  { id: "done", title: "Done", color: "bg-green-50" },
];

export default function TaskBoard({ projectId }) {
  const { tasks, loading, fetchTasks, moveTaskStatus } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks(projectId);
  }, [projectId]);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    await moveTaskStatus(taskId, newStatus);
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => (
          <div key={col.id} className="space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-32 bg-gray-100 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Task Board</h2>
        <Button onClick={() => setIsModalOpen(true)} size="sm">
          <PlusIcon className="h-4 w-4 mr-1" />
          New Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div
            key={column.id}
            className={`${column.color} rounded-xl p-4`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">{column.title}</h3>
              <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full">
                {getTasksByStatus(column.id).length}
              </span>
            </div>

            <div className="space-y-3">
              {getTasksByStatus(column.id).map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDragStart={handleDragStart}
                  onClick={() => handleEditTask(task)}
                />
              ))}

              {getTasksByStatus(column.id).length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No tasks yet
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <TaskModal
        open={isModalOpen}
        onClose={handleCloseModal}
        task={selectedTask}
        projectId={projectId}
      />
    </>
  );
}
