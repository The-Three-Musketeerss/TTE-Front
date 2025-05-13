const Shipping = () => {
  return (
    <>
      <h2 className="font-semibold lg:text-xl mt-8 mb-4">Order Information</h2>
      <span className="w-full outline-1 outline-gray-600 flex"></span>
      <div className="collapse collapse-plus shadow- mt-4">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title font-semibold">Return Policy</div>
        <div className="collapse-content text-sm">
          You can return any item within 30 days of purchase as long as it is in
          its original condition and packaging.
        </div>
      </div>
      <span className="w-full outline-1 outline-gray-300 flex"></span>
      <div className="collapse collapse-plus">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">Shipping Options</div>
        <div className="collapse-content text-sm">
          We offer standard, expedited, and next-day shipping. Shipping costs
          and delivery times vary based on your location.
        </div>
      </div>
    </>
  );
};

export default Shipping;
