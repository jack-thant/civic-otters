// pages/events/index.tsx
import { useState } from "react";
import Link from "next/link";
import Container from "@/components/cards/event-card";
import Image from "@assets/cat.png";
import {
  fetchAllOpportunities,
  getOpportunity,
  addNewOpportunity,
} from "@/lib/actions/opportunityActions";

export default async function EventsPage() {
  // Sample data for containers
  const containers = await fetchAllOpportunities();
  return (
    <div className="p-8  bg-gray-100">
      <h2 className="mb-6 text-2xl font-bold text-gray-800 md:text-3xl">
        Volunteer Events
      </h2>
      <p className="mb-6 text-sm font-bold text-gray-800 md:text-l">
        Recommended for you.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {containers.map((container) => (
          <Link key={container._id} href={`/events/${container._id}`}>
            <Container
              id={container._id}
              date={container.date}
              img={container.imageUrl} // Ensure you use the correct property name
              name={container.name}
              description={container.description}
              tags={container.tags}
              availableSlots={container.availableSlots}
              venue={container.venue}
              organizerContact={container.organizerContact}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
