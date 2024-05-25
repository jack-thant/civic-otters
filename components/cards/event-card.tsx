import clsx from "clsx";
import { Badge } from "@/components/ui/badge";

export interface ContainerProps {
  id: string;
  title?: string;
  img?: string;
  date?: String;
  description?: string;
  tags?: string[];
}

const Container = ({
  id,
  title,
  img,
  date,
  description,
  tags,
}: ContainerProps) => {
  return (
    <div className="flex justify-between mb-4">
      <div
        className={clsx(
          "relative flex-none w-full p-4 bg-white rounded-lg shadow-md border"
        )}
      >
        {img && (
          <img
            src={img}
            alt={title}
            className="w-full h-32 object-cover rounded-t-lg"
          />
        )}
        <div className="flex flex-col mb-4">
          <div className="flex items-center justify-between">
            <h1 className="p-2 text-green-800 text-lg font-semibold">
              {title}
            </h1>
          </div>
          <p className="p-2 text-gray-600 text-sm">{date}</p>
          <p className="p-2 text-gray-600 text-sm">{description}</p>
        </div>
        {tags && tags.length > 0 && (
          <div className="p-2 flex flex-wrap">
            {tags.slice(0, 3).map((tag, index) => (
              <span key={index}>
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
