import { useEffect, useState } from "react";
import { isValid } from "swedish-postal-code-validator";
import { ChevronsUpDown } from "lucide-react";
import { FrownIcon } from "../common/Icons/Icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { useFormData } from "@/context/FormDataContext";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import Autocomplete from "@mui/material/Autocomplete";
import { postalCodeData } from "@/constants/Data/postalCode";
import TextField from "@mui/material/TextField";
import { Form, Formik } from "formik";
import dateTimeValidation from "@/validations/service_validations/DateTimeValidation";

export default function DateTime({ onSubmit, prevStep }) {
  const { formData, setFormData } = useFormData();
  const [postalCode, setPostalCode] = useState(formData?.postalCode);

  const { t } = useTranslation();
  const [error, setError] = useState("");
  const [pets, setPets] = useState({
    cats: false,
    dogs: false,
    otherPets: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    // Handle date input specifically:
    if (name === "startDate" && type === "datetime-local") {
      const today = new Date().toISOString().slice(0, 16); // Get today's date in ISO format
      e.target.min = today; // Set minimum selectable date to today

      // Potentially add error handling for invalid date formats (optional):
      try {
        new Date(newValue); // Attempt to parse the date
        setFormData((prev) => ({
          ...prev,
          [name]: newValue,
        }));
      } catch (err) {
        console.error(
          'Invalid date format for "startDate". Please use YYYY-MM-DDTHH:mm format.'
        );
        // Optionally display an error message to the user
      }
    } else {
      // Handle other input types as usual
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  const handleSubmit = () => {
    if (!formData.address || !formData.startDate || !postalCode) {
      setError(
        "Please fill in the required fields: Address, Postal Code, or Date & Time"
      );
      return;
    }

    setFormData((prev) => ({
      ...prev,
      postalCode: postalCode,
    }));
    onSubmit();
  };

  return (
    <>
      <Formik
        initialValues={{
          address: "", 

        }}
        validationSchema={dateTimeValidation}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          errors,
          touched,
          isSubmitting,
          handleSubmit,
          setFieldValue,
        }) => <Form></Form>}
      </Formik>

      <div className="w-full rounded-xl bg-white py-5 shadow-lg lg:px-5">
        <h2 className="mb-6 text-center lg:text-[40px] text-[25px] font-semibold">
          {t("service.where")}
        </h2>
        <div className="mb-4  flex lg:flex-row flex-col gap-4 ">
          <input
            type="text"
            className="border-gray-300 px-2 py-3 border w-full"
            placeholder="Street address and number"
            name="address"
            value={formData?.address}
            onChange={handleInputChange}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={postalCodeData}
            sx={{ width: 400 }}
            renderInput={(params) => (
              <TextField {...params} label="PostalCode" sx={{}} />
            )}
          />

          {/* <input
            type="number"
            name="postalCode"
            className="border-gray-300 px-2 py-3 border w-full"
            placeholder="PostalCode"
            defaultValue={postalCode}
            onChange={handlePostalChange}
          /> */}
        </div>

        <PetChecked pets={pets} setPets={setPets} setFormData={setFormData} />

        <div className="mb-4 flex flex-col gap-4">
          <label className=" text-sm font-bold" htmlFor="date-time">
            {t("datetime.dateandtime")}
          </label>
          <input
            id="date-time"
            type="datetime-local"
            name="startDate"
            defaultValue={formData?.startDate}
            className="py-3 px-5 border"
            onChange={handleInputChange}
            min={new Date().toISOString().slice(0, 16)}
          />
        </div>

        {error && (
          <div className="flex items-center rounded-lg bg-red-100 p-4 text-red-700">
            <FrownIcon className="mr-2 text-red-500" />
            <p>{error}</p>
          </div>
        )}
        {postalCode?.length < 4 && !formData?.startDate && (
          <div className="flex items-center rounded-lg bg-red-100 p-4 text-red-700">
            <FrownIcon className="mr-2 text-red-500" />
            <p>
              {
                "Please Fillup Required Filled ( Address or PostalCode or Date and Time) "
              }
            </p>
          </div>
        )}
      </div>

      <div className="container mb-8 mt-4 flex justify-around">
        {/* back button */}
        <button
          className={`cursor-pointer rounded-xl border-2 border-slate-300 bg-green-500 
         px-4 py-2 font-semibold uppercase text-white transition
         ease-in-out hover:bg-primary hover:text-white
       `}
          onClick={prevStep}
        >
          {t("back")}
        </button>

        {/* next button  */}
        <button
          className={`cursor-pointer rounded-xl border-2 border-slate-300 bg-green-500 
                px-4 py-2 font-semibold uppercase text-white transition
                ease-in-out hover:bg-primary hover:text-white
              `}
          onClick={handleSubmit}
        >
          {t("next")}
        </button>
      </div>
    </>
  );
}

function PetChecked(props) {
  const { setPets, pets, setFormData } = props;
  const [isOpen, setIsOpen] = useState(true);

  const handleCheckboxChange = (id) => {
    setPets((prevPets) => ({
      ...prevPets,
      [id]: !prevPets[id], // Toggle the value
    }));
  };

  useEffect(() => {
    // Whenever the pets state changes, update the form data
    setFormData((prev) => ({
      ...prev,
      hasCats: pets.cats ? true : null,
      hasDogs: pets.dogs ? true : null,
      hasOtherPets: pets.otherPets ? true : null,
    }));
  }, [pets]);

  return (
    <div className="mb-4 bg-slate-100 lg:w-80 w-full px-2 py-5 ">
      <div className="mb-2 flex items-center">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-[350px] space-y-2"
        >
          <div className="flex items-center justify-between space-x-4 px-4">
            <h4 className="text-sm font-semibold">{t("datetime.pets")}</h4>
            <CollapsibleTrigger asChild>
              <button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2 ml-5">
            <p className="text-gray-600 mt-1 text-sm">
              {t("datetime.what_kind")}
            </p>
            <div className="rounded-md border px-4 py-3 font-mono text-sm flex space-x-4 bg-white">
              <div className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  id="cats"
                  checked={pets.cats}
                  onChange={() => handleCheckboxChange("cats")}
                />
                <label className="ml-2 text-sm font-medium" htmlFor="cats">
                  Cats
                </label>
              </div>
              <div className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  id="dogs"
                  checked={pets.dogs}
                  onChange={() => handleCheckboxChange("dogs")}
                />
                <label className="ml-2 text-sm font-medium" htmlFor="dogs">
                  Dogs
                </label>
              </div>
              <div className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  id="other-pets"
                  checked={pets.otherPets}
                  onChange={() => handleCheckboxChange("otherPets")}
                />
                <label
                  className="ml-2 text-sm font-medium"
                  htmlFor="other-pets"
                >
                  Other pets
                </label>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
