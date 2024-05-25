import { currentUser } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const tags: Array<string> = ["Mental Health", "Children", "Social Services"];
const friends = [
    {name: "James", interests: ["Sport", "Community", "Health"], src: "/images/person-1.jpeg"},
    {name: "Billy", interests: ["Mental Health", "Social Services", "Health"], src: "/images/person-2.jpeg"},
    {name: "Aaron", interests: ['Family', 'Environment', 'Animal'], src: "/images/person-3.jpeg"}
]
const achievements = [
    {name: "Children Category", src: "./assets/award_red.svg"},
    {name: "Social Services Category", src: "./assets/award_yellow.svg"},
]

async function Page() {
    const user = await currentUser();
    return (
        <>
            <h1 className="head-text">Profile</h1>
            <div className="flex flex-row mt-5 gap-x-10 bg-dark-2 py-3 rounded-lg gap-y-5">
                <Avatar className='w-20 h-20 ml-3'>
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center items-center">
                    <p className='text-heading3-bold text-primary-500'>{user?.fullName}</p>
                    <p className='small-regular text-secondary-500'>{user?.username}</p>
                </div>
            </div>
            <h4 className='heading4-medium text-light-1 pt-5 pb-2'>Interests</h4>
            <div className="flex flex-row bg-dark-2 py-3 rounded-lg">
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap p-3">
                        {tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="mr-2 mb-2">
                                <Badge
                                    className="font-semibold bg-dark-3 text-light-4 px-3 py-2"
                                    variant="default"
                                >
                                    {tag}
                                </Badge>
                            </span>
                        ))}
                    </div>
                )}
            </div>
            {/* Friends List */}
            <h4 className='heading4-medium text-light-1 pt-5 pb-2'>Friends</h4>
            {friends.map((friend, index) => (
                <div key={index} className="flex flex-row gap-5 p-4 items-center space-between bg-dark-2 rounded-lg shadow-md mb-4">
                    <Avatar className='w-12 h-12 ml-3 object-cover'>
                        <AvatarImage src={friend?.src} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className='small-regular text-secondary-500'>{friend.name}</p>
                    <hr/>
                    <div className='flex flex-row gap-2'>
                    {friend.interests.map((interest, i) => (
                        <span key={i}>
                        <Badge
                            className="font-semibold bg-dark-3 text-light-4"
                            variant="default"
                        >
                            {interest}
                        </Badge>
                    </span>
                    ))}
                    </div>
                </div>
            ))}
            {/* Achievements List */}
            <h4 className='heading4-medium text-light-1 pt-5 pb-2'>Achievements</h4>
            <div className="flex flex-row gap-3">
                {achievements.map((achievement) => (
                    <div className="w-30 h-30 bg-dark-2 rounded-lg">
                        <div className="flex flex-col items-center justify-center gap-4 p-5">
                            <Image src={achievement.src} alt={achievement.name} width={40} height={40}/>
                            <p className="text-base-semibold text-primary-500 word-break">{achievement.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Page;