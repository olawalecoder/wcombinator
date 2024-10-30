import SearchForm from "@/components/SearchForm";
import StartupCard, {StartupTypeCard} from "@/components/StartupCard";
import {STARTUPS_QUERY} from "@/sanity/lib/queries";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";

export const metadata = {
    title: "Home | StartupFunders",
    description: "Where Ideas become reality",
};

export default async function Home({searchParams} :{
    searchParams: Promise<{ query?: string }>
}) {
    const query = (await searchParams).query;

    const params = { search: query || null };

    const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params })

    // console.log(JSON.stringify(posts, null, 2));

    // const posts = [
    //     {
    //         _createdAt: new Date(),
    //         views: 10,
    //         author: {_id: 1, name:"Olawale"},
    //         _id: 1,
    //         description: "This idea is a revolutionary one",
    //         image:
    //         "https://images.unsplash.com/photo-1729396877734-801af2fa5709?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         category: "Animals",
    //         title: "Black Diamond",
    //     },
    //    ];

    return (
        <>
            <section className="pink_container">
                <h1 className="heading">Pitch your startup, <br />
                    Connect with Entrepreneurs </h1>
                <p className="sub-heading !max-w-3xl">
                    Submit Ideas, Vote on Pitches, and Get Noticed In Virtual Competitions
                </p>

                    <SearchForm query={query} />
            </section>

            <section className="section_container">
                <p className="text-30-semibold">
                    {query ? `Search results for "${query}"` : "All Startups"}
                </p>

                <ul className="mt-7 card_grid">
                    {posts?.length > 0 ? (
                            posts.map((post: StartupTypeCard, index: number) => (
                                <StartupCard key={post?._id} post={post} />
                            ))
                        ) : (
                            <p className="no-result">No startups found</p>

                     )
                    }
                </ul>
            </section>

            <SanityLive />
        </>
    )
        ;
}
