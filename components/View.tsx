import React from 'react'
import Ping from "@/components/Ping";
import {client} from "@/sanity/lib/client";
import {STARTUPS_VIEWS_QUERY} from "@/sanity/lib/queries";

const View = async ({ id } :{ id: string }) => {
    const {views: totalViews} = await client.withConfig({useCdn: false}).fetch(STARTUPS_VIEWS_QUERY,{ id } )

    return (
        <div className="view-container">
            <div className="absolute -top-2 -right-2">
                <Ping/>
            </div>
            <p className="view-text">
                <span className="font-regular">{totalViews.toLocaleString()} view{totalViews !== 1 ? 's' : ''}</span>
            </p>
        </div>
    )
}
export default View
