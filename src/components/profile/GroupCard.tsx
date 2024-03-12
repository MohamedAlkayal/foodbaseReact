import Avatar from "boring-avatars";
import avatarConfig from "../../utils/avatar.config";
import { Group } from "../../types/Group";
import { useNavigate } from "react-router-dom";

interface GroupCardProps {
  group: Group;
}

export default function GroupCard({ group }: GroupCardProps) {
  const navigate = useNavigate();

  const navGroup = () => {
    navigate(`/group?key=${group._id}`);
  };

  return (
    <div onClick={navGroup} className="p-4 border rounded-2xl flex items-center gap-4 cursor-pointer duration-300 hover:shadow-lg">
      <div className="min-w-[50px]">
        <Avatar size={50} name={group.name} variant={avatarConfig.groupVariant} colors={avatarConfig.colors} />
      </div>
      <div>
        <p className=" font-semibold mb-1">{group.name}</p>
        <p className="text-gray-500 text-wrap">{group.description}</p>
      </div>
    </div>
  );
}
