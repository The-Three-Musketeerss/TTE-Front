import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "@hooks/useGetUser";
import { getCart } from "@services/CartServices";
import { CartItemProps } from "@utils/types";

import AddressForm from "@components/Checkout/AddressForm/AddressForm";
import ShippingMethodForm from "@components/Checkout/ShippingMethodForm/ShippingMethodForm";
import PaymentForm from "@components/Checkout/PaymentForm/PaymentForm";
import StepperHeader from "@components/Checkout/StepperHeader/StepperHeader";
import { useShop } from "@contexts/ShopContext";
import CheckoutSummary from "@components/Checkout/CheckoutSummary/CheckoutSummary";

const Checkout = () => {
  const [cart, setCart] = useState<CartItemProps>();
  const [step, setStep] = useState<string>("address");

  const [addressFormData, setAddressFormData] = useState<any>(null);
  const [addressValue, setAddressValue] = useState<string>("");
  const [shippingOption, setShippingOption] = useState<string | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<any>(null);

  const { hasLoggedIn, user } = useGetUser();
  const { refreshCart } = useShop();
  const navigate = useNavigate();

  const steps = [
    { key: "address", label: "Address" },
    { key: "shipping", label: "Shipping" },
    { key: "payment", label: "Payment" },
  ];

  useEffect(() => {
    if (hasLoggedIn && user?.role === "Shopper") {
      const fetchCart = async () => {
        try {
          const response = await getCart(user?.token);
          if (!response.data || response.data.shoppingCart.length === 0) {
            navigate("/", { replace: true });
          } else {
            setCart(response.data);
          }
        } catch {
          navigate("/", { replace: true });
        }
      };
      fetchCart();
    } else {
      navigate("/", { replace: true });
    }
  }, [hasLoggedIn, user?.role]);

  const clearFormData = () => {
    setAddressFormData(null);
    setAddressValue("");
    setShippingOption(null);
    setStep("address");
  };

  const handleOrderComplete = async () => {
    clearFormData();
    await refreshCart();
    navigate("/orders");
  };

  const renderStepForm = () => {
    if (step === "address") {
      return (
        <AddressForm
          initialValues={addressFormData}
          onNext={(address, fullData) => {
            setAddressValue(address);
            setAddressFormData(fullData);
            setStep("shipping");
          }}
        />
      );
    }

    if (step === "shipping") {
      return (
        <ShippingMethodForm
          initialValue={shippingOption || undefined}
          onChange={(selected: string) => setShippingOption(selected)}
          onNext={() => {
            setStep("payment");
          }}
        />
      );
    }

    return (
      <PaymentForm
        address={addressValue}
        initialValues={paymentInfo}
        onChange={(paymentData: any) => setPaymentInfo(paymentData)}
        onFinish={handleOrderComplete}
      />
    );
  };

  if (!cart) return null;

  return (
    <section className="flex flex-col lg:flex-row items-start justify-center gap-4 2xl:gap-8 p-4 2xl:p-8">
      <div className="w-full lg:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <StepperHeader steps={steps} currentStep={step} setStep={setStep} />
        {renderStepForm()}
      </div>

      <CheckoutSummary cart={cart} setCart={setCart}/>
    </section>
  );
};

export default Checkout;
