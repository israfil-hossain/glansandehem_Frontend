'use client'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import { FaBullseye } from 'react-icons/fa'

const CarouselSlider = ({ slider }) => {
  let settings = {
    dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          speed: 1000
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <div className='my-15 '>
      <div className='flex flex-row items-center justify-center py-10'>
        <h2 className='text-center text-[26px] font-[700] text-primary'>
          CLEANING SERVICES WE OFFER YOU
        </h2>
      </div>
      <div className='mb-10 overflow-hidden lg:mx-40  min-h-[55vh]'>
        <Slider {...settings}>
          {slider?.map((item) => (
            <div key={item?.id} className='  w-full mb-5'>
              <div className='mx-5 h-[320px]  border border-primary flex flex-col justify-between items-center'>
                <Image
                  src={item?.image}
                  alt={item?.title}
                  width={500}
                  height={500}
                  className='w-full h-[270px]'
                />
                <h1 className='text-[18px] font-semibold text-center py-2'>{item.title}</h1>
              </div>
            </div>
          ))}
         
        </Slider>
      </div>
    </div>
  )
}

export default CarouselSlider
