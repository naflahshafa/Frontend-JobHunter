// components/JobCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job, showDetails }) => {
  const MAX_DESCRIPTION_LENGTH = 50;
  const truncatedDescription =
    job.description.length > MAX_DESCRIPTION_LENGTH
      ? `${job.description.substring(0, MAX_DESCRIPTION_LENGTH)}...`
      : job.description;

  return (
    <div className="bg-white overflow-hidden shadow-md rounded-md p-4 transition-transform transform hover:scale-105 duration-300 ease-in-out">
      <h3 className="text-xl font-semibold mb-2">{job.job_name}</h3>
      <div className="flex flex-row">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 8V12L15.276 15.276M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#2F2F38" stroke-width="1" stroke-linejoin="round"/>
        </svg>
        <p className="text-gray-500 mb-2 mx-1">{job.type}</p>
      </div>

      <div className="flex flex-row">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M1 10C2.5 11.5 6.25 13 10 13C13.75 13 17.5 11.5 19 10M10 9H10.01M2 19H18C18.5523 19 19 18.5523 19 18V6C19 5.44772 18.5523 5 18 5H2C1.44772 5 1 5.44772 1 6V18C1 18.5523 1.44772 19 2 19ZM14 5V3C14 1.89543 13.1046 1 12 1H8C6.89543 1 6 1.89543 6 3V5H14Z" stroke="#2F3039" stroke-width="1" stroke-linecap="round"/>
        </svg>
        <p className="text-gray-500 mb-1 mx-1">{job.category}</p>
      </div>

      <p className="text-gray-700 my-4">{truncatedDescription}</p>
      <Link
        to={`/detailjob/${job.id}`}
        onClick={() => showDetails(job)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300 transition-all duration-300"
      >
        View Details
      </Link>
    </div>
  );
};

export default JobCard;
