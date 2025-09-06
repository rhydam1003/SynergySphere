import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../lib/apiClient";
import Button from "../Common/Button";
import TextInput from "../Common/TextInput";

export default function ThreadList({ projectId: projectIdProp }) {
  const params = useParams();
  const projectId = projectIdProp || params.projectId;
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  const fetchThreads = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/api/projects/${projectId}/threads`);
      setThreads(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) fetchThreads();
  }, [projectId]);

  const createThread = async () => {
    if (!title.trim()) return;
    const res = await api.post(`/api/projects/${projectId}/threads`, { title });
    setTitle("");
    setThreads((prev) => [res.data, ...prev]);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Threads</h3>
        <div className="flex items-center gap-2">
          <TextInput
            placeholder="New thread title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-56"
          />
          <Button size="sm" onClick={createThread}>
            Create
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      ) : threads.length === 0 ? (
        <p className="text-gray-600">No threads yet.</p>
      ) : (
        <ul className="divide-y">
          {threads.map((t) => (
            <li key={t._id} className="py-3 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{t.title}</p>
                <p className="text-xs text-gray-500">
                  {new Date(t.createdAt).toLocaleString()}
                </p>
              </div>
              <Link
                className="text-primary-600"
                to={`/projects/${projectId}/threads/${t._id}`}
              >
                Open
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
