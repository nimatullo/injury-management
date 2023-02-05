import * as React from "react";
import { useParams } from "react-router-dom";

export const InjuryReport = () => {
  const params = useParams();

  return (
    <div>
      <h1>Injury Report for {params.id}</h1>
    </div>
  );
};
