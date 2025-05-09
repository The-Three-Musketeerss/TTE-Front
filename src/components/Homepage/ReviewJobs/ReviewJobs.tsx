import Table from "@components/shared/Table/Table";
import { CiCircleCheck } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";

const ReviewJobs = () => {
  const review = (
    <div className="flex gap-2">
      <CiCircleCheck className="text-green-500 cursor-pointer" size={20} />
      <RxCrossCircled className="text-red-500 cursor-pointer" size={20} />
    </div>
  );

  const headers = [
    { label: "Id", key: "id" },
    { label: "Type", key: "type" },
    { label: "Name", key: "name" },
    { label: "Created By", key: "createdBy" },
    { label: "Timestamp", key: "timestamp" },
    { label: "Operation", key: "operation" },
    { label: "Action", key: "action" },
  ];

  const Jobs = [
    {
      id: 300,
      type: "product",
      name: "hard drive",
      createdBy: "employee01",
      timestamp: "02-04-2025",
      operation: "create",
      action: review,
    },
    {
      id: 301,
      type: "category",
      name: "data recovery",
      createdBy: "employee02",
      timestamp: "03-04-2025",
      operation: "delete",
      action: review,
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-primary">Job List</h1>
      </div>

      <Table headers={headers} data={Jobs} />
    </>
  );
};

export default ReviewJobs;
