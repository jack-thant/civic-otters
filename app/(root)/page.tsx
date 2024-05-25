"use client"

import { useEffect, useState } from "react";

const ActivityPage = () => {
  // Sample data - assuming Alice and Bob are friends
  const [currentUser, setCurrentUser] = useState(
    [
      {
        id: 101,
        title: "Volunteering at Local Park Cleanup",
        date: new Date("2024-06-01T10:00:00Z"),
        description: "Helping clean up the park and plant new trees.",
      },
      {
        id: 102,
        title: "Community Fundraising Event",
        date: new Date("2024-06-05T15:00:00Z"),
        description: "Raising funds for local schools.",
      },
    ]
  );

  const [friendsActivities, setFriendsActivities] = useState([]);

  useEffect(() => {
    // Simulate fetching friends' activities
    // In a real scenario, you would fetch this data from your backend
    // Here we're using static data for simplicity
    setFriendsActivities([
      
    ]);
  }, []);

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedDate;
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-8 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Activity Feed</h1>

      {friendsActivities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <div className="space-y-4">
          {friendsActivities.map((activity) => (
            <div key={activity.id} className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{activity.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
              <p className="text-sm text-gray-600">{formatDate(activity.Date)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityPage;
