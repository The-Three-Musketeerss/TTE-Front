import Button from "@components/shared/Button/Button";
import React, { use, useEffect, useState } from "react";

import CreateCategory from "@components/Homepage/CreateCategory/CreateCategory";

const EmployeeHomePage = () => {
  const [component, setComponent] = useState<React.ComponentType | null>(null);
  const buttonList = [
    { text: "Create Product", component: null },
    { text: "Create Category", component: CreateCategory },
    { text: "List Products", component: null },
    { text: "List Categories", component: null },
    { text: "Review Jobs", component: null },
    { text: "Create Employee", component: null },
    { text: "View All Users", component: null },
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

  return (
    <section className="bg-background p-16 xl:p-56 flex flex-col items-center h-screen relative">
      <h1 className="text-primary font-semibold text-center text-4xl xl:text-[56px] mb-16 xl:mb-28">
        Employee Portal
      </h1>
      {component ? (
        <>
          <p
            className="text-primary font-bold hover:cursor-pointer absolute top-10 left-10"
            onClick={() => setComponent(null)}
          >
            {"<Back"}
          </p>
          {React.createElement(component)}
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-24">
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
