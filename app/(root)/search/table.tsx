import Tag from "@/components/ui/tag";
import {
  AddFriend,
  AcceptFriend,
  RejectFriend,
} from "@/app/(root)/search/button";
import Image from "next/image";
import User from "@/lib/models/user.model";
import { getAllUsersByName } from "@/lib/actions/user.actions";

// Define the interface for a User object
interface User {
    id: string;
    name: string;
    username: string;
    role: string;
    dateOfBirth: string;
    interests: string[];
    image: string;
    [key: string]: any; // To handle any additional properties
  }

// Define the props for the FriendTable component
interface FriendTableProps {
  query: string;
  users: User[];
  currUser: User;
}

export default async function FriendTable({
  query,
  users,
  currUser,
}: FriendTableProps) {
  console.log(users);

  // if (query !== "") {
  //   const users = await getAllUsersByName(query);
  // }

  const handleAddFriend = () => {
    console.log("addFriend");
  };

  return (
    <div className="mt-6 flow-root">
      <table className="min-w-full text-gray-900 md:table bg-dark-2 text-light-2">
        <thead>
          <tr>
            <th scope="col" className="px-4 py-5 font-medium">
              Name
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Email
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Tags
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            user._id === currUser._id ? (
              <></>
            ) : (
              <tr
                key={user._id}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg "
              >
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={user.userImage || ""}
                      className="mr-2 rounded-full"
                      width={28}
                      height={28}
                      alt={`${user.name}'s profile picture`}
                    />
                    <p>{user.name}</p>
                  </div>
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  {user.email}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <Tag values={user.interests} />
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  {currUser.friends.includes(user._id) ? (
                    <div>Friend</div>
                  ) : currUser.pending.includes(user._id) ? (
                    <div>Pending</div>
                  ) : currUser.requested.includes(user._id) ? (
                    <div>
                      <AcceptFriend
                        requesterName={currUser.name}
                        receiverName={user.name}
                      />
                      {/* <RejectFriend
                        requesterName={currUser.name}
                        receiverName={user.name}
                      /> */}
                    </div>
                  ) : (
                    <AddFriend
                      requesterName={currUser.name}
                      receiverName={user.name}
                    />
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
