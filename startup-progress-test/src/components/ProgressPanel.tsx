import React, { useState, useEffect } from "react";
import ProgressStage from "./ProgressStage";

export interface StartupStep {
  name: string;
  completed: boolean;
}

export interface StartupStage {
  name: string;
  steps: StartupStep[];
  completed: boolean;
}

export interface StartupProgress {
  name: string;
  stages: StartupStage[];
}

export interface StartupProgressService {
  initStartupProgress: () => Promise<StartupProgress>;
  loadStartupProgress: () => Promise<StartupProgress>;
  saveStartupProgress: (progress: StartupProgress) => Promise<void>;
}

interface PanelStatus {
  loading?: boolean;
  error?: boolean;
  edit?: boolean;
  finish?: boolean;
}

const ProgressPanel = ({
  progressService,
  onComplete,
}: {
  progressService: StartupProgressService;
  onComplete: () => void;
}) => {
  const [progress, setStartupProgress] = useState({} as StartupProgress);
  const [status, setStatus] = useState({} as PanelStatus);
  const [activeStepIndex, setActiveStepIndex] = useState(null as null | number);

  useEffect(() => {
    setStatus({ loading: true });
    progressService
      .loadStartupProgress()
      .then((progress) => {
        setStartupProgress(progress);
        setStatus({ edit: true });
      })
      .catch((_err) => setStatus({ error: true }));
  }, [progressService]);

  const onStageChange = (index: number, stage: StartupStage) => {
    const { name, stages } = progress;
    stages[index] = stage;
    stages[index].completed = stages[index].steps.every(
      (step) => step.completed
    );
    const newProgress = { name, stages };
    setStartupProgress(newProgress);
    progressService.saveStartupProgress(newProgress);
  };

  const reOpenHandler = (stage: StartupStage) => {
    console.log("reopening: ", stage);
  };

  useEffect(() => {
    const firstUncompletedStageIndex = progress.stages?.findIndex((stage) =>
      stage.steps.some((step) => !step.completed)
    );

    if (firstUncompletedStageIndex === undefined) {
      return;
    }

    if (firstUncompletedStageIndex === -1) {
      onComplete();
    }

    setActiveStepIndex(firstUncompletedStageIndex);
  }, [progress, onComplete]);

  return (
    <div className="w-full sm:w-80 p-10 bg-white sm:shadow-lg sm:rounded">
      {status.loading ? <p>Loading...</p> : null}
      {status.error ? <p>Something went wrong on our servers...</p> : null}
      {status.finish ? <p>Finish</p> : null}

      {status.edit ? (
        <>
          <h1 className="font-bold text-xl mb-5 select-none">
            {progress.name}
          </h1>
          <ol>
            {progress.stages.map((stage, index) => (
              <ProgressStage
                index={index}
                stage={stage}
                key={`stage-${index}`}
                disabled={index !== activeStepIndex}
                completed={
                  (activeStepIndex !== null && index < activeStepIndex) ||
                  activeStepIndex === -1
                }
                onChange={onStageChange}
                reOpen={reOpenHandler}
              />
            ))}
          </ol>
        </>
      ) : null}
    </div>
  );
};

export default ProgressPanel;
