import { auth, signIn, signOut } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavBar = async () => {
    const session = await auth()
    return (
        <div className=' px-10 py-3 bg-white shadow-sm font-work-sans'>
            <nav className=' flex justify-between items-center'>
                <Link href={"/"}>
                    <Image src={"/logo.png"} alt='' width={114} height={30} />
                </Link>

                <div className='  flex items-center gap-5'>
                    {session && session.user ? (
                        <>
                            <Link className=' text-black' href={"/startup/create"}>
                                <span>
                                    Create
                                </span>
                            </Link>
                            <form action={async () => {
                                "use server"
                                await signOut()
                            }}>
                                <button type='submit' className=' text-black'>Log Out</button>
                            </form>
                            <Link className=' text-black' href={`/user/${session?.user?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : <>
                        <form action={async () => {
                            "use server"
                            await signIn()
                        }}>
                            <button className=' text-black' type='submit'>
                                Login
                            </button>
                        </form>
                    </>}
                </div>
            </nav >
        </div >
    )
}

export default NavBar