import Link from 'next/link';

export interface EventDetailFormProps {
  event?: {
    title: string;
    date: string;
    description: string;
  };
}

// Event detail component
  export default function EventDetailPage({ event }: EventDetailFormProps) {
    if (!event) {
      return <p>Loading...</p>; // Handle loading state or error when event is not available
    }
  
    const { title, date, description } = event;
  
    return (
      <main className="max-w-4xl mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Event Details Section */}
          <div className="rounded-md bg-gray-50 p-4 md:p-6 flex flex-col justify-center">
            <div className="mb-4">
              <label htmlFor="eventName" className="mb-2 block text-sm font-medium">
                Event Name
              </label>
              <p className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500">
                {title}
              </p>
            </div>
  
            <div className="mb-4">
              <label htmlFor="eventDate" className="mb-2 block text-sm font-medium">
                Event Date
              </label>
              <p className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500">
                {date}
              </p>
            </div>
  
            <div className="mb-4">
              <label htmlFor="eventDescription" className="mb-2 block text-sm font-medium">
                Event Description
              </label>
              <p className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500">
                {description}
              </p>
            </div>
  
            {/* Navigation Link */}
            <div className="mt-6 flex justify-end">
              <Link href="/events">
                <p className="text-blue-500 hover:underline">Back to Events</p>
              </Link>
            </div>
          </div>
  
          {/* Sign-up Form Section */}
          <div className="rounded-md bg-gray-50 p-4 md:p-6 flex flex-col justify-center">
            <h2 className="text-xl font-semibold mb-4">Sign Up for the Event</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
                  placeholder="Enter your full name"
                />
              </div>
  
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
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
      </main>
    );
  }