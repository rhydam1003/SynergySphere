import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProjectStore } from "../../store/useProjectStore";
import { schemas } from "../../lib/form";
import Modal from "../Common/Modal";
import TextInput from "../Common/TextInput";
import Button from "../Common/Button";

export default function ProjectCreateModal({ open, onClose }) {
  const createProject = useProjectStore((state) => state.createProject);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schemas.project),
  });

  const onSubmit = async (data) => {
    try {
      await createProject(data);
      reset();
      onClose();
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Create New Project">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextInput
          label="Project Name"
          {...register("name")}
          error={errors.name?.message}
          placeholder="Enter project name"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={4}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            placeholder="Enter project description (optional)"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  );
}
