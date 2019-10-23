import React from "react";

import "./simulation.scss";

function Simulation() {
  return (
    <>
      <div className="sim-title">
        <h1>Simulações</h1>
      </div>
      <div className="investment-box">
        <h2>Investimento</h2>
        <input type="number" className="investment-box-input" placeholder="" />
        <select>
          <option value="cdi">CDI</option>
          <option value="selic">SELIC</option>
        </select>
        <input
          type="number"
          className="investment-box-input"
          readOnly
          value="Descubra quanto você resgata a mais..."
        />
      </div>
    </>
  );
}

export default Simulation;
