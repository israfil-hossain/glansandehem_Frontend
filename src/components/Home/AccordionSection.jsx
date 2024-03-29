import React from 'react'
import Accordion from '../common/Accordion'
import { useTranslation } from 'react-i18next';


const AccordionSection = () => {
    const { t, i18n } = useTranslation();
    
//   const htmlContent = accordionTitle.textinfo.replace(/\n/g, '<br>')
  return (
    <div className='container flex flex-col items-center justify-center py-20'>
      
        <div className='container mb-10 flex flex-col items-center justify-center '>
          <h1 className='font-poppins text-center   lg:text-[24px] text-[17px] font-[800] text-secondprimary'>
            {t("accordionTitle.title")}
          </h1>
          
        </div>
      

      <Accordion data={t("accordion")} />
    </div>
  )
}

export default AccordionSection
