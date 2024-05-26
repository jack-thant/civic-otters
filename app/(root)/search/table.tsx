import Tag from "@/components/ui/tag";
import {
  AddFriend,
  AcceptFriend,
  RejectFriend,
} from "@/app/(root)/search/button";
import Image from "next/image";
import { revalidatePath } from "next/cache";

import User from "@/lib/models/user.model";
import { getAllUsersByName } from "@/lib/actions/user.actions";

export default async function FriendTable({
  query,
  users,
  currUser,
}: {
  query: string;
  users: typeof User;
  currUser: typeof User;
}) {
  console.log(users);
  // if (query !== "") {
  //   const users = await getAllUsersByName(query);
  // }

  const handleAddFriend = () => {
    console.log("addFriend");
  };

  return (
    <div className="mt-6 flow-root">
      <table className="min-w-full text-gray-900 md:table bg-white">
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
                key={user.name}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg "
              >
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    <Image
                      // src={user.userImage}
                      src=""
                      className="mr-2 rounded-full"
                      width={28}
                      height={28}
                      alt={`${user.name}'s profile picture`}
                    />
                    <p> {user.name} </p>
                  </div>
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  {user.email}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <Tag values={user.interests} />
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  {currUser.friends.toString().includes(user._id) ? (
                    <div>Friend</div>
                  ) : currUser.pending.toString().includes(user._id) ? (
                    <div>Pending</div>
                  ) : currUser.requested.toString().includes(user._id) ? (
                    <div>
                      <AcceptFriend
                        requesterName={currUser.name}
                        receiverName={user.name}
                      />
                      <RejectFriend
                        requesterName={currUser.name}
                        receiverName={user.name}
                      />
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
