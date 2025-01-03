import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const CheckoutSteps = ({ active  }) => {
  const steps = [
    { id: 1, label: "Shipping" },
    { id: 2, label: "Payment" },
    { id: 3, label: "Complete" },
  ];

  return (
    <div className="w-full max-w-2xl py-8 mx-auto">
      <div className="relative flex justify-between">
        {/* Progress Bar Background */}
        <div className="absolute left-0 w-full h-1 -translate-y-1/2 bg-gray-200 top-1/2" />
        
        {/* Active Progress Bar */}
        <div 
          className="absolute left-0 h-1 transition-all duration-500 -translate-y-1/2 bg-blue-500 top-1/2"
          style={{ width: `${((active - 1) / (steps.length - 1)) * 100}%` }}
        />

        {/* Steps */}
        {steps.map((step) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center">
            {/* Circle */}
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 mb-4",
                active > step.id
                  ? "bg-blue-500"
                  : active === step.id
                  ? "bg-blue-500"
                  : "bg-gray-200"
              )}
            >
              {active > step.id ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <span
                  className={cn(
                    "text-sm font-semibold",
                    active >= step.id ? "text-white" : "text-gray-600"
                  )}
                >
                  {step.id}
                </span>
              )}
            </div>

            {/* Label */}
            <span
              className={cn(
                "mt-2 text-sm font-medium",
                active >= step.id ? "text-blue-500" : "text-gray-500"
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;