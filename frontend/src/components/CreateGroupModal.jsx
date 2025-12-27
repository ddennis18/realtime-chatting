import { useState } from "react";
import { X } from "lucide-react";
import toaster from "react-hot-toast";
import { createGroup } from "../services/groupService";
import { useUser } from "../context/UserContext";

const CreateGroupModal = ({ closeSelf, onGroupCreated }) => {
  const [groupName, setGroupName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!groupName.trim()) {
      toaster.error("Please enter a group name");
      return;
    }

    setIsLoading(true);
    const { ok, message, group } = await createGroup({
      name: groupName,
      accessToken,
    });

    setIsLoading(false);

    if (!ok) {
      toaster.error(`Failed to create group: ${message}`);
      return;
    }

    toaster.success("Group created successfully!");
    onGroupCreated(group);
    closeSelf();
  };

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center backdrop-blur-md z-50">
      <div className="relative space-y-2 rounded-lg border border-slate-500 bg-white shadow-2xl w-[80%] md:w-[50%] py-4 px-8">
        <button onClick={() => closeSelf()}>
          <X className="absolute right-[10px] top-[10px] hover:bg-indigo-600/80 transition-all stroke-white bg-indigo-600 p-1 rounded-lg" />
        </button>
        <h3 className="text-center text-2xl text-indigo-600 font-bold">
          Create New Group
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="groupName" className="font-semibold">
            Group Name:
          </label>
          <input
            type="text"
            name="groupName"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
            className="border-2 border-indigo-600 rounded-full px-2 py-1"
            disabled={isLoading}
          />
          <div className="flex flex-row justify-end gap-2">
            <button
              type="button"
              onClick={() => closeSelf()}
              className="border-2 border-indigo-600 hover:bg-indigo-600 font-semibold text-indigo-600 hover:text-white px-4 py-1 rounded-full transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-700 hover:bg-indigo-600/90 font-semibold text-white px-4 py-1 rounded-full disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
