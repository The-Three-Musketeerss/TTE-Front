import Button from "@components/shared/Button/Button";

const EmployeeHomePage = () => {
  const buttonList = [
    "Create Product",
    "Create Category",
    "List Products",
    "List Categories",
    "Review Jobs",
    "Create Employee",
    "View All Users",
  ];

  return (
    <section className="bg-background p-16 lg:p-56 flex flex-col items-center h-screen">
      <h1 className="text-primary font-semibold text-4xl lg:text-[56px] mb-28">
        Employee Portal
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
        {buttonList.map((button, index) => (
          <Button key={index} text={button}/>
        ))}
      </div>
    </section>
  );
};

export default EmployeeHomePage;
