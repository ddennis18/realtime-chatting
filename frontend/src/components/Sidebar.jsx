import { SidebarIcon } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="hidden md:block max-w-[200px] min-w-[150px] w-full min-h-[300px]">
      <div className="h-full p-2 border rounded-lg border-slate-500">
        <div className="flex flex-row gap-2 items-center">
          <SidebarIcon />
          <h2 className="text-lg font-semibold">Groups</h2>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
