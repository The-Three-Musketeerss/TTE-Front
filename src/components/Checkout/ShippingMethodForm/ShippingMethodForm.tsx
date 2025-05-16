import Button from "@components/shared/Button/Button";
import ShippingOption from "@components/Checkout/ShippingOption/ShippingOption";

type Props = {
  onChange: (option: string) => void;
  onNext: () => void;
  initialValue?: string;
};

const ShippingMethodForm = ({ onChange, onNext, initialValue = "surepost" }: Props) => {
  return (
    <form className="flex flex-col gap-4">
      <h3 className="text-lg font-medium mb-2">Choose a shipping method</h3>

      <ShippingOption
        id="surepost"
        title="UPS/USPS Surepost"
        description="4–7 Business Days"
        selected={initialValue === "surepost"}
        onSelect={() => onChange("surepost")}
      />

      <ShippingOption
        id="ground"
        title="UPS Ground Shipping"
        description="3–5 Business Days"
        selected={initialValue === "ground"}
        onSelect={() => onChange("ground")}
      />

      <div className="pt-4">
        <Button text="Continue to payment" type="button" onClick={onNext} />
      </div>
    </form>
  );
};

export default ShippingMethodForm;
