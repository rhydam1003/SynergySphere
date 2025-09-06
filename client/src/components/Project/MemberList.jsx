import { useProjectStore } from "../../store/useProjectStore";

export default function MemberList() {
  const { currentProject } = useProjectStore();
  const members = currentProject?.members || [];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Members</h3>
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
              <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                {m.role || "member"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
