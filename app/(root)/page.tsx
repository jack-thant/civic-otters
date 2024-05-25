import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";
import {
  getFriendEvents,
  getUserOpportunities,
} from "@/lib/actions/user.actions";
import Link from "next/link";

export default async function ActivityPage() {
  const friendActivity = await getFriendEvents("testing");
  const userActivity = await getUserOpportunities("testing");

  const normalizeActivityData = (friendActivities, userActivities) => {
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

  const formatDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const allActivities = normalizeActivityData(friendActivity, userActivity);
  allActivities.sort((a, b) => new Date(b.time) - new Date(a.time));

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <h1 className="head-text mb-5">Activity</h1>
      <div className="space-y-4">
        {allActivities.map((activity, index) => (
          <Link key={activity.id} href={`/events/${activity.id}`} passHref>
            <div className="block p-4">
              <div key={index} className="bg-dark-2 rounded-lg shadow">
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
                    {activity.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="mr-2 mb-2">
                        <Badge
                          className="font-semibold text-light-2 shadow-md border"
                          variant="outline"
                        >
                          {tag}
                        </Badge>
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-light-2 p-4">
                  Time: {formatDate(activity.time)}
                </p>
                <p className="text-light-2 p-4">Venue: {activity.venue}</p>
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
