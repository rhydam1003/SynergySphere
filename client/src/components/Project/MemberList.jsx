import { useEffect, useMemo, useState } from "react";
import { useProjectStore } from "../../store/useProjectStore";
import { api } from "../../lib/apiClient";
import Button from "../Common/Button";

export default function MemberList() {
  const { currentProject, addMember, updateMember, removeMember } = useProjectStore();
  const members = currentProject?.members || [];
  const projectId = currentProject?._id;

  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState("member");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/api/users");
        setAllUsers(res.data || []);
      } catch {
        setAllUsers([]);
      }
    };
    fetchUsers();
  }, []);

  const availableUsers = useMemo(() => {
    const memberIds = new Set(members.map((m) => m._id || m.user || m.id));
    return allUsers.filter((u) => !memberIds.has(u._id));
  }, [allUsers, members]);

  const handleAdd = async () => {
    if (!projectId || !selectedUserId) return;
    setLoading(true);
    try {
      await addMember(projectId, selectedUserId, selectedRole);
      setSelectedUserId("");
      setSelectedRole("member");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, role) => {
    if (!projectId || !userId) return;
    await updateMember(projectId, userId, role);
  };

  const handleRemove = async (userId) => {
    if (!projectId || !userId) return;
    await removeMember(projectId, userId);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Members</h3>
        <div className="flex items-center gap-2">
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">Select user</option>
            {availableUsers.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="member">Member</option>
            <option value="manager">Manager</option>
          </select>
          <Button size="sm" onClick={handleAdd} loading={loading}>
            Add
          </Button>
        </div>
      </div>

      {members.length === 0 ? (
        <p className="text-gray-600">No members yet.</p>
      ) : (
        <ul className="divide-y">
          {members.map((m) => (
            <li key={m._id} className="py-3 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{m.name}</p>
                <p className="text-sm text-gray-600">{m.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={m.role || "member"}
                  onChange={(e) => handleRoleChange(m._id, e.target.value)}
                  className="rounded-lg border border-gray-300 px-2 py-1 text-sm"
                >
                  <option value="member">Member</option>
                  <option value="manager">Manager</option>
                </select>
                <Button size="sm" variant="outline" onClick={() => handleRemove(m._id)}>
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
