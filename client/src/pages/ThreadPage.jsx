import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../lib/apiClient";
import Button from "../components/Common/Button";
import TextInput from "../components/Common/TextInput";

export default function ThreadPage() {
  const { threadId } = useParams();
  const [thread, setThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState("");
  const listRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [t, m] = await Promise.all([
        api.get(`/api/threads/${threadId}`),
        api.get(`/api/threads/${threadId}/messages`),
      ]);
      setThread(t?.data ?? t);
      setMessages(m?.data ?? m ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (threadId) fetchData();
  }, [threadId]);

  const sendMessage = async () => {
    if (!body.trim()) return;
    const res = await api.post(`/api/threads/${threadId}/messages`, { body });
    setBody("");
    setMessages((prev) => [...prev, res?.data ?? res]);
    setTimeout(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 50);
  };

  if (loading) {
    return <div className="h-64 bg-gray-100 rounded animate-pulse" />;
  }

  if (!thread) {
    return <p className="text-gray-600">Thread not found.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-900">{thread.title}</h1>
      </div>

      <div
        ref={listRef}
        className="bg-white rounded-xl shadow-sm p-4 h-96 overflow-y-auto"
      >
        {messages.length === 0 ? (
          <p className="text-gray-600">No messages yet.</p>
        ) : (
          <ul className="space-y-3">
            {messages.map((msg) => (
              <li key={msg._id} className="border rounded-lg p-3">
                <p className="text-sm text-gray-800">{msg.body}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-2">
        <input
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
          placeholder="Type a message..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
