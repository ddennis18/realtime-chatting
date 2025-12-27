import { useState } from "react";
import { SidebarIcon, UserPlus } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useChats } from "../context/ChatContext";
import GroupCard from "./GroupCard";
import CreateGroupModal from "./CreateGroupModal";
import AddMembersModal from "./AddMembersModal";

const Sidebar = () => {
  const { user, refreshUser } = useUser();
  const { currentGroup } = useChats();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);

  const groups = user?.groups || [];

  const handleGroupCreated = async (newGroup) => {
    await refreshUser();
  };

  const handleMembersAdded = async () => {
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
          <div className="flex flex-col gap-1 w-full">
            {currentGroup?._id && (
              <button
                onClick={() => setShowAddMembersModal(true)}
                className="bg-indigo-600 font-semibold p-1 rounded-lg text-white hover:bg-indigo-500 transition flex items-center justify-center gap-1 text-sm"
              >
                <UserPlus className="size-4" />
                Add Members
              </button>
            )}
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-indigo-700 font-semibold p-1 rounded-lg text-white hover:bg-indigo-600 transition"
            >
              Create Group
            </button>
          </div>
        </div>
      </div>
      {showCreateModal && (
        <CreateGroupModal
          closeSelf={() => setShowCreateModal(false)}
          onGroupCreated={handleGroupCreated}
        />
      )}
      {showAddMembersModal && currentGroup?._id && (
        <AddMembersModal
          closeSelf={() => setShowAddMembersModal(false)}
          groupId={currentGroup._id}
          onMembersAdded={handleMembersAdded}
        />
      )}
    </div>
  );
};

export default Sidebar;
