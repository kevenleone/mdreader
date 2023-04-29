import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@mdreader/ui/components/ui/avatar';
import { getInitials } from '../../utils';

type ProfileProps = {
  name: string;
  bio?: string;
  company?: string;
  photo: string;
  description?: string;
};

const Profile: React.FC<ProfileProps> = ({
  bio,
  company,
  description = `Helping developers build a faster web. Teaching about web development,
  serverless, and React / Next.js.`,
  name,
  photo,
}) => (
  <div className="flex flex-col-reverse sm:flex-row items-start">
    <div className="flex flex-col pr-8">
      <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
        {name}
      </h1>
      <h2 className="text-gray-700 dark:text-gray-200 mb-4">
        {bio} at <span className="font-semibold">{company}</span>
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{description}</p>
    </div>

    <Avatar className="w-[80px] h-[80px] sm:w-[176px] sm:h-[176px]">
      <AvatarImage src={photo} />
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  </div>
);

export { Profile };
