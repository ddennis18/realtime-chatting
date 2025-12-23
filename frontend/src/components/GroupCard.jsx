import { useCallback } from "react";
import { useChats } from "../context/ChatContext";

const currentStyle = "border-indigo-700 bg-indigo-50/50";
const defaultStyle = "border-slate-500";

const GroupCard = ({ name, _id }) => {
  const { currentGroup, setCurrentGroup } = useChats();
  const isCurrent = currentGroup._id === _id;

  const handleClick = useCallback(() => {
    setCurrentGroup(_id)
  });

  return (
    <div
      className={`w-full py-1 px-1 border-l-4 rounded-sm ${
        isCurrent ? currentStyle : defaultStyle
      }`}
      onClick={handleClick}
    >
      {name}
    </div>
  );
};

export default GroupCard;
