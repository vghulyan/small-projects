import {
  StartupProgress,
  StartupProgressService,
} from "../components/ProgressPanel";

const DEFAULT_STARTUP_PROGRESS: StartupProgress = {
  name: "My startup progress",
  stages: [
    {
      name: "Foundation",
      completed: false,
      steps: [
        { name: "Setup virtual office", completed: false },
        { name: "Set mission & vision", completed: false },
        { name: "Select business name", completed: false },
        { name: "Buy domains", completed: false },
      ],
    },
    {
      name: "Discovery",
      completed: false,
      steps: [
        { name: "Create roadmap", completed: false },
        { name: "Competitor analysis", completed: false },
      ],
    },
    {
      name: "Delivery",
      completed: false,
      steps: [
        { name: "Release marketing website", completed: false },
        { name: "Release MVP", completed: false },
      ],
    },
  ],
};

const STARTUP_PROFRESS_KEY = "startupProgress";

const LocalStorageProgressService: StartupProgressService = {
  async initStartupProgress() {
    localStorage.setItem(
      STARTUP_PROFRESS_KEY,
      JSON.stringify(DEFAULT_STARTUP_PROGRESS)
    );
    return DEFAULT_STARTUP_PROGRESS;
  },

  async loadStartupProgress() {
    const item = localStorage.getItem(STARTUP_PROFRESS_KEY);
    if (item) {
      return JSON.parse(item) as StartupProgress;
    }

    return LocalStorageProgressService.initStartupProgress();
  },

  async saveStartupProgress(progress: StartupProgress) {
    localStorage.setItem(STARTUP_PROFRESS_KEY, JSON.stringify(progress));
  },
};

export default LocalStorageProgressService;
