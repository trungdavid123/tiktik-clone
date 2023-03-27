import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import { GoVerified } from 'react-icons/go'
import NoResults from './NoResults';
import { BASE_URL } from '@/utils';
import axios from 'axios';
import { IUser } from '@/types';

interface IProps {
  isPostingComment: boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent<Element>) => void;
  comments: IComment[]
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string, _id: string }
}

const Comments = ({ comment, comments, addComment, isPostingComment, setComment }: IProps) => {

  const { status } = useSession();
  const userProfile = status === "authenticated";

  const [accounts, setAccounts] = useState([]);

  async function showAccounts() {
    const { data } = await axios.get(`${BASE_URL}/api/users`);

    setAccounts(data);
  }

  useEffect(() => {
    showAccounts();
  }, [])



  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll lg:h-[475px]'>
        {comments?.length ? (
          comments.map((item, idx) => (
            <>
              {accounts.map((user: IUser) => (
                user._id === (item.postedBy._id || item.postedBy._ref) && (
                  <div className='p-2 items-center' key={idx}>
                    <Link href={`/profile/${user._id}`} key={user._id}>
                      <div className='flex items-center gap-3'>
                        <div className='w-8 h-8'>
                          <Image
                            src={user.image}
                            width={34}
                            height={34}
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
                    <div>
                      <p>{item.comment}</p>
                    </div>
                  </div>
                )
              ))}
            </>
          ))
        ) : (
          <NoResults text='No comments yet!' />
        )}
      </div>
      {userProfile && (
        <div className='absolute bottom-0 left-0 pb-6 px-2 md:px-4'>
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => { setComment(e.target.value) }}
              placeholder="Add comment..."
              className='bg-primary px-6 py-3 text-md font-medium border-2 w-[250px] md:w-[600px] lg:w-[270px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'

            />
            <button onClick={addComment} className='text-sm text-gray-400'>
              {isPostingComment ? 'Commenting...' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comments