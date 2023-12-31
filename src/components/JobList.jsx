import {useEffect, useState} from "react";
import {getJobsByUserId, deleteJob} from "../modules/fetch/job";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobList = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);

    const fetchJobs = async () => {
        try {
            const response = await getJobsByUserId();
            const jobsData = response;
            if (Array.isArray(jobsData)) {
                const formattedJobs = jobsData.map((job) => ({
                    ...job,
                    updatedAt: formatUpdatedAt(job.updatedAt),
                }));
    
                setJobs(formattedJobs);
            } else {
                console.error("Response is not an array:", jobsData);
            } 
        } catch (error) {
            console.log("Error fetching jobs", error)
        }  
    };

    useEffect(() => {
        fetchJobs()
    }, [])

    const handleDeleteJob = async (id) => {
        try {
          // Menampilkan notifikasi konfirmasi sebelum menghapus job
          toast.info(
            <>
              Are you sure you want to delete this job?
              <div className="flex justify-end mt-2">
                <button
                  className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 mr-2"
                  onClick={() => deleteJobHandler(id)}
                >
                  Yes
                </button>
                <button
                  className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
                  onClick={() => toast.dismiss()}
                >
                  No
                </button>
              </div>
            </>,
            {
              position: toast.POSITION.TOP_CENTER,
              hideProgressBar: true,
              closeButton: false,
              closeOnClick: true,
              autoClose: false,
              onOpen: () => {},
            }
          );
        } catch (error) {
          console.error("Error deleting job", error.message);
          toast.error("Error deleting job", {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
            autoClose: 5000,
          });
        }
      };
    
      const deleteJobHandler = async (id) => {
        try {
          await deleteJob(id);
    
          setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    
          // Menampilkan notifikasi setelah job dihapus
          toast.success("Job deleted successfully", {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
            autoClose: 3000,
          });
        } catch (error) {
          console.error("Error deleting job", error.message);
    
          // Menampilkan notifikasi jika terjadi error saat menghapus job
          toast.error("Error deleting job", {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
            autoClose: 5000,
          });
        }
      };

    const formatUpdatedAt = (updatedAt) => {
        const date = new Date(updatedAt);
        
        // Mendapatkan tanggal dalam format YYYY-MM-DD
        const formattedDate = date.toISOString().split('T')[0];
        
        return formattedDate;
    };

    return (
        <div>
            <div className="bg-blue-100 py-4 mt-10">
                <h1 className="text-2xl text-center font-bold">Job List</h1>
            </div>

            <div className="flex justify-center">
                <button 
                    type="button" 
                    onClick={() => navigate("/createjob")}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 my-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >Add Job</button>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-b-4 border-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3">
                                Job Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Job Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Job Category
                            </th>
                            {/* <th scope="col" className="px-6 py-3">
                                Requirement
                            </th> */}
                            {/* <th scope="col" className="px-6 py-3">
                                Description
                            </th> */}
                            {/* <th scope="col" className="px-6 py-3">
                                Required Skill
                            </th> */}
                            {/* <th scope="col" className="px-6 py-3">
                                Salary
                            </th> */}
                            <th scope="col" className="px-6 py-3">
                                Posted Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {jobs.map((jobs, index) => (
                        <tr 
                            key={jobs.id} 
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                        <td className="px-6 py-4">
                            {index + 1}
                        </td>
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {jobs.job_name}
                        </td>
                        <td className="px-6 py-4">
                            {jobs.type}
                        </td>
                        <td className="px-6 py-4">
                            {jobs.category}
                        </td>
                        {/* <td className="px-6 py-4">
                            {jobs.requirement}
                        </td> */}
                        {/* <td className="px-6 py-4">
                            {jobs.description}
                        </td> */}
                        {/* <td className="px-6 py-4">
                            {jobs.required_skill}
                        </td> */}
                        {/* <td className="px-6 py-4">
                            {jobs.salary}
                        </td> */}
                        <td className="px-6 py-4">
                            {jobs.updatedAt}
                        </td>
                        <td className="px-6 py-4 flex">
                            <Link 
                                to={`/editjob/${jobs.id}`} 
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M17 15.9999V18.8329C17.0001 18.9862 16.97 19.138 16.9114 19.2797C16.8528 19.4213 16.7669 19.55 16.6585 19.6584C16.5501 19.7668 16.4214 19.8528 16.2797 19.9114C16.1381 19.97 15.9863 20.0001 15.833 19.9999H4.167C4.01371 20.0001 3.8619 19.97 3.72025 19.9114C3.57861 19.8528 3.44991 19.7668 3.34151 19.6584C3.23312 19.55 3.14717 19.4213 3.08857 19.2797C3.02996 19.138 2.99987 18.9862 3 18.8329V7.16695C2.99987 7.01366 3.02996 6.86184 3.08857 6.7202C3.14717 6.57855 3.23312 6.44985 3.34151 6.34146C3.44991 6.23307 3.57861 6.14711 3.72025 6.08851C3.8619 6.02991 4.01371 5.99981 4.167 5.99995H10.783M16.304 5.84395L19.156 8.69595M20.409 4.59095C20.5963 4.77817 20.745 5.00047 20.8464 5.24515C20.9478 5.48983 20.9999 5.75209 20.9999 6.01695C20.9999 6.2818 20.9478 6.54406 20.8464 6.78874C20.745 7.03342 20.5963 7.25573 20.409 7.44295L12.565 15.2869L9 15.9999L9.713 12.4349L17.557 4.59095C17.7442 4.4036 17.9665 4.25498 18.2112 4.15359C18.4559 4.05219 18.7181 4 18.983 4C19.2479 4 19.5101 4.05219 19.7548 4.15359C19.9995 4.25498 20.2218 4.4036 20.409 4.59095Z" stroke="blue" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                                <button onClick={() => handleDeleteJob(jobs.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M4 7H20M10 10V18M14 10V18M10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7H9V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3ZM6 7H18V20C18 20.2652 17.8946 20.5196 17.7071 20.7071C17.5196 20.8946 17.2652 21 17 21H7C6.73478 21 6.48043 20.8946 6.29289 20.7071C6.10536 20.5196 6 20.2652 6 20V7Z" stroke="red" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                        </td>
                    </tr>
                    ))}
                        
                    </tbody>
                </table>
            </div>
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 20" fill="none">
                    <path d="M15.0001 6.65356L9.30005 11.7011C9.20588 11.7818 9.13062 11.8804 9.0791 11.9904C9.02759 12.1004 9.00098 12.2195 9.00098 12.3398C9.00098 12.4602 9.02759 12.5792 9.0791 12.6892C9.13062 12.7993 9.20588 12.8978 9.30005 12.9786L15.0001 18.0261" stroke="blue" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <Link
                    to="/dashboard"
                    className="block py-1 text-sm text-blue-700 hover:text-blue-400 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                >
                    Back to Dashboard
                </Link>
            </div>
            <ToastContainer />
        </div>

    )
}

export default JobList