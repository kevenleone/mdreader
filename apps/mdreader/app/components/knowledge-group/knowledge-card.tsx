import {
  Separator,
  AvatarFallback,
  AvatarImage,
  Avatar,
} from '@mdreader/interface';
import { Link } from '@remix-run/react';
import { Link as LinkIcon, Flag as FlagIcon } from 'lucide-react';

import BlurhashFallback from '../blurhash-fallback';
import { getInitials } from '~/utils';
import { Profile } from '~/types';

type KnowledgeCardProps = {
  blurhash?: string;
  description: string;
  image?: string;
  owner: Profile;
  tags: string[];
  url: string;
};

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({
  blurhash,
  description,
  image,
  owner,
  tags,
  url,
}) => (
  <div className="max-w-xs rounded overflow-hidden shadow-lg flex flex-col justify-between border p-4">
    {image && (
      <BlurhashFallback
        blurhash={blurhash}
        description={description}
        src={image}
      />
    )}

    <div className="py-4">
      <p className="dark:text-gray-300 text-gray-800 text-base mb-2">
        {description}
      </p>

      <a
        className="text-sm text-blue-500"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {url}
      </a>
    </div>

    {tags?.length && (
      <div className="pt-4 pb-2">
        {tags.map((tag, index) => (
          <Link
            to={`?tag=${tag}`}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            key={index}
          >
            #{tag}
          </Link>
        ))}
      </div>
    )}

    <div>
      <Separator />

      <div className="flex items-center gap-2 mt-2">
        <Avatar>
          <AvatarFallback>{getInitials(owner.name)}</AvatarFallback>
          <AvatarImage src={owner.photo} />
        </Avatar>

        <Link className="w-full" to={`/profile/${owner.login}`}>
          {owner.name}
        </Link>

        <div className="flex gap-2 cursor-pointer">
          <LinkIcon size={16} />
          <FlagIcon size={16} />
        </div>
      </div>
    </div>
  </div>
);

export default KnowledgeCard;
