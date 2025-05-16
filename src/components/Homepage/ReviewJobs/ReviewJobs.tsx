import TableSkeleton from "@components/shared/Table/Skeleton/Skeleton";
import Table from "@components/shared/Table/Table";
import { useGetUser } from "@hooks/useGetUser";
import { getJobs, reviewJob } from "@services/JobServices.";
import { JobItemProps } from "@utils/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiCircleCheck } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const ReviewJobs = () => {
  const [jobs, setJobs] = useState<JobItemProps[]>([]);
  const loading = jobs.length === 0;
  const {user} = useGetUser();
  const navigate = useNavigate();

  useEffect(() => {
    if(user?.role !== "Admin"){
      navigate("/404", {replace: true});
    }
    const fetchJobs = async () => {
      const response = await getJobs(user?.token);
      setJobs(response.data);
    };
    fetchJobs();

  }
  , []);

  const handleApprove = async (id: number) => {
    toast.promise(
      reviewJob(id, user?.token, "approve"),
      {
        loading: "Accepting job...",
        success: (res) => {
          setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
          return res.message;
        },
        error: (err) => `Error accepting job: ${err}`,
      }
    );
  };

  const handleDecline = async (id: number) => {
    toast.promise(
      reviewJob(id, user?.token, "decline"),
      {
        loading: "Rejecting job...",
        success: (res) => {
          setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
          return res.message;
        },
        error: (err) => `Error rejecting job: ${err}`,
      }
    );
  };

  const headers = [
    { label: "Id", key: "id" },
    { label: "Type", key: "type" },
    { label: "Item Id", key: "id_item" },
    { label: "Operation", key: "operation" },
    { label: "Item Name", key: "itemName" },
    { label: "Created At", key: "createdAt" },
    { label: "Created By", key: "createdBy" },
    { label: "Action", key: "action" },
  ];

   const dataWithActions = jobs.map((job) => ({
      ...job,
      action: (
        <div className="flex gap-4 justify-start">
          <CiCircleCheck
            className="text-green-500 hover:cursor-pointer"
            onClick={() => handleApprove(job.id)}
          />
          <RxCrossCircled
            className="text-red-500 hover:cursor-pointer"
            onClick={() => handleDecline(job.id)}
          />
        </div>
      ),
    }));

  return (
    <>
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold text-primary">Job List</h1>
      </div>
      {loading ? (
        <TableSkeleton />
      ) : (
        <Table headers={headers} data={dataWithActions} />
      )}
    </>
  );
};

export default ReviewJobs;
