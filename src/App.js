import React, { useState } from "react";
import Dashboard from "./dashboard";

import api from "./api.js";

const App = () => {
  return (
    <div className="App">
      <Dashboard />

      <api />
      {/* Render other components as needed */}
    </div>
  );
};

export default App;
