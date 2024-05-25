'use client'
// import React, { useState, useEffect } from "react";
import Search from '@/components/search';
import Table from '@/app/(root)/search/table';
import { Suspense } from "react";

export default function Page({
    searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {

    const query = searchParams?.query || '';

    return (
        <div className="w-full">
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search your otters"/>
            </div>
            <Suspense key={query}>
                <Table query={query}/>
            </Suspense>
        </div>
    )
}
