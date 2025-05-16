type Step = {
  key: string;
  label: string;
};

type Props = {
  steps: Step[];
  currentStep: string;
  setStep: (step: string) => void;
};

const StepperHeader = ({ steps, currentStep, setStep }: Props) => {
  const stepIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 text-sm font-medium">
        {steps.map((step, index) => {
          const isCurrent = step.key === currentStep;
          const isPast = index < stepIndex;
          const isFuture = index > stepIndex;

          return (
            <div key={step.key} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => isPast && setStep(step.key)}
                className={`
                  ${isCurrent ? "text-black font-semibold" : "text-gray-400"}
                  ${isPast ? "hover:underline cursor-pointer" : ""}
                  ${isFuture ? "cursor-default" : ""}
                `}
                disabled={isFuture}
              >
                {step.label}
              </button>
              {index < steps.length - 1 && <span className="w-6 h-px bg-gray-300" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepperHeader;