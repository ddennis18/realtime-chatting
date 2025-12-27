import { useState, useEffect } from "react";
import { X, UserPlus } from "lucide-react";
import toaster from "react-hot-toast";
import { searchUsers } from "../services/userService";
import { addMembersToGroup } from "../services/groupService";
import { useUser } from "../context/UserContext";
import { useDebounce } from "../hooks/useDebounce";

const AddMembersModal = ({ closeSelf, groupId, onMembersAdded }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { accessToken } = useUser();

  const debouncedQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      const result = await searchUsers({
        query: debouncedQuery,
        accessToken,
      });

      setIsSearching(false);

      if (result.ok) {
        setSearchResults(result.users || []);
      } else {
        toaster.error("Failed to search users");
      }
    };

    performSearch();
  }, [debouncedQuery, accessToken]);

  const toggleUserSelection = (user) => {
    setSelectedUsers((prev) => {
      const isSelected = prev.find((u) => u._id === user._id);
      if (isSelected) {
        return prev.filter((u) => u._id !== user._id);
      } else {
        return [...prev, user];
      }
    });
  };

  const handleAddMembers = async () => {
    if (selectedUsers.length === 0) {
      toaster.error("Please select at least one user");
      return;
    }

    setIsAdding(true);
    const memberIds = selectedUsers.map((u) => u._id);

    const result = await addMembersToGroup({
      groupId,
      memberIds,
      accessToken,
    });

    setIsAdding(false);

    if (!result.ok) {
      toaster.error(`Failed to add members: ${result.message}`);
      return;
    }

    toaster.success(
      `Added ${selectedUsers.length} member${
        selectedUsers.length > 1 ? "s" : ""
      } successfully!`
    );
    onMembersAdded();
    closeSelf();
  };

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center backdrop-blur-md z-50">
      <div className="relative space-y-3 rounded-lg border border-slate-500 bg-white shadow-2xl w-[80%] md:w-[50%] max-h-[80vh] py-4 px-8 flex flex-col">
        <button onClick={() => closeSelf()}>
          <X className="absolute right-[10px] top-[10px] hover:bg-indigo-600/80 transition-all stroke-white bg-indigo-600 p-1 rounded-lg" />
        </button>

        <h3 className="text-center text-2xl text-indigo-600 font-bold">
          Add Members
        </h3>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users by username or name..."
            className="border-2 border-indigo-600 rounded-full px-4 py-2"
            disabled={isAdding}
          />

          {selectedUsers.length > 0 && (
            <div className="text-sm text-indigo-600 font-semibold">
              {selectedUsers.length} user{selectedUsers.length > 1 ? "s" : ""}{" "}
              selected
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto border border-slate-300 rounded-lg p-2 min-h-[200px] max-h-[300px]">
          {isSearching && (
            <div className="text-center text-gray-500 py-4">Searching...</div>
          )}

          {!isSearching && searchQuery && searchResults.length === 0 && (
            <div className="text-center text-gray-500 py-4">No users found</div>
          )}

          {!isSearching && !searchQuery && (
            <div className="text-center text-gray-400 py-4">
              Start typing to search for users
            </div>
          )}

          {!isSearching &&
            searchResults.map((user) => {
              const isSelected = selectedUsers.find((u) => u._id === user._id);
              return (
                <div
                  key={user._id}
                  onClick={() => toggleUserSelection(user)}
                  className={`p-3 mb-2 rounded-lg cursor-pointer transition ${
                    isSelected
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 hover:bg-slate-200"
                  }`}
                >
                  <div className="font-semibold">{user.fullname}</div>
                  <div className="text-sm opacity-80">@{user.username}</div>
                </div>
              );
            })}
        </div>

        <div className="flex flex-row justify-end gap-2">
          <button
            type="button"
            onClick={() => closeSelf()}
            className="border-2 border-indigo-600 hover:bg-indigo-600 font-semibold text-indigo-600 hover:text-white px-4 py-2 rounded-full transition"
            disabled={isAdding}
          >
            Cancel
          </button>
          <button
            onClick={handleAddMembers}
            className="bg-indigo-700 hover:bg-indigo-600/90 font-semibold text-white px-4 py-2 rounded-full disabled:opacity-50 flex items-center gap-2"
            disabled={isAdding || selectedUsers.length === 0}
          >
            <UserPlus className="size-4" />
            {isAdding
              ? "Adding..."
              : `Add ${selectedUsers.length || ""} Member${
                  selectedUsers.length !== 1 ? "s" : ""
                }`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMembersModal;
