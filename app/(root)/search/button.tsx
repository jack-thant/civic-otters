"use client";
import Revalidate from "./table";

import {
  addFriend,
  acceptFriendRequest,
  rejectFriendRequest,
} from "@/lib/actions/user.actions";

export function AddFriend({
  requesterName,
  receiverName,
}: {
  requesterName: string;
  receiverName: string;
}) {
  const handleAddFriend = async () => {
    console.log(requesterName, receiverName);
    await addFriend(requesterName, receiverName);
  };
  return (
    <button
      className="text-blue bg-sky-100 rounded-md p-3 hover:bg-sky-300"
      onClick={handleAddFriend}
    >
      Add Friend
    </button>
  );
}

export function AcceptFriend({
  requesterName,
  receiverName,
}: {
  requesterName: string;
  receiverName: string;
}) {
  const handleAcceptFriend = async () => {
    console.log(requesterName, receiverName);
    await acceptFriendRequest(requesterName, receiverName);
  };
  return (
    <button
      className="text-white bg-green-400 p-3 hover:bg-white hover:text-green"
      onClick={handleAcceptFriend}
    >
      Accept
    </button>
  );
}

export function RejectFriend({
  requesterName,
  receiverName,
  revalidate,
}: {
  requesterName: string;
  receiverName: string;
  revalidate: Function;
}) {
  const handleRejectFriend = async () => {
    console.log(requesterName, receiverName);
    await rejectFriendRequest(requesterName, receiverName);
  };
  return (
    <button
      className="text-red bg-white p-3 hover:text-white hover:bg-red"
      onClick={handleRejectFriend}
    >
      Delete
    </button>
  );
}