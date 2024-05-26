// pages/events/[id].tsx (or wherever your event details page is located)
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from './button';

export interface EventDetailFormProps {
  event?: {
    name: string;
    date: Date;
    description: string;
    imageUrl?: string;
    venue?: string;
    availableSlots?: number;
    organizerContact?: string;
    tags?: string[];
  };
}

// Function to format date components
const formatDate = (date: Date | undefined) => {
  if (!date) return "";
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

// Event detail component
export default function EventDetailPage({ event }: EventDetailFormProps) {
  if (!event) {
    return <p>Loading...</p>; // Handle loading state or error when event is not available
  }

  const { name, date, description, imageUrl, venue, availableSlots, organizerContact, tags } = event;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Event Image and Details Section */}
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-lg shadow-md">
            <div className="mb-6">
              {imageUrl && (
                <div className="mb-4">
                  <Image
                    src={imageUrl}
                    alt={name}
                    width={600}
                    height={400}
                    className="rounded-lg object-cover"
                  />
                </div>
              )}
              <h1 className="head-text my-5">{name}</h1>

              <div className="flex flex-col mb-5">
                <p className='text-light-1 text-body-semibold'>Description</p>
                <p className="mt-4 text-light-3">{description}</p>
              </div>
            </div>

            <div className="flex flex-col mb-5 bg-dark-2 p-6 rounded-lg gap-4">
              <div className="flex flex-row items-center gap-x-2">
                <Image src='../assets/clock.svg' alt='clock' width={18} height={18} />
                <p className="text-sm font-medium text-light-1">{formatDate(date)}</p>
              </div>

              {venue && (
                <div className="flex flex-row items-center gap-x-2">
                  <Image src='../assets/map-pin.svg' alt='clock' width={18} height={18} />
                  <p className="text-sm font-medium text-light-1">{venue}</p>
                </div>
              )}
              {organizerContact && (
                <div className="flex flex-row items-center gap-x-2">
                  <Image src="../assets/phone.svg" alt='phone' width={18} height={18}/>
                  <p className="text-sm font-medium text-light-1">{organizerContact}</p>
                </div>
              )}
              {availableSlots !== undefined && (
                <div className="flex flex-row items-center gap-x-2">
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C9.37665 1.25 7.25 3.37665 7.25 6C7.25 8.62335 9.37665 10.75 12 10.75C14.6234 10.75 16.75 8.62335 16.75 6C16.75 3.37665 14.6234 1.25 12 1.25ZM8.75 6C8.75 4.20507 10.2051 2.75 12 2.75C13.7949 2.75 15.25 4.20507 15.25 6C15.25 7.79493 13.7949 9.25 12 9.25C10.2051 9.25 8.75 7.79493 8.75 6Z" fill="#ef4444" />
                    <path d="M18 3.25C17.5858 3.25 17.25 3.58579 17.25 4C17.25 4.41421 17.5858 4.75 18 4.75C19.3765 4.75 20.25 5.65573 20.25 6.5C20.25 7.34427 19.3765 8.25 18 8.25C17.5858 8.25 17.25 8.58579 17.25 9C17.25 9.41421 17.5858 9.75 18 9.75C19.9372 9.75 21.75 8.41715 21.75 6.5C21.75 4.58285 19.9372 3.25 18 3.25Z" fill="#ef4444" />
                    <path d="M6.75 4C6.75 3.58579 6.41421 3.25 6 3.25C4.06278 3.25 2.25 4.58285 2.25 6.5C2.25 8.41715 4.06278 9.75 6 9.75C6.41421 9.75 6.75 9.41421 6.75 9C6.75 8.58579 6.41421 8.25 6 8.25C4.62351 8.25 3.75 7.34427 3.75 6.5C3.75 5.65573 4.62351 4.75 6 4.75C6.41421 4.75 6.75 4.41421 6.75 4Z" fill="#ef4444" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 12.25C10.2157 12.25 8.56645 12.7308 7.34133 13.5475C6.12146 14.3608 5.25 15.5666 5.25 17C5.25 18.4334 6.12146 19.6392 7.34133 20.4525C8.56645 21.2692 10.2157 21.75 12 21.75C13.7843 21.75 15.4335 21.2692 16.6587 20.4525C17.8785 19.6392 18.75 18.4334 18.75 17C18.75 15.5666 17.8785 14.3608 16.6587 13.5475C15.4335 12.7308 13.7843 12.25 12 12.25ZM6.75 17C6.75 16.2242 7.22169 15.4301 8.17338 14.7956C9.11984 14.1646 10.4706 13.75 12 13.75C13.5294 13.75 14.8802 14.1646 15.8266 14.7956C16.7783 15.4301 17.25 16.2242 17.25 17C17.25 17.7758 16.7783 18.5699 15.8266 19.2044C14.8802 19.8354 13.5294 20.25 12 20.25C10.4706 20.25 9.11984 19.8354 8.17338 19.2044C7.22169 18.5699 6.75 17.7758 6.75 17Z" fill="#ef4444" />
                    <path d="M19.2674 13.8393C19.3561 13.4347 19.7561 13.1787 20.1607 13.2674C21.1225 13.4783 21.9893 13.8593 22.6328 14.3859C23.2758 14.912 23.75 15.6352 23.75 16.5C23.75 17.3648 23.2758 18.088 22.6328 18.6141C21.9893 19.1407 21.1225 19.5217 20.1607 19.7326C19.7561 19.8213 19.3561 19.5653 19.2674 19.1607C19.1787 18.7561 19.4347 18.3561 19.8393 18.2674C20.6317 18.0936 21.2649 17.7952 21.6829 17.4532C22.1014 17.1108 22.25 16.7763 22.25 16.5C22.25 16.2237 22.1014 15.8892 21.6829 15.5468C21.2649 15.2048 20.6317 14.9064 19.8393 14.7326C19.4347 14.6439 19.1787 14.2439 19.2674 13.8393Z" fill="#ef4444" />
                    <path d="M3.83935 13.2674C4.24395 13.1787 4.64387 13.4347 4.73259 13.8393C4.82132 14.2439 4.56525 14.6439 4.16065 14.7326C3.36829 14.9064 2.73505 15.2048 2.31712 15.5468C1.89863 15.8892 1.75 16.2237 1.75 16.5C1.75 16.7763 1.89863 17.1108 2.31712 17.4532C2.73505 17.7952 3.36829 18.0936 4.16065 18.2674C4.56525 18.3561 4.82132 18.7561 4.73259 19.1607C4.64387 19.5653 4.24395 19.8213 3.83935 19.7326C2.87746 19.5217 2.0107 19.1407 1.36719 18.6141C0.724248 18.088 0.25 17.3648 0.25 16.5C0.25 15.6352 0.724248 14.912 1.36719 14.3859C2.0107 13.8593 2.87746 13.4783 3.83935 13.2674Z" fill="#ef4444" />
                  </svg>

                  <p className="text-sm font-medium text-red-500">{availableSlots} Left ! !</p>
                </div>
              )}              
            </div>

            {tags && tags.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <p className="text-sm font-medium text-light-2">Tags:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {tags.map((tag, index) => (
                    <Badge key={index} className="font-semibold bg-dark-3 text-light-4 px-3 py-2">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-6 flex justify-end">
              <Link href="/events">
                <p className="text-blue-500 hover:underline">Back to Events</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* TODO: Add Register Logic for event */}
      <Button className='w-full bg-primary-500'>Register</Button>

      {/* Sign-up Form Section */}
      {/* <div className="bg-white p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Sign Up for the Event</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder-gray-500"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder-gray-500"
                placeholder="Enter your email address"
              />
            </div>
            Additional fields as needed
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div> */}
    </div>
  );
}
