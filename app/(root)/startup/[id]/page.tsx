import { STARTYP_BY_ID } from '@/lib/queries';
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import React from 'react'

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

    const post = await client.fetch(STARTYP_BY_ID, { id })
    if (!post) {
        return notFound()
    }
    return (
        <>
            <section className=' pink_container !min-h-[230px] '>
                <p className='tag'>{formatDate(post?._createdAt)}</p>
                <h1 className='heading'>
                    {post.title}
                </h1>
                <p className=' sub-heading !max-w-5xl'>{post.description}</p>
            </section>

            <section className=' section_container'>
                <img src={post.image} alt="" />

            </section>
        </>
    )
}

export default Page