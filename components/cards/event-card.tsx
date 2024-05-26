import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

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
    <div className="bg-dark-2 shadow-lg rounded-lg overflow-hidden">
      {img && (
        <img
          src={img}
          alt={name}
          className="w-full h-40 object-cover object-center"
        />
      )}
<<<<<<< HEAD
      <div className="p-4">
        <h1 className="text-lg font-semibold text-green-800 mb-2">{name}</h1>
        
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Date:</span> {formatDate(date)}
=======
      <div className="flex flex-col gap-2 p-4">
        <p className="text-xs font-bold text-secondary-500 mb-2">
          {formatDate(date)}
>>>>>>> b36474ce26f531d84b8c8da098d56722543292d7
        </p>
        <h3 className="text-heading3-bold text-primary-500">{name}</h3>
        {/* {description && (
          <p className="mt-2 text-small-regular text-light-2">
            {description}
          </p>
        )} */}

        {venue && (
          <div className="flex flex-row items-center gap-x-2">
            <Image src="./assets/map-pin.svg" alt='map-pin' width={18} height={18}/>
            <p className="subtle-medium text-light-2 ">
              {venue}
            </p>
          </div>

        )}
        {availableSlots !== undefined && (
          <div className="flex flex-row items-center gap-x-2">
          <Image src="./assets/community.svg" alt='map-pin' width={18} height={18}/>
          <p className="subtle-medium text-light-2 ">
            {availableSlots}{" slots left"}
          </p>
        </div>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap mt-3">
            {tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="mr-2 mb-2">
                <Badge
                  className="font-semibold bg-dark-3 text-light-4 px-3 py-2"
                  variant="default"
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
