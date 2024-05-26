import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { fetchAllUsers } from '@/lib/actions/user.actions';

export default async function Leaderboard() {
  const users = await fetchAllUsers();

  // Sort users by XP in descending order
  users.sort((a, b) => b.xp - a.xp);

  return (
    <div className="flex flex-col h-full w-full">
      <h1 className='head-text mb-5'>OtterPals LeaderBoard</h1>
      <div className="flex grow flex-col justify-between rounded-xl bg-dark-2 shadow-lg px-5 overflow-auto">
        <div className="rounded-lg">
          {users.map((user, i) => (
            <div
              key={user.id}
              className={clsx(
                'flex flex-row items-center justify-between py-4',
                {
                  'border-t border-gray-700': i !== 0,
                }
              )}
            >
              <div className="flex items-center">
                <span className={clsx('mr-4 text-lg font-semibold', {
                  'text-yellow-500': i === 0, // First place
                  'text-stone-400': i === 1, // Second place
                  'text-amber-600': i === 2, // Third place
                  'text-light-2': i > 2
                })}>
                  {i + 1}.
                </span>
                <Image
                  src={user.userImage}
                  alt={`${user.name}'s profile picture`}
                  className="mr-4 rounded-full"
                  width={40}
                  height={40}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-primary-500 md:text-base">
                    {user.name}
                  </p>
                  <p className="hidden text-sm text-gray-500 sm:block">
                    {user.email}
                  </p>
                </div>
              </div>
              <p className={clsx('mr-4 text-lg font-bold', {
                  'text-yellow-500': i === 0, // First place
                  'text-stone-400': i === 1, // Second place
                  'text-amber-600': i === 2, // Third place
                  'text-light-2': i > 2
                })}>
                  {user.xp} XP
                </p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center py-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}