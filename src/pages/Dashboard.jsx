import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import {Link} from 'react-router-dom';
import KanbanTable from "../components/KanbanTable.jsx";
import {useEffect, useState} from "react";
import {getCountJob, getAppliedJob, getPendingJob} from "../modules/fetch/kanban/index.js";

const Dashboard = () => {
    const [countJob, setCountJob] = useState(0)
    const [countApplicant, setCountApplicant] = useState(0)
    const [countPending, setCountPending] = useState(0)


    useEffect(() => {
        getCountJob().then((res) => {
            setCountJob(res.data)
        })
        getAppliedJob().then((res) => {
            setCountApplicant(res.data)
        })
        getPendingJob().then((res) => {
            setCountPending(res.data)
        })
    }, [])

    return (
        <>
            <Navbar/>
            <Sidebar/>
            <div className="p-5 sm:p-10 sm:ml-64 mt-16 sm:mt-16">
                <div className="flex items-center justify-end">
                    <Link
                        to="/joblist"
                        className="block py-1 text-sm text-blue-700 hover:text-blue-400 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                    >
                        Go to Job List
                    </Link>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 20" fill="none">
                        <path d="M9 18.0261L14.7 12.9786C14.7942 12.8978 14.8694 12.7993 14.921 12.6892C14.9725 12.5792 14.9991 12.4602 14.9991 12.3398C14.9991 12.2195 14.9725 12.1004 14.921 11.9904C14.8694 11.8804 14.7942 11.7818 14.7 11.7011L9 6.65356" stroke="blue" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-semibold font-poppins">Dashboard</h1>
                </div>
                <div className="flex items-center flex-col sm:flex-row justify-center gap-5 mt-10">
                    <div className="w-full p-5 bg-[#C6D984] hover:bg-[#014034] hover:text-white text-slate-900 rounded-xl">
                        <h1 className="text-3xl font-semibold font-poppins">{countJob}</h1>
                        <h2 className="text-sm font-medium font-poppins">Job List</h2>
                    </div>
                    <div className="w-full p-5 bg-[#F2CD5C] hover:bg-[#014034] hover:text-white text-slate-900 rounded-xl">
                        <h1 className="text-3xl font-semibold font-poppins">{countApplicant}</h1>
                        <h2 className="text-sm font-medium font-poppins">Applicant</h2>
                    </div>
                    <div className="w-full p-5 bg-[#F24C3D] hover:bg-[#014034] hover:text-white text-slate-900 rounded-xl">
                        <h1 className="text-3xl font-semibold font-poppins">{countPending}</h1>
                        <h2 className="text-sm font-medium font-poppins">Applicant Pending</h2>
                    </div>
                </div>
            </div>

            <div className="p-5 sm:p-10 sm:ml-64">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-lg font-semibold font-poppins">Application Pending</h1>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <KanbanTable/>
                </div>
            </div>
        </>
    )
}

export default Dashboard