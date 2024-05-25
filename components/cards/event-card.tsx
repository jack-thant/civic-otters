import clsx from "clsx";
import { Badge } from "@/components/ui/badge";

export interface ContainerProps {
  id: string;
  name?: string;
  img?: string;
  date?: Date;
  description?: string;
  tags?: string[];
  availableSlots?: number;
  venue?: string;
  organizerContact?: any;
}

const Container = ({
  id,
  name,
  img,
  date,
  description,
  tags,
  availableSlots,
  venue,
  organizerContact,
}: ContainerProps) => {
  // Function to format date components
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedDate;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {img && (
        <img
          src={img}
          alt={name}
          className="w-full h-40 object-cover object-center"
        />
      )}
      <div className="p-4">
        <h1 className="text-lg font-semibold text-green-800 mb-2">{name}</h1>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Date:</span> {formatDate(date)}
        </p>
        {venue && (
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">Venue:</span> {venue}
          </p>
        )}
        {availableSlots !== undefined && (
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">Available Slots:</span>{" "}
            {availableSlots}
          </p>
        )}

        {description && (
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">Description:</span> {description}
          </p>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap">
            {tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="mr-2 mb-2">
                <Badge
                  className="font-semibold shadow-md border"
                  variant="outline"
                >
                  {tag}
                </Badge>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Container;
