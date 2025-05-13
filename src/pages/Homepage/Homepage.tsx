import Button from "@components/shared/Button/Button";
import React, { useEffect, useState } from "react";

import CreateCategory from "@components/Homepage/CreateCategory/CreateCategory";
import CreateProduct from "@components/Homepage/CreateProduct/CreateProduct";
import ReviewJobs from "@components/Homepage/ReviewJobs/ReviewJobs";
import CreateEmployee from "@components/Homepage/CreateEmployee/CreateEmployee";
import CategoryList from "@components/Homepage/CategoryList/CategoryList";
import Users from "@components/Homepage/Users/Users";
import { useGetUser } from "@hooks/useGetUser";
import { useNavigate } from "react-router-dom";

const EmployeeHomePage = () => {
  const [component, setComponent] = useState<React.ComponentType | null>(null);
  const { hasLoggedIn, user } = useGetUser();
  const navigate = useNavigate();

  const buttonList = [
    { text: "Create Product", component: CreateProduct },
    { text: "Create Category", component: CreateCategory },
    { text: "List Products", component: null },
    { text: "List Categories", component: CategoryList },
    { text: "Review Jobs", component: ReviewJobs },
    { text: "Create Employee", component: CreateEmployee },
    { text: "View All Users", component: Users },
  ];

  const handleButtonClick = (button: {
    text: string;
    component: React.ComponentType | null;
  }) => {
    if (button.component) {
      return setComponent(() => button.component);
    } else {
      console.log(`${button.text} button clicked`);
    }
  };

  useEffect(() => {
    if (!hasLoggedIn) {
      navigate("/login", { replace: true });
    }

    if (hasLoggedIn && user?.role !== "Admin" && user?.role !== "Employee") {
      navigate("/", { replace: true });
    }
  }, [hasLoggedIn, user]);

  return (
    <section className="bg-background flex flex-col items-center relative px-4">
      <h1 className="text-primary font-semibold text-center text-4xl xl:text-5xl mb-16 xl:mb-28">
        Employee Portal
      </h1>

      {component ? (
        <>
          <p
            className="text-primary font-bold hover:cursor-pointer mb-6 lg:absolute lg:top-10 lg:left-10"
            onClick={() => setComponent(null)}
          >
            {"< Back"}
          </p>
          {React.createElement(component)}
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-14">
          {buttonList.map((button, index) => (
            <Button
              key={index}
              text={button.text}
              onClick={() => handleButtonClick(button)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default EmployeeHomePage;
