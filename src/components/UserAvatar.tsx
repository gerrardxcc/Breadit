import { Icons } from '@/components/Icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarProps } from '@radix-ui/react-avatar';
import { User } from 'next-auth';
import Image from 'next/image';

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'name' | 'image' | 'email'>;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className='relative aspect-square h-full w-full'>
          <Image
            fill
            src={user.image}
            alt='profile picture'
            referrerPolicy='no-referrer'
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{user?.name}</span>
          <Icons.user className='h-4 w-4' />
        </AvatarFallback>
      )}
    </Avatar>
  );
}

export default UserAvatar;
