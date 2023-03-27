import { BASE_URL } from '@/utils'
import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import VideoCard from '@/components/VideoCard';
import NoResults from '@/components/NoResults';
import { IUser, Video } from '@/types';
import { useRouter } from 'next/router';


const Search = ({ videos, users }: { videos: Video[], users: IUser[] }) => {
    const [isAccounts, setIsAccounts] = useState(false);
    const router = useRouter();
    const { searchTerm }: any = router.query;

    const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
    const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';

    const searchedAccounts = users.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className='w-full'>
            <div className='flex gap-10 mb-10 mt-10 border-b-2 pb-2 border-gray-200 bg-white'>
                <p className={`text-xl font-semibold cursor-pointer ${accounts} mt-2`} onClick={() => setIsAccounts(true)}>Accounts</p>
                <p className={`text-xl font-semibold cursor-pointer ${isVideos} mt-2`} onClick={() => setIsAccounts(false)}>Videos</p>
            </div>
            {isAccounts ? (
                <div className='md:mt-16'>
                   {searchedAccounts.length > 0 ? (
                    searchedAccounts.map((user: IUser, idx: number) => (
                        <Link href={`/profile/${user._id}`} key={user._id}>
                        <div className='flex p-2 cursor-pointer font-semibold border-b-2 border-gray-200 gap-3'>
                          <div>
                            <Image
                              src={user.image}
                              width={50}
                              height={50}
                              alt="user profile"
                              className='rounded-full'
                            />
                          </div>
                          <div className='hidden xl:block'>
                            <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                              {user.userName.replaceAll(' ', '')}
                              <GoVerified className='text-blue-400' />
                            </p>
                            <p className='capitalize text-gray-400 text-xs'>
                              {user.userName}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))
                   ): (<NoResults text={`No video results for ${searchTerm}`} />)}
                </div>
            ) : (
                <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
                    {videos?.length ? (
                        videos.map((video: Video, idx: number) => (
                            <VideoCard post={video} key={idx} />
                        ))
                    ) : <NoResults text={`No video results for ${searchTerm}`} />
                    }
                </div>
            )}
        </div>
    )
}

export default Search




export const getServerSideProps = async ({ params: { searchTerm } }: { params: { searchTerm: string } }) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
    const data = await axios.get(`${BASE_URL}/api/users`);


    return {
        props: { videos: res.data, users: data.data }
    }
}