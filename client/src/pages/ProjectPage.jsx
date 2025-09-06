import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { useProjectStore } from "../store/useProjectStore";
import TaskBoard from "../components/Tasks/TaskBoard";
import ThreadList from "../components/Threads/ThreadList";
import MemberList from "../components/Project/MemberList";
import ActivityFeed from "../components/Project/ActivityFeed";

const tabs = [
  { name: "Board", component: TaskBoard },
  { name: "Threads", component: ThreadList },
  { name: "Members", component: MemberList },
  { name: "Activity", component: ActivityFeed },
];

export default function ProjectPage() {
  const { projectId } = useParams();
  const { currentProject, loading, fetchProject, fetchActivity } =
    useProjectStore();

  useEffect(() => {
    fetchProject(projectId);
    fetchActivity(projectId);
  }, [projectId]);

  if (loading || !currentProject) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="h-4 bg-gray-100 rounded w-2/3 mb-8" />
        <div className="h-64 bg-gray-100 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {currentProject.name}
        </h1>
        {currentProject.description && (
          <p className="mt-2 text-gray-600">{currentProject.description}</p>
        )}
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors
                ${
                  selected
                    ? "bg-white text-primary-700 shadow"
                    : "text-gray-700 hover:bg-white/[0.12] hover:text-gray-900"
                }`
              }
            >
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6">
          {tabs.map((tab, idx) => (
            <Tab.Panel key={idx} className="animate-fade-in">
              <tab.component projectId={projectId} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
