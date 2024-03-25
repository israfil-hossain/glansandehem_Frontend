import React from 'react'


const ContactSection = () => {
  return (
    <div className='bg-image min-h-[60vh] mb-10 w-[90%] rounded-lg container flex lg:flex-row flex-col justify-center items-center gap-x-10'>
        <div className='w-1/2'>
            <h3 className='text-xl text-white'>Interested but need more information ? </h3>
            <p className='text-lg text-white'>{" We've got you. Leave your details here and one of our friendly Glänsandehem will contact you right away"}  </p>
        </div>
        <div className='min-w-[350px]'>
            <div className='bg-white rounded-xl  h-96 flex flex-col justify-center items-center w-full'>
                <input type="text" placeholder='Phone Number' className='w-80 border border-gray rounded-md p-4 my-4' />
                <input type="text" placeholder='Email' className='w-80 border rounded-md border-gray p-4 my-4' />
                <textarea  placeholder='Anything else' className='w-80 h-16 border border-gray rounded-md p-4 my-4' />
                <div className='flex w-full justify-end items-end mr-4 mt-5'>
                    <button type="submit" className=' rounded-full p-2  px-5 bg-primary text-white '>I am interested in home cleaning</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactSection