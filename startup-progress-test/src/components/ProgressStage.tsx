import React from "react";
import { StartupStage } from "./ProgressPanel";
import ProgressStep from "./ProgressStep";
import TickIcon from "./TickIcon";
import Button from "./Button";

const ProgressPanel = ({
  index,
  stage,
  disabled,
  completed,
  onChange,
  reOpen,
}: {
  index: number;
  stage: StartupStage;
  disabled: boolean;
  completed: boolean;
  onChange: (index: number, stage: StartupStage) => void;
  reOpen: (stage: StartupStage) => void;
}) => {
  const onStepChange = (stepIndex: number, value: boolean) => {
    const { name, steps, completed } = stage;
    steps[stepIndex].completed = value;
    const newStage = { name, steps, completed };
    onChange(index, newStage);
  };

  return (
    <li>
      <div className="flex mt-5 mb-4">
        <span className="text-white text-sm font-semibold bg-gray-900 w-7 h-7 rounded-full inline-flex items-center justify-center select-none">
          {index + 1}
        </span>
        <span className="text-xl font-bold ml-3 mr-auto select-none">
          {stage.name}
        </span>
        {completed ? <TickIcon /> : null}
      </div>
      <ul className="space-y-2">
        {stage.steps.map((step, index) => (
          <li key={`step-${index}`}>
            <ProgressStep
              index={index}
              step={step}
              onChange={onStepChange}
              disabled={disabled}
            />
          </li>
        ))}
      </ul>
      {completed ? (
        <Button
          border="none"
          color="#eee"
          height="30px"
          onClick={() => reOpen(stage)}
          radius="10%"
          width="100%"
          margin="10px"
          children="Reopen"
        />
      ) : null}
    </li>
  );
};

export default ProgressPanel;
