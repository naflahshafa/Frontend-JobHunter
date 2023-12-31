import { instance } from "../../axios/index.js";

async function getAllJobs() {
  try {
    const response = await instance.get("/jobs");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getJobById(id) {
  try {
    const response = await instance.get(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getJobsByUserId() {
  try {
    const response = await instance.get(`/jobs/company`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function updateJob(id, formData) {
  try {
    const response = await instance.patch(`/jobs/${id}`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function createJob(formData) {
  try {
    const response = await instance.post("jobs", formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function deleteJob(id) {
  try {
    const response = await instance.delete(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function detailJob(id) {
  try {
    const response = await instance.get(`/jobs/showCompanyByJob/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

export { getAllJobs, getJobById, getJobsByUserId, updateJob, createJob, deleteJob, detailJob };
