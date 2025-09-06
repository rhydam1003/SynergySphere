import { useProjectStore } from "../../store/useProjectStore";

export default function ActivityFeed() {
  const { activity } = useProjectStore();

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity</h3>
      {!activity || activity.length === 0 ? (
        <p className="text-gray-600">No recent activity.</p>
      ) : (
        <ul className="space-y-3">
          {activity.map((item) => (
            <li key={item._id} className="border rounded-lg p-3">
              <p className="text-sm text-gray-800">
                {item.description || "Activity"}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
