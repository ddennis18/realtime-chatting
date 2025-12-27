import { useState } from "react";
import { SidebarIcon } from "lucide-react";
import { useUser } from "../context/UserContext";
import GroupCard from "./GroupCard";
import CreateGroupModal from "./CreateGroupModal";

const Sidebar = () => {
  const { user, refreshUser } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const groups = user?.groups || [];

  const handleGroupCreated = async (newGroup) => {
    await refreshUser();
  };

  return (
    <div className="hidden md:block max-w-[200px] min-w-[150px] w-full min-h-[300px] bg-indigo-50 p-1">
      <div className="h-full p-2 border rounded-lg bg-white border-slate-500 shadow-lg space-y-1 overflow-auto">
        <div className="flex flex-row gap-2 items-center border-b border-slate-500">
          <SidebarIcon />
          <h2 className="text-lg font-semibold">Groups</h2>
        </div>
        <div className="flex flex-col h-[80%] justify-between items-center">
          <div className="flex flex-col items-center w-full gap-1">
            {groups.map((g) => {
              return <GroupCard key={g._id} {...g} />;
            })}
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-indigo-700 font-semibold p-1 rounded-lg text-white hover:bg-indigo-600 transition"
          >
            Create Group
          </button>
        </div>
      </div>
      {showCreateModal && (
        <CreateGroupModal
          closeSelf={() => setShowCreateModal(false)}
          onGroupCreated={handleGroupCreated}
        />
      )}
    </div>
  );
};

export default Sidebar;
