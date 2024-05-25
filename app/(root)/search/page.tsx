// import React, { useState, useEffect } from "react";
import Search from '@/components/search';
import Table from '@/app/(root)/search/table';
import { Suspense } from "react";
import { fetchAllUsers, getUser } from '@/lib/actions/user.actions';

export default async function Page({
    searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {

    const users = await fetchAllUsers();
    const query = searchParams?.query || '';

    return (
        <div className="w-full">
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search your otters"/>
            </div>
            <Suspense key={query}>
                <Table query={query} users={users}/>
            </Suspense>
        </div>
    )
}
