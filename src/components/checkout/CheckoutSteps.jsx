import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const CheckoutSteps = ({ active }) => {
  const steps = [
    { id: 1, label: "Shipping" },
    { id: 2, label: "Payment" },
    { id: 3, label: "Complete" },
  ];

  return (
    <div className="w-full max-w-2xl py-8 mx-auto">
      <div className="relative flex justify-between">
        {/* Progress Bar Background */}
        <div className="absolute left-0 w-full h-1 -translate-y-1/2 bg-emerald-100 top-1/2" />
        
        {/* Active Progress Bar */}
        <div 
          className="absolute left-0 h-1 transition-all duration-500 ease-in-out -translate-y-1/2 bg-emerald-500 top-1/2"
          style={{ width: `${((active - 1) / (steps.length - 1)) * 100}%` }}
        />

        {/* Steps */}
        {steps.map((step) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center group">
            {/* Circle */}
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 mb-4 border-2",
                active > step.id
                  ? "bg-emerald-500 border-emerald-500 shadow-sm shadow-emerald-200"
                  : active === step.id
                  ? "bg-emerald-500 border-emerald-500 shadow-sm shadow-emerald-200"
                  : "bg-white border-emerald-200",
                active < step.id
                  ? "group-hover:border-emerald-300"
                  : "group-hover:shadow-md"
              )}
            >
              {active > step.id ? (
                <Check className="w-6 h-6 text-white" />
              ) : (
                <span
                  className={cn(
                    "text-sm font-semibold",
                    active >= step.id ? "text-white" : "text-emerald-500"
                  )}
                >
                  {step.id}
                </span>
              )}
            </div>

            {/* Label */}
            <span
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                active > step.id 
                  ? "text-emerald-600"
                  : active === step.id
                  ? "text-emerald-500"
                  : "text-emerald-400",
                "group-hover:text-emerald-600"
              )}
            >
              {step.label}
            </span>

            {/* Optional: Status indicator dot */}
            {active > step.id && (
              <div className="absolute right-0 -top-1">
                <span className="flex w-3 h-3">
                  <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-emerald-400 animate-ping" />
                  <span className="relative inline-flex w-3 h-3 rounded-full bg-emerald-500" />
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;