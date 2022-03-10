import React, { useEffect, useState, useRef, useCallback } from "react";

import Axios from "axios";
import clsx from "clsx";
import PersonCard from "./components/PersonCard";
import Loader from "./components/Loader";

const fetchUsers = async (genderParam = "male", limit = 3) => {
  try {
    const response = await Axios.get(
      `https://randomuser.me/api/?gender=${genderParam}&results=${limit}`
    );
    return response.data.results;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default function App() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(3);
  const [gender, setGender] = useState("male");
  const [processing, setProcessing] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const topRef = useRef(null);

  const fetchData = async (gender = "male", limit = 3, refresh = false) => {
    setButtonLoader(true);
    if (refresh) {
      // To show loader in the center of the page
      setProcessing(true);
    }
    const data = await fetchUsers(gender, limit);
    if (refresh) {
      // overwritting the data
      setData(data);
      setProcessing(false);
    } else {
      // Appending the data
      setData((prevData) => [...prevData, ...data]);
    }
    setButtonLoader(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handling Gender Change
  const onGenderChange = useCallback(
    (gender) => {
      setGender(gender);
      fetchData(gender, limit, true);
    },
    [limit]
  );

  /*
   These two functions can be replaced by one  => handleLimitChange
  const increaseResult = useCallback(() => {
    setLimit(limit + 1);
  }, [limit]);

  const decreaseResult = useCallback(() => {
    setLimit(limit + 1);
  }, [limit]);
   */

  const handleLimitChange = useCallback(
    (increament) => {
      if (increament) {
        return setLimit(limit + 1);
      }
      return setLimit(limit - 1);
    },
    [limit]
  );

  const loadMore = useCallback(() => {
    fetchData(gender, limit, false);
  }, [gender, limit]);

  const refreshPage = useCallback(() => {
    setLimit(3);
    setGender("male");
    fetchData("male", 3, true);
  }, []);

  const scrollToRef = useCallback(() => {
    topRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [topRef]);

  return (
    <div className="min-h-screen max-w-screen-lg m-auto">
      <div className="flex justify-between m-2 items-center flex-wrap">
        <button
          className="bg-cyan-500 m-1 p-2 px-5 rounded-full text-white font-semibold focus:outline-none"
          ref={topRef}
          onClick={refreshPage}
        >
          Refresh
        </button>
        <div
          className="flex justify-center items-center m-1
      "
        >
          <p className="mr-3 ">No of Results:</p>
          <button
            onClick={() => handleLimitChange(false)}
            disabled={limit === 1}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <span className="shadow-xl h-10 w-10 border border-gray-100 rounded-lg items-center flex justify-center">
            {limit}
          </span>
          <button
            onClick={() => handleLimitChange(true)}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <div className="flex justify-center items-center m-1">
          <p className="mr-3">Gender:</p>
          <button
            className={clsx(
              "px-3 py-1 border border-black rounded-l-lg focus:outline-none",
              gender === "female" && "font-semibold bg-black text-white "
            )}
            onClick={() => onGenderChange("female")}
          >
            F
          </button>
          <button
            className={clsx(
              "px-3 py-1 border border-black rounded-r-lg focus:outline-none",
              gender === "male" && "font-semibold bg-black text-white "
            )}
            onClick={() => onGenderChange("male")}
          >
            M
          </button>
        </div>
      </div>
      {processing ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap justify-center items-center p-3">
          {data?.length > 0 &&
            data?.map((person, index) => {
              return <PersonCard person={person} key={index} />;
            })}
        </div>
      )}
      <div className="flex justify-center flex-col items-center">
        <button
          className={clsx(
            "m-3  w-4/5 md:w-1/4 p-3 rounded-full text-white font-semibold focus:outline-none",
            processing || buttonLoader ? "bg-gray-400" : "bg-cyan-500"
          )}
          onClick={loadMore}
          disabled={buttonLoader || processing}
        >
          {buttonLoader || processing ? "Loading..." : "Load More"}
        </button>

        <button
          className="m-3 bg-cyan-500 w-4/5 md:w-1/4 p-3 rounded-full text-white font-semibold focus:outline-none"
          onClick={scrollToRef}
        >
          Scroll to top
        </button>
      </div>
    </div>
  );
}
