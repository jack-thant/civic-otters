import Link from "next/link"
import Image from "next/image"
import { SignOutButton, SignedIn, UserButton } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

export default function TopBar()
{
    return (
        <>
            <nav className='topbar'>
                <Link
                    href="/"
                    className='flex items-center gap-4'
                >
                    <Image src='./assets/logo.svg' alt='logo' width={33} height={28}/>
                    <p className='text-heading3-bold text-light-1 max-xs:hidden'>Civic Otters</p>
                </Link>

                <div className='flex items-center gap-5'>
                    <div className='block md:hidden'>
                        <SignedIn>
                            <SignOutButton redirectUrl="/sign-in">
                                <div className="flex cursor-pointer">
                                    <Image 
                                    src="/assets/logout.svg"
                                    alt='logout'
                                    width={24}
                                    height={24}
                                    />
                                </div>
                            </SignOutButton>
                        </SignedIn>
                    </div>
                    <UserButton
                        appearance={{
                            baseTheme: dark,
                        }}
                    ></UserButton>
                </div>


            </nav>

        </>
    )
}