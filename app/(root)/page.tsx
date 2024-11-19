import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERIES } from "@/lib/queries";
import { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;

  const params = { search: query || null }


  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERIES, params })


  return (
    <>
      <section className="pink_container">

        <h1 className=" heading">Pitch Your Startup, <br /> Connect With Entrepreneures </h1>
        <p className="sub-heading !max-w-3xl">Submit Iseas, Vote on Pitches, and Get Noticed in Virtual, Competitions</p>

        <SearchForm query={query} />
      </section>
      <section className=" section_container">
        <p className="text-30-semibold">
          {query ? `Search Results for:   "${query}"` : "All startups"}
        </p>

        <ul className=" mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard, index: number) => (
              <StartupCard key={post._id} post={post} />
            ))) : (
            <p className="text-center no-results">No results found</p>

          )}
        </ul>

      </section>

      <SanityLive />
    </>
  );
}
