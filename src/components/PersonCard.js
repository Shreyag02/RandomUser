import React from "react";

const PersonCard = ({ person }) => {
  return (
    <div className="h-80 w-72 m-3 mx-1 border border-gray-300 bg-cyan-50 rounded flex justify-center items-center">
      <div className="items-center p-2">
        <img
          src={person?.picture?.large}
          className="rounded-full m-auto border border-gray-300 "
          alt="img"
        />
        <div className="w-full text-center">
          <h1 className="text-xl mt-3">
            {`${person?.name?.title} ${person?.name?.first} ${person?.name?.last}`}
          </h1>

          <div className="text-sm flex w-full justify-center flex-wrap">
            <p className="ml-2">{person?.email}</p>
          </div>

          <p>
            {person?.dob?.age}yrs {person?.gender === "male" ? "M" : "F"}
          </p>

          <div className="text-xs p-2 border-t border-gray-300">
            <p>
              {person?.location?.street?.number},{" "}
              {person?.location?.street?.name}, {person?.location?.city}
            </p>
            <p>
              {person?.location?.state}, {person?.location?.country}-
              {person?.location?.postcode}
            </p>
            <div className="flex w-full justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <p className="ml-3">{person?.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
