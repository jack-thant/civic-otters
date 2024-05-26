// Import necessary modules
import Search from "@/components/search";
import Table from "@/app/(root)/search/table";
import { Suspense } from "react";
import { fetchAllUsers } from "@/lib/actions/user.actions";

// Define the user interface
interface User {
  id: string;
  name: string;
  username: string;
  role: string;
  dateOfBirth: string;
  interests: string[];
  image: string;
  [key: string]: any; // To handle any additional properties
}

// Define the search parameters interface
interface SearchParams {
  query?: string;
}

// Define the props for the Page component
interface PageProps {
  searchParams?: SearchParams;
}

// The Page component with typed props
async function Page({ searchParams }: PageProps) {
  const users: User[] = await fetchAllUsers();
  const query = searchParams?.query || "";

  return (
    <div className="w-full">
      <h1 className="head-text">Search your OtterPals</h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search your otters" />
      </div>
      <Suspense key={query}>
        <Table query={query} users={users} currUser={users[4]} />
      </Suspense>
    </div>
  );
}

export default Page;
