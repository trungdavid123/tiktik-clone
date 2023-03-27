import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react';
import { fetchGoogleResponse } from '@/utils';
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { useRouter } from 'next/router';
import logo from "../public/logo.png"; 

const Navbar = () => {
  const { data, status } = useSession();
  const [searchValue, setSearchValue] = useState(''); 
  const authenticated = "authenticated";  
  const router = useRouter(); 
  // if (status === 'loading') return <h1> loading... please wait</h1>;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if(searchValue){
      router.push(`/search/${searchValue}`)
    }
  }

  useEffect(() => {
    if(status === "authenticated"){
      fetchGoogleResponse(data)
    }
  }, [data, status])

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href="/">
        <div className='w-[100px] md:w-[130px]'>
          <Image height={100} width={50} className='cursor-pointer' src={logo} alt='logo' />
        </div>
      </Link>
      <div className='relative hidden md:block'>
        <form onSubmit={handleSearch} className="absolute md:static top-10 left-20 bg-white"> 
          <input type="text" value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}} placeholder="Search accounts and videos" className=' w-[350px] rounded-full bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300'/>
          <button onClick={handleSearch} className="absolute md:right-5 right-6 top-3 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400">
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {status === authenticated ? (
          <div className='flex gap-5 md:gap-10 items-center'>
            <Link href="/upload">
              <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                <IoMdAdd className='text-xl' /> {` `}
                <span className='hidden md:block'>Upload</span>
              </button>
            </Link>
            {data.user?.image && (
              <Link href={`/profile/${data.id}`}>
                <>
                  <Image width={40} height={40} className="rounded-full cursor-pointer" src={data.user?.image} alt="r" />
                </>
              </Link>
            )}
            <button
              type='button'
              className='px-2'
              onClick={() => signOut()}
            >
              <AiOutlineLogout color='red' fontSize={21} />
            </button>
          </div>
        ) : (
          <div className='hidden xl:block'>
            <div className='pr-4'>
              <button
                className='cursor-pointer px-6 py-2 bg-white text-lg text-[#F51997] border-[1px] border-[#F51997] font-semibold rounded-md outline-none w-full hover:text-white hover:bg-[#F51997]'
                onClick={() => signIn('google')}>Log in</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar