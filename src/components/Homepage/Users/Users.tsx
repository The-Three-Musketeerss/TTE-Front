import { useEffect, useState } from "react";
import { useGetUser } from "@hooks/useGetUser";
import { getUsers } from "@services/UserServices";
import Table from "@components/shared/Table/Table";
import TableSkeleton from "@components/shared/Table/Skeleton/Skeleton";

const Users = () => {
  const headers = [
    { label: "ID", key: "id" },
    { label: "Username", key: "userName" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" },
  ];

  const { user } = useGetUser();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user?.token) return;

      try {
        const data = await getUsers(user.token);
        setUsers(data);
      } catch (err) {
        console.error("Failed to load users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-primary">Users</h1>
      </div>

      {loading ? <TableSkeleton /> : <Table headers={headers} data={users} />}
    </>
  );
};

export default Users;
