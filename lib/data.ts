// @/lib/data.ts

// Placeholder function to fetch event by ID
export const fetchEventById = async (id: string) => {
  // Here you can hardcode some sample data or return predefined values
  const events = [
      { id: '1', title: 'Event 1', description: 'Description for event 1', date: '2024-05-01', img: '/path/to/image1.jpg', tags: ["wow", "cool"] },
      { id: '2', title: 'Event 2', description: 'Description for event 2', date: '2024-05-02', img: '/path/to/image2.jpg' },
      { id: '3', title: 'Event 3', description: 'Description for event 3', date: '2024-05-03', img: '/path/to/image3.jpg' },
      { id: '4', title: 'Event 4', description: 'Description for event 4', date: '2024-05-04', img: '/path/to/image4.jpg' },
      { id: '5', title: 'Event 5', description: 'Description for event 5', date: '2024-05-05', img: '/path/to/image5.jpg' },
      { id: '6', title: 'Event 6', description: 'Description for event 6', date: '2024-05-06', img: '/path/to/image6.jpg' },
  ];

  // Simulate async behavior with setTimeout (replace with actual async logic)
  return new Promise((resolve) => {
      setTimeout(() => {
          const event = events.find((event) => event.id === id);
          resolve(event);
      }, 500); // Simulate delay
  });
};
