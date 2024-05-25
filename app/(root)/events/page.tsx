// pages/events/index.tsx
import { useState } from "react";
import Link from "next/link";
import Container from "@/components/cards/event-card";
import Image from "@assets/cat.png";
import {
  fetchAllOpportunities,
  getOpportunity,
  addNewOpportunity,
} from "@/lib/actions/opportunity.actions";

export default async function EventsPage() {
  // Sample data for containers
  const containers = await fetchAllOpportunities();
  return (
    <main>
      <h1 className='head-text mb-5'>Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
    </main>
  );
}