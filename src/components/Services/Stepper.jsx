import React, { useEffect, useState, useRef } from "react";

const Stepper = (props) => {
  const { currentStep, steps } = props;
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;
    while (count < newSteps.length) {
      //current step
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          heighlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      }
      // step completed
      else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          heighlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      }
      // step pending
      else {
        newSteps[count] = {
          ...newSteps[count],
          heighlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }
    return newSteps;
  };

  useEffect(() => {
    // create object
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    );
    stepRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => (
    <div
      className={` ${
        index !== newStep.length - 1
          ? "flex flex-row  items-center w-[126px]"
          : "flex  items-center  "
      }`}
      key={index}
    >
      <div className="relative  flex flex-col items-center text-teal-600">
        <div
          className={`flex flex-row h-8 w-8 items-center justify-center rounded-full border-2 border-gray
                  transition duration-500 ease-in-out ${
                    step.selected
                      ? "border border-green-600 bg-green-600 font-bold text-white"
                      : ""
                  }`}
        >
          {/* Display number  */}
          <span>
            {step.completed ? (
              <span className="text-md font-bold text-white">&#10003;</span>
            ) : (
              index + 1
            )}
          </span>
        </div>
        <div
          className={`absolute top-0 mt-8 items-start flex flex-row justify-start w-[65px] -left-4 `}
        >
          {/* Display description  */}
          <span
            className={`w-full pt-2 text-center text-[10px]  font-medium uppercase ${
              step.highlighted ? "text-black " : "text-gray-400"
            }`}
          >
            {step.description}
          </span>
        </div>
      </div>
      <div
        className={`flex-auto  border-t-2 border-gray transition duration-500 ease-in-out ${
          step.completed ? "border-green-600" : "border-gray"
        }`}
      >
        {/* Display line  */}
      </div>
    </div>
  ));

  return (
    <div className=" flex flex-row items-center justify-center mb-10 mt-5  ">
      {displaySteps}
    </div>
  );
};

export default Stepper;
