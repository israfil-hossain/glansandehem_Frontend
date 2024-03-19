import { houseClean } from '@/public/assets'
import Image from 'next/image'
import React from 'react'

const Section = ({ text }) => {
  return (
    <div className='flex w-full flex-col-reverse justify-between lg:flex-row min-h-[50vh] lg:mt-5 mt-16'>
      <div className='lg:w-1/2 flex justify-center items-center '>
        <Image
          src={houseClean}
          alt='houseClean'
          width={500}
          height={500}
          className='w-96 h-96 rounded-full p-5 shadow-md shadow-secondprimary'
        />
      </div>
      <div className='lg:w-1/2 flex flex-col justify-center items-center px-4'>
        <h4 className="lg:text-[30px] py-3 text-center pt-5 text-[22px] font-[800]  text-transparent  bg-gradient-to-r from-secondprimary  via-purple-500 to-primary bg-clip-text ">{text.title}</h4>
        <p className='text-lg py-5 font-[400] text-secondprimary pt-5 lg:text-start text-center'>{text.subtitle}</p>
      </div>
    </div>
  )
}

export default Section
