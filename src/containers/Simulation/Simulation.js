import React, { Component } from "react";

import "./simulation.scss";

class Simulation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      investimentValue: 0,
      savingsValue: 0,

      loading: true
    };
  }
  onChangedValue = () => {};

  onSelectedPeriod = () => {};

  onSelectedInvestiment = () => {};

  render() {
    return (
      <>
        {this.state.loading ? (
          <h1>Em construção...</h1>
        ) : (
          <>
            <div className="sim-title">
              <h1>Simulações</h1>
            </div>
            <div className="investment-box-entry">
              <h2>Investimento</h2>
              <input
                type="number"
                className="investment-box-input"
                placeholder="Insira uma quantidade em dinheiro"
                onChange={this.onChangedValue}
              />
              <select onChange={this.onSelectedPeriod}>
                <option>Escolha um período</option>
                <option value="six">6 meses</option>
                <option value="twelve">12 meses</option>
                <option value="twenty-four">24 meses</option>
                <option value="sixty">60 meses</option>
              </select>
              <select onChange={this.onSelectedInvestiment}>
                <option value="cdi">CDI</option>
                <option value="selic">SELIC</option>
              </select>
              <button>Calcular</button>
            </div>
            <div className="investment-box-calc">
              <h2>Resgate</h2>
              <h3>Em poupança</h3>
              <input
                type="number"
                className="investment-box-input"
                readOnly
                placeholder="Em poupança..."
                value={this.state.savingsValue}
              />
              <h3>No investimento</h3>
              <input
                type="number"
                className="investment-box-input"
                readOnly
                placeholder="Descubra quanto você resgata a mais..."
                value={this.state.investimentValue}
              />
            </div>
          </>
        )}
      </>
    );
  }
}

export default Simulation;
