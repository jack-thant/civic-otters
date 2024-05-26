import AccountProfile from "@/components/forms/AccountProfile";
import { Role } from "@/enum/role";
import { currentUser } from '@clerk/nextjs/server';

async function Page()
{
    const user = await currentUser();

    const userInfo = {
        id: "1",
        username: "jack-thant",
        name: "Thant Htoo",
        role: Role.Volunteer,
        dateOfBirth: "2000-01-01", // A valid date string
        interest: ["Mental Health"],
        image: "",
    };

    const userData = {
        id: user?.id || "3",
        objectId: userInfo?.id || "", // Ensure objectId is assigned a string value
        username: userInfo?.username || user?.username || "",
        name: userInfo?.name || user?.firstName || "",
        role: userInfo?.role,
        dateOfBirth: userInfo?.dateOfBirth ? new Date(userInfo.dateOfBirth) : new Date(), // Convert to Date object
        interests: userInfo?.interest || [],
        image: userInfo?.image || user?.imageUrl || "", // Ensure image is a string
    };

    return (
        <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
            <h1 className='head-text'>Onboarding Page</h1>
            <p className="mt-3 text-base-regular text-light-2">Complete your profile now to use Civic Otters</p>
            <section className="mt-9 bg-dark-2 p-10">
                <AccountProfile user = {userData} btnTitle = "Continue"/>
            </section>
        </main>
    )
}

export default Page;