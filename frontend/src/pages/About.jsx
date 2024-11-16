import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
           <Title text1={'ABOUT '} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
         <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
         <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate nobis iste odio velit voluptatem dolorem, doloremque fuga nostrum perspiciatis quaerat eius quod consectetur maxime expedita eos, illo ratione minima! Beatae.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic aut ipsum voluptatum dignissimos, ullam voluptate quisquam provident et, pariatur ea numquam beatae ipsam culpa repellendus tempora rem, minima dolorem dolore?</p>
              <b className='text-gray-800'>Our Mission</b>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui itaque quisquam amet perferendis dolor magnam repellendus dolores aliquid! Unde, consectetur modi asperiores quaerat fugit illum laborum aliquid. Nihil, quam provident!</p>
         </div>
         </div>
         <div className='text-4xl  py-4'>
              <Title text1={'WHY '} text2={'CHOOSE US'}/>
         </div>
         <div className='flex flex-col md:flex-row text-sm mb-20'>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
             <b>Quality Assuarnce:</b>
             <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat quia, recusandae culpa atque suscipit exercitationem architecto expedita soluta dolores odit incidunt libero facilis consequatur animi alias sint accusamus necessitatibus deserunt?</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
             <b>Convenience:</b>
             <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat quia, recusandae culpa atque suscipit exercitationem architecto expedita soluta dolores odit incidunt libero facilis consequatur animi alias sint accusamus necessitatibus deserunt?</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
             <b>Exceptional Customer Service:</b>
             <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat quia, recusandae culpa atque suscipit exercitationem architecto expedita soluta dolores odit incidunt libero facilis consequatur animi alias sint accusamus necessitatibus deserunt?</p>
            </div>
         </div>
         <NewsletterBox/>
    </div>
  )
}

export default About
