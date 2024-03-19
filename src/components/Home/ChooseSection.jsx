import {  officeClean } from '@/public/assets'
import Image from 'next/image'
import React from 'react'

const ChooseSection = ({ text }) => {
  return (
    <div className='flex w-full flex-col-reverse justify-between lg:flex-row min-h-[50vh] lg:mt-5 mt-16 mb-20'>
      <div className='lg:w-1/2 flex justify-center items-center lg:pt-2 pt-5'>
        <Image
          src={officeClean}
          alt='houseClean'
          width={500}
          height={500}
          className='lg:w-[500px] lg:h-[400px] w-96 h-48  rounded-4xl  shadow-md shadow-secondprimary lg:p-3 '
        />
      </div>
      <div className='lg:w-1/2 flex flex-col justify-start items-start px-4'>
        <h4 className="lg:text-[30px] text-center pt-5 text-[20px] font-[800]  text-transparent  bg-gradient-to-r from-secondprimary  via-purple-500 to-primary bg-clip-text ">{text.title}</h4>
        <p className='text-lg font-[400] text-secondprimary pt-5 lg:text-start text-center'>{text.subtitle}</p>
      </div>
    </div>
  )
}

export default ChooseSection
