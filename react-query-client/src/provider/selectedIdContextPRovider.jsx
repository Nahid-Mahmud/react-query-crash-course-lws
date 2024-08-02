import { useState } from "react";
import { SelectedIdContext } from "../context/selectedIdContext";

const SelectedIdContextPRovider = ({ children }) => {
  const [selectedId, setSelectedId] = useState(null);

  const value = { selectedId, setSelectedId };

  return <SelectedIdContext.Provider value={value}>{children}</SelectedIdContext.Provider>;
};

export default SelectedIdContextPRovider;
