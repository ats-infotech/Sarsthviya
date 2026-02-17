import { LucideIcon } from "lucide-react";

interface Step {
  label: string;
  icon: LucideIcon;
}

export default function Stepper({
  currentSteps,
  steps,
}: {
  currentSteps: number;
  steps: Step[];
}) {
  return (
    <div className="w-full py-8">
      <div className="mx-auto max-w-6xl overflow-x-auto">
        <div className="relative grid grid-flow-col auto-cols-[minmax(140px,1fr)] items-center px-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentSteps;
            const isCompleted = index < currentSteps;

            return (
              <div
                key={index}
                className="relative flex flex-col items-center text-center"
              >
                {/* Connecting Line */}
                {index !== steps.length - 1 && (
                  <div className="absolute top-6 left-1/2 h-0.5 w-full bg-accent/30" />
                )}

                {/* Circle */}
                <div
                  className={`z-10 flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300
                    ${
                      isActive || isCompleted
                        ? "bg-text-tertiary border-transparent"
                        : "bg-white border-accent/20"
                    }
                  `}
                >
                  <Icon
                    size={20}
                    className={`${
                      isActive || isCompleted
                        ? "text-text-senary"
                        : "text-text-secondary"
                    }`}
                  />
                </div>

                {/* Label */}
                <p
                  className={`mt-3 text-xl font-semibold text-accent`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
