import Table from '@components/shared/Table/Table';

const Users = () => {
  const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Username', key: 'username' },
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Role', key: 'role' },
  ];

  const users = [
    {
      id: 1,
      username: 'jdoe',
      name: 'John Doe',
      email: 'jdoe@example.com',
      role: 'Admin',
    },
    {
      id: 2,
      username: 'asmith',
      name: 'Alice Smith',
      email: 'asmith@example.com',
      role: 'User',
    },
    {
      id: 3,
      username: 'bwayne',
      name: 'Bruce Wayne',
      email: 'bwayne@wayneenterprises.com',
      role: 'Manager',
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-primary">Users</h1>
      </div>

      <Table headers={headers} data={users} />
    </>
  );
};

export default Users;
