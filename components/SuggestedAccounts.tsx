import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { BASE_URL, fetchAllUsers } from '@/utils';
import { IUser } from '@/types';
import axios from 'axios';




const SuggestedAccounts = () => {

  const [accounts, setAccounts] = useState([]);

  async function showAccounts() {
    const { data } = await axios.get(`${BASE_URL}/api/users`);

    setAccounts(data);
  }

  useEffect(() => {
    showAccounts();
  }, [])


  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>Suggested Accounts</p>

      <div>
        {accounts?.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
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
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts

