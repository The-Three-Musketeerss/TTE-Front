import { useEffect, useState } from "react";
import Button from "@components/shared/Button/Button";
import ShippingOption from "@components/Checkout/ShippingOption/ShippingOption";

type Props = {
  onNext: (selectedOption: string) => void;
  initialValue?: string;
};

const ShippingMethodForm = ({ onNext, initialValue }: Props) => {
  const [selectedOption, setSelectedOption] = useState(initialValue || "surepost");

  useEffect(() => {
    if (initialValue) {
      setSelectedOption(initialValue);
    }
  }, [initialValue]);

  return (
    <form className="flex flex-col gap-4">
      <h3 className="text-lg font-medium mb-2">Choose a shipping method</h3>

      <ShippingOption
        id="surepost"
        title="UPS/USPS Surepost"
        description="4–7 Business Days"
        selected={selectedOption === "surepost"}
        onSelect={setSelectedOption}
      />

      <ShippingOption
        id="ground"
        title="UPS Ground Shipping"
        description="3–5 Business Days"
        selected={selectedOption === "ground"}
        onSelect={setSelectedOption}
      />

      <div className="pt-4">
        <Button
          text="Continue to payment"
          type="button"
          onClick={() => onNext(selectedOption)}
        />
      </div>
    </form>
  );
};

export default ShippingMethodForm;
