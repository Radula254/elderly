import { useState } from "react";
import { format, parseISO, isValid } from "date-fns";
import Select from "react-select";
import countriesList from "react-select-country-list";
import UploadImage from "./UploadImage";
import Link from "next/link";

export default function CaregiverForm({ user, onSave }) {
  const [image, setImage] = useState(user?.image || "");
  const [userName, setUserName] = useState(user?.name || "");
  const [DOB, setDOB] = useState(user?.DOB || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [caregiver, setCaregiver] = useState(user?.caregiver || true);

  const today = format(new Date(), "yyyy-MM-dd");

  const handleDOBChange = (ev) => {
    const dateValue = ev.target.value;
    if (isValid(parseISO(dateValue))) {
      setDOB(dateValue);
    } else {
      setDOB("");
    }
  };

  function handleCityChange(ev) {
    setCity(ev.target.value);
    setCaregiver(true);
  }

  const options = countriesList().getData();

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%",
      borderRadius: "8px",
      boxShadow: "none",
      background: "#F3F4F6",
      borderColor: "#D1D5DB",
    }),
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-white shadow-lg rounded-xl">
      <div className="flex justify-center">
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <UploadImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={(ev) => {
          ev.preventDefault();
          onSave(ev, {
            name: userName,
            image,
            caregiver,
            city,
            DOB,
            phone,
            country,
            gender,
          });
        }}
      >
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">
            First and Last Name:
          </label>
          <input
            type="text"
            placeholder="First and last name"
            value={userName}
            onChange={(ev) => setUserName(ev.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Email:</label>
          <input
            type="email"
            disabled={true}
            value={user?.email}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Date of Birth:</label>
          <input
            type="date"
            placeholder="Date of Birth"
            value={DOB ? format(parseISO(DOB), "yyyy-MM-dd") : ""}
            onChange={handleDOBChange}
            max={today}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Gender:</label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="male"
                checked={gender === "male"}
                onChange={(ev) => setGender(ev.target.value)}
                required
                className="form-radio h-4 w-4 text-blue-600 border-gray-300 mr-2"
              />
              Male
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="female"
                checked={gender === "female"}
                onChange={(ev) => setGender(ev.target.value)}
                required
                className="form-radio h-4 w-4 text-blue-600 border-gray-300 mr-2"
              />
              Female
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Phone Number:</label>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>City:</label>
          <input
            type="text"
            placeholder="City"
            value={city}
            required
            onChange={handleCityChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Country:</label>
          <Select
            options={options}
            value={options.filter((option) => option.value === country)}
            onChange={(selectedOption) => setCountry(selectedOption.value)}
            className="w-full border border-gray-300 rounded-lg bg-gray-100"
            styles={customStyles}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Request to be a Caregiver
        </button>
      </form>
    </div>
  );
}
