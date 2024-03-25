const Item = ({
  answerID,
  questionID,
  question,
  answer,
  isActive,
  onClick,
  ariaExpanded,
  backgroundColor = "bg-indigo-100",
}) => {
  return (
    <div className="item overflow-hidden">
      <div className="text-secondprimary font-medium overflow-hidden">
        <button
          type="button"
          role="button"
          id={questionID}
          className={`w-full flex gap-4 items-center justify-between p-5 transition-colors duration-100 ease-in focus:ring-4 focus:ring-gray-200 hover:${
            backgroundColor ? backgroundColor : "bg-indigo-100"
          } ${isActive ? backgroundColor : ""}`}
          onClick={onClick}
          aria-expanded={ariaExpanded}
          aria-controls={answerID}
        >
          <h2 className="text-left">{question}</h2>
          <span className="sr-only">{isActive ? "Hide" : "Show"}</span>
          <svg
            data-accordion-icon
            className={`w-3 h-3 shrink-0 transition-transform duration-300 ease-in-out ${
              isActive ? "rotate-180" : "rotate-0"
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </div>
      <div
        id={answerID}
        aria-labelledby={questionID}
        className={`transition-all duration-500 ease-in-out h-full ${
          isActive ? "max-h-[300px] opacity-100" : "max-h-[0px] opacity-0"
        }`}
      >
        <p className="text-gray-500 p-5">{answer}</p>
      </div>
    </div>
  );
};

export default Item;
