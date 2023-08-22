import React, { useState } from "react";
import "./App.css";
import ProgressPanel from "./components/ProgressPanel";
import LocalStorageProgressService from "./services/ProgressService";

function App() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="sm:grid sm:place-items-center w-screen h-screen sm:bg-gradient-to-r from-gray-200 to=gray-300">
      <ProgressPanel
        onComplete={() => setCompleted(true)}
        progressService={LocalStorageProgressService}
      />
    </div>
  );
}

export default App;
