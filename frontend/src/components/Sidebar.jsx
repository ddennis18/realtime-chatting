import { SidebarIcon } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import GroupCard from "./GroupCard";

const Sidebar = () => {
  const { groups } = useUser();

  return (
    <div className="hidden md:block max-w-[200px] min-w-[150px] w-full min-h-[300px] bg-indigo-50 p-1">
      <div className="h-full p-2 border rounded-lg bg-white border-slate-500 shadow-lg space-y-1">
        <div className="flex flex-row gap-2 items-center border-b border-slate-500">
          <SidebarIcon />
          <h2 className="text-lg font-semibold">Groups</h2>
        </div>
        <div className="flex flex-col items-center space-y-1">
          {groups.map((g) => {
            return <GroupCard {...g} />;
          })}
          <button className="bg-indigo-700 font-semibold p-1 rounded-lg text-white">
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
