import React, { FC } from "react";

interface HexagonProps {
  Letter: any;
}

const Hexagon: FC<HexagonProps> = ({ Letter }) => {
  return (
    <div className="hexagon">
      <span className="hexagon-text">{Letter}</span>
    </div>
  );
};

export default Hexagon;
