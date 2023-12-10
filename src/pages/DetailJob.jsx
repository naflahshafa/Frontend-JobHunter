import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { detailJob } from "../modules/fetch/job/index.js";
import { addKanban } from "../modules/fetch/kanban/index.js";
import Header from "../components/Header.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer.jsx";

const DetailJob = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState({});
    const [kanban, setKanban] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        try {
            const fetchDetailJob = async () => {
                const response = await detailJob(id);
                const detailJobData = response.data;
                const dataUser = response.data.User;
                setDetail(detailJobData);
                setUser(dataUser);
            };
            fetchDetailJob();
        } catch (e) {
            console.log("Error fetching detail job", e);
        }
    }, []);

    const handleSubmit = async () => {
        try {
            if (!localStorage.getItem("token")) {
                toast.error("Please Login First", {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                    autoClose: 5000,
                });
                return;
            }

            const response = await addKanban(id);
            const kanbanData = response.data;
            setKanban(kanbanData);

            toast.success("Applied Job Successfully", {
                position: toast.POSITION.TOP_CENTER,
                hideProgressBar: true,
                autoClose: 3000,
            });
        } catch (e) {
            console.log("Error applying job", e);
            toast.error("Applied Job Failed", {
                position: toast.POSITION.TOP_CENTER,
                hideProgressBar: true,
                autoClose: 3000,
            });
        }
    };

    return (
        <>
            <div className="flex flex-col min-h-screen bg-gray-100">
                <Header />
                <div className="w-full mt-16 bg-blue-100 text-2xl py-4 text-center font-bold text-slate-900 ">
                    <span>{detail.job_name}</span>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        className="bg-blue-700 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300"
                        onClick={handleSubmit}
                    >
                        Apply This Job
                    </button>
                </div>
                <div className="container mx-auto mt-8 bg-white p-6 shadow-md rounded-md">
                    <h2 className="font-semibold mb-4">
                        Type: <span className="font-normal">{detail.type}</span>
                    </h2>
                    <h2 className="font-semibold mb-4">
                        Category: <span className="font-normal">{detail.category}</span>
                    </h2>
                    <h2 className="font-semibold mb-4">
                        Required Skill: <span className="font-normal">{detail.required_skill}</span>
                    </h2>
                    <h2 className="font-semibold mb-4">
                        Salary: <span className="font-normal">{detail.salary}</span>
                    </h2>
                </div>

                <div className="container mx-auto mt-8 bg-white p-6 shadow-md rounded-md">
                    <h2 className="font-bold text-2xl mb-4">Job Description</h2>
                    <p className="font-normal text-gray-700 text-justify">{detail.description}</p>
                    <h2 className="font-bold text-2xl mb-4 my-10">Requirement</h2>
                    <p className="font-normal text-gray-700 text-justify">{detail.requirement}</p>
                </div>

                <div className="container mx-auto mt-8 bg-white p-6 shadow-md rounded-md">
                    <h2 className="font-bold text-2xl mb-5">Company Info</h2>
                    <div className="mt-4 flex items-center">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Job Image"
                            className="mr-6 rounded-md shadow-md"
                        />
                        <div>
                            <h2 className="font-semibold text-lg mb-2 pb-6">{user.name}</h2>
                            <p className="text-gray-600 mb-2">{user.email}</p>
                            <p className="text-gray-600 mb-2">{user.address}</p>
                        </div>
                    </div>
                </div>
                <ToastContainer />
                <Footer />
            </div>
        </>
    );
};

export default DetailJob;
