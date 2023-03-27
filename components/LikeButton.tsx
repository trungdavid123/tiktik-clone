import React, { useState, useEffect } from 'react'
import { MdFavorite } from 'react-icons/md'
import { useSession } from 'next-auth/react';
import { NextPage } from 'next';

interface IProps {
    handleLike: () => void;
    handleDislike: () => void;
    likes: any[]
}

const LikeButton: NextPage<IProps> = ({ likes, handleDislike, handleLike }) => {

    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const [totalLikes, setTotalLikes] = useState(likes?.length);
    const { data, status } = useSession();
    const filterLikes = likes?.filter((item) => item._ref === data?.id)


    const handleBtn = () => {
        if (alreadyLiked) {
            setAlreadyLiked(false); 
            setTotalLikes(prev => prev - 1);
            handleDislike();
        } else {
            setAlreadyLiked(true)
            setTotalLikes(prev => prev + 1);
            handleLike();
        }
    }

    useEffect(() => {
        if (filterLikes?.length > 0) {
            setAlreadyLiked(true)
        } else {
            setAlreadyLiked(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='flex gap-6'>
            <div className='mt-2 flex flex-col justify-center items-center cursor-pointer'>
                {alreadyLiked ? (
                    <div className='bg-primary rounded-full p-2 md:p-4 text-[#F51997]' onClick={() => handleBtn()}>
                        <MdFavorite className='text-lg md:text-2xl' />
                    </div>
                ) : (
                    <div className='bg-primary rounded-full p-2 md:p-4' onClick={() => handleBtn()}>
                        <MdFavorite className='text-lg md:text-2xl' />
                    </div>
                )}
                <p className='text-md font-semibold'>{totalLikes || 0}</p>
            </div>
        </div>
    )
}

export default LikeButton