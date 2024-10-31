import React from 'react'
import {STARTUPS_BY_ID_QUERY} from "@/sanity/lib/queries";
import {client} from "@/sanity/lib/client";
import {notFound} from "next/navigation";

export const experimental_ppr = true;

const Page = async ({ params } : {params: Promise<{ id: string }>}) => {
    const id = (await params).id;

    const post = await client.fetch(STARTUPS_BY_ID_QUERY, { id });

    if (!post) return notFound();

    return (
        <>
           <h1 className="text-3xl text-black">{post.title}</h1>
        </>
    )
}
export default Page
