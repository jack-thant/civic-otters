import { SignUp } from "@clerk/nextjs";

export default function Page()
{
    return (
        <>
            <div className='flex items-center justify-center h-screen mt-10 mb-10'>
                <SignUp/>
            </div>
        </>
    )
}