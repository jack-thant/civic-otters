// pages/events/[id].tsx (or wherever your event details page is located)
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export interface EventDetailFormProps {
  event?: {
    title: string;
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

  const { title, date, description, imageUrl, venue, availableSlots, organizerContact, tags } = event;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Event Image and Details Section */}
      <div className="flex-grow p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              {imageUrl && (
                <div className="mb-4">
                  <Image
                    src={imageUrl}
                    alt={title}
                    width={600}
                    height={400}
                    className="rounded-lg object-cover"
                  />
                </div>
              )}
              <h1 className="text-3xl font-semibold text-gray-800">{title}</h1>
              <p className="text-sm text-gray-600">{formatDate(date)}</p>
              <p className="mt-4 text-gray-700">{description}</p>
            </div>
            {venue && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-600">Venue: {venue}</p>
              </div>
            )}
            {availableSlots !== undefined && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-600">Available Slots: {availableSlots}</p>
              </div>
            )}
            {organizerContact && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-600">Organizer Contact: {organizerContact}</p>
              </div>
            )}
            {tags && tags.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-600">Tags:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {tags.map((tag, index) => (
                    <Badge key={index} className="text-sm font-semibold py-1 px-2 bg-gray-200 rounded-md">
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

      {/* Sign-up Form Section */}
      <div className="bg-white p-4 md:p-8">
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
            {/* Additional fields as needed */}
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
      </div>
    </div>
  );
}
