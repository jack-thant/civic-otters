import Tag from '@/components/ui/tag'
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function FriendTable({
    query
} : {
    query : string;
}) {
    console.log(query)
    const friends = [
        {"name" : 'yee jian', "email" : "email", "tags" : ["Elderly", "Environment", "Animal"]},
        {"name" : 'jack', "email" : "email", "tags" : ["Elderly", "Environment", "Animal"]},
        {"name" : 'ooing', "email" : "email", "tags" : ["Elderly", "Environment", "Animal"]},
    ] // get data based on searched query
    return (
        <div className="mt-6 flow-root">
            <table className="min-w-full text-gray-900 md:table">
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
                    {friends?.map((friend) => (
                        <tr key={friend.name}  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg ">
                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                <div className="flex items-center gap-3">
                                <Image
                                    src=""
                                    // src={friend.name}
                                    className="mr-2 rounded-full"
                                    width={28}
                                    height={28}
                                    alt={`${friend.name}'s profile picture`}
                                />
                                    <p> {friend.name} </p>
                                </div>
                            </td>
                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                {friend.email}
                            </td>
                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                <Tag 
                                values={friend.tags} />
                            </td>
                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                <Button type="submit" className='bg-primary-500'>Add Friends</Button>
                            </td>
                        </tr>
                    ))}
                   
                </tbody>
            </table>
            
        </div>
    )
}
