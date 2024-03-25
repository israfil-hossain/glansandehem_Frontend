import { useTranslation } from "react-i18next";
import Item from "./Item";
import { useState } from "react";

const Accordion = ({ backgroundColor, data }) => {
  const [ActiveIndex, setActiveIndex] = useState(null);
  const { t, i18n } = useTranslation();

  const handleToggle = (index) => {
    setActiveIndex(ActiveIndex === index ? null : index);
  };

  return (
    <div
      id="accordion-wrapper"
      className="flex flex-col gap-0 max-w-[800px] w-full mx-auto rounded-xl   overflow-hidden"
    >
      {t("accordion", { returnObjects: true })?.map((faq, i) => (
        <Item
          key={i}
          answerID={`answer-${i + 1}`}
          questionID={`question-${i + 1}`}
          isActive={ActiveIndex === i}
          onClick={() => handleToggle(i)}
          question={t(`accordion.${i}.question`)} // Accessing question translation
          answer={t(`accordion.${i}.answer`)} // Accessing answer translation
          ariaExpanded={ActiveIndex === i ? true : false}
          backgroundColor={backgroundColor}
        />
      ))}
    </div>
  );
};

export default Accordion;

// ref: Accordion use in tailwind css
// https://github.com/alexandrezahrai/accordion-react-tailwind
