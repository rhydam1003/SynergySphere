import { useState } from "react";
import Button from "../Common/Button";
import { useProjectStore } from "../../store/useProjectStore";

export default function ProjectHeaderActions({ project }) {
  const { updateProject, deleteProject } = useProjectStore();
  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    setLoading(true);
    try {
      await updateProject(project._id, { name, description });
      setEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    if (!confirm("Delete this project?")) return;
    await deleteProject(project._id);
  };

  return (
    <div className="flex items-center gap-2">
      {editing ? (
        <div className="flex items-center gap-2">
          <input
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm w-80"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <Button size="sm" onClick={onSave} loading={loading}>
            Save
          </Button>
          <Button size="sm" variant="outline" onClick={() => setEditing(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
            Edit
          </Button>
          <Button size="sm" variant="danger" onClick={onDelete}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
