import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTaskStore } from "../../store/useTaskStore";
import { useProjectStore } from "../../store/useProjectStore";
import { schemas } from "../../lib/form";
import Modal from "../Common/Modal";
import TextInput from "../Common/TextInput";
import Button from "../Common/Button";

export default function TaskModal({ open, onClose, task, projectId }) {
  const { createTask, updateTask } = useTaskStore();
  const { currentProject } = useProjectStore();
  const isEdit = !!task;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schemas.task),
    defaultValues: task || {
      title: "",
      description: "",
      assignee: "",
      dueDate: "",
      status: "todo",
      priority: "medium",
    },
  });

  useEffect(() => {
    if (task) {
      reset(task);
    } else {
      reset({
        title: "",
        description: "",
        assignee: "",
        dueDate: "",
        status: "todo",
        priority: "medium",
      });
    }
  }, [task, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateTask(task._id, data);
      } else {
        await createTask(projectId, data);
      }
      onClose();
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Task" : "Create New Task"}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextInput
          label="Title"
          {...register("title")}
          error={errors.title?.message}
          placeholder="Enter task title"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={4}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            placeholder="Enter task description (optional)"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assignee
            </label>
            <select
              {...register("assignee")}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">Unassigned</option>
              {currentProject?.members?.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              {...register("dueDate")}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              {...register("status")}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              {...register("priority")}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            {isEdit ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
