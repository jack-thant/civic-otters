"use client";
// pages/events/index.tsx
import { useState } from "react";
import Link from "next/link";
import Container from "@/components/cards/event-card";

export default function EventsPage() {
  // Sample data for containers
  const [containers, setContainers] = useState([
    {
      id: "1",
      title: "Event 1",
      description: "Description for event 1",
      date: "2024-05-01",
      img: "/path/to/image1.jpg",
      tags: ["wow", "cool"],
    },
    {
      id: "2",
      title: "Event 2",
      description: "Description for event 2",
      date: "2024-05-02",
      img: "/path/to/image2.jpg",
      tags: ["wow", "cool"],
    },
    {
      id: "3",
      title: "Event 3",
      description: "Description for event 3",
      date: "2024-05-03",
      img: "/path/to/image3.jpg",
      tags: ["wow", "cool"],
    },
    {
      id: "4",
      title: "Event 4",
      description: "Description for event 4",
      date: "2024-05-04",
      img: "/path/to/image4.jpg",
      tags: ["wow", "cool"],
    },
    {
      id: "5",
      title: "Event 5",
      description: "Description for event 5",
      date: "2024-05-05",
      img: "/path/to/image5.jpg",
      tags: ["wow", "cool"],
    },
    {
      id: "6",
      title: "Event 6",
      description: "Description for event 6",
      date: "2024-05-06",
      img: "/path/to/image6.jpg",
      tags: ["wow", "cool"],
    },
  ]);

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {containers.map((container) => (
          <Link key={container.id} href={`/events/${container.id}`}>
            <Container
              id={container.id}
              date={container.date}
              img={container.img}
              title={container.title}
              description={container.description}
              tags={container.tags}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
