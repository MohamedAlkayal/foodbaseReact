import Avatar from "boring-avatars";
import avatarConfig from "../../utils/avatar.config";
import { Group } from "../../types/Group";

interface GroupCardProps {
  group: Group;
}

export default function GroupCard({ group }: GroupCardProps) {
  return (
    <div key={group._id} className="p-4 border rounded-2xl flex items-center gap-4">
      <Avatar size={50} name={group.name} variant="marble" colors={avatarConfig.colors} />
      <div className=" flex-shrink">
        <p className=" font-semibold mb-1">{group.name}</p>
        <p className="text-gray-500 text-wrap">{group.description}</p>
      </div>
    </div>
  );
}
