import Table from '@components/shared/Table/Table';

const Orders = () => {
  const headers = [
    { label: 'Order No.', key: 'orderNo' },
    { label: 'Customer Name', key: 'customerName' },
    { label: 'Payment Status', key: 'paymentStatus' },
    { label: 'Amount', key: 'amount' },
    { label: 'Address', key: 'address' },
    { label: 'Order Date', key: 'orderDate' },
    { label: 'Status', key: 'status' },
  ];

  const orders = [
    {
      orderNo: 300,
      customerName: 'John',
      paymentStatus: 'Paid',
      amount: '$400',
      address: 'Los Angeles',
      orderDate: '9-Jan-2022',
      status: 'Confirmed',
    },
    {
      orderNo: 300,
      customerName: 'John',
      paymentStatus: 'Paid',
      amount: '$400',
      address: 'Los Angeles',
      orderDate: '9-Jan-2022',
      status: 'Cancelled',
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-primary">My Orders</h1>
      </div>

      <Table headers={headers} data={orders} />
    </>
  );
};

export default Orders;
