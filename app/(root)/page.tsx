import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";
import { getFriendEvents, getUserOpportunities } from "@/lib/actions/user.actions";
import Link from "next/link";
import Image from "next/image";
import { ReactElement, JSXElementConstructor, Key } from "react";

interface Event {
  name: string;
  imageUrl: string;
  date: string;
  tags: string[];
  venue: string;
  _id: string;
}

interface FriendEvent {
  friendName: string;
  events: Event[];
}

interface UserActivity {
  name: string;
  imageUrl: string;
  date: string;
  tags: string[];
  venue: string;
  _id: string;
}

interface NormalizedActivity {
  name: string;
  activity: string;
  imageUrl: string;
  time: Date;
  tags: string[];
  venue: string;
  id: string;
}

export default async function ActivityPage() {
  const friendActivity: FriendEvent[] = await getFriendEvents("alice");
  const userActivity: UserActivity[] = await getUserOpportunities("alice");

  const normalizeActivityData = (friendActivities: FriendEvent[], userActivities: UserActivity[]): NormalizedActivity[] => {
    const normalizedFriendActivities = friendActivities.flatMap((friend) =>
      friend.events.map((event) => ({
        name: friend.friendName,
        activity: event.name,
        imageUrl: event.imageUrl,
        time: new Date(event.date),
        tags: event.tags,
        venue: event.venue,
        id: event._id,
      }))
    );

    const normalizedUserActivities = userActivities.map((activity) => ({
      name: "You",
      activity: activity.name,
      imageUrl: activity.imageUrl,
      time: new Date(activity.date),
      tags: activity.tags,
      venue: activity.venue,
      id: activity._id,
    }));

    return [...normalizedFriendActivities, ...normalizedUserActivities];
  };

  const formatDate = (date: Date): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const allActivities = normalizeActivityData(friendActivity, userActivity);
  allActivities.sort((a, b) => b.time.getTime() - a.time.getTime());

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <h1 className="head-text mb-5">Activity</h1>
      <div className="space-y-4">
        {allActivities.map((activity) => (
          <Link key={activity.id} href={`/events/${activity.id}`} passHref>
            <div className="block py-2">
              <div className="bg-dark-2 rounded-lg shadow">
                <h2 className="text-2xl text-secondary-500 font-semibold p-4">
                  {activity.name}
                </h2>
                <p className="text-light-2 p-4">
                  {`${activity.name} is happy to announce that they have signed up for ${activity.activity} at ${activity.venue}.`}
                </p>
                {activity.imageUrl && (
                  <img
                    src={activity.imageUrl}
                    alt={activity.activity}
                    className="w-full h-40 object-cover object-center"
                  />
                )}

                {activity.tags && activity.tags.length > 0 && (
                  <div className="flex flex-wrap p-4">
                    {activity.tags.slice(0, 3).map((tag: string, index: Key) => (
                      <span key={index}>
                        <Badge className="font-semibold bg-dark-3 text-light-4 px-3 py-2" variant="default">
                          {tag}
                        </Badge>
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex flex-row space-between gap-x-10 p-4">
                  <div className="flex flex-row items-center gap-x-2">
                    <Image src='../assets/clock.svg' alt='clock' width={18} height={18} />
                    <p className="text-sm font-medium text-light-1">{formatDate(activity.time)}</p>
                  </div>

                  {activity.venue && (
                    <div className="flex flex-row items-center gap-x-2">
                      <Image src='../assets/map-pin.svg' alt='clock' width={18} height={18} />
                      <p className="text-sm font-medium text-light-1">{activity.venue}</p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center pt-6">
        <ArrowPathIcon className="h-5 w-5 text-light-2" />
        <h3 className="ml-2 text-sm text-light-2">Updated just now</h3>
      </div>
    </main>
  );
}
