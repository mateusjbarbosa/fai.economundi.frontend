import React, { Component } from "react";

import "./currencyConverter.scss";

class CurrencyConverter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      currencySelected: "",
      convertedValue: 0
    };

    this.onTranslateKeys = this.onTranslateKeys.bind(this);
  }

  onTranslateKeys(keys) {
    let newKey = "";
    let response = [];

    keys.map(key => {
      switch (key) {
        case "Argentine Peso":
          newKey = "Peso Argentino";
          break;

        case "Dollar":
          newKey = "Dólar";
          break;

        case "Pound Sterling":
          newKey = "Libra Esterlina";
          break;

        default:
          newKey = key;
          break;
      }

      response.push(newKey);
    });

    return response;
  }

  onRevertTranslate = key => {
    let newKey = "";
    switch (key) {
      case "Peso Argentino":
        newKey = "Argentine Peso";
        break;

      case "Dólar":
        newKey = "Dollar";
        break;

      case "Libra Esterlina":
        newKey = "Pound Sterling";
        break;

      default:
        newKey = key;
        break;
    }

    return newKey;
  };

  onChangedValue = async e => {
    this.setState({ value: e.target.value });

    document.querySelector("select").value = "Selecione uma moeda";
  };

  onCurrencySelected = async e => {
    this.setState({ currencySelected: e.target.value }, () =>
      this.calculateConversion()
    );
  };

  calculateConversion = () => {
    const { currencies } = this.props;
    const listKeys = Object.keys(currencies);
    const { value, currencySelected } = this.state;

    let response = 0;
    let currency = this.onRevertTranslate(currencySelected);
    let rate = {};

    listKeys.map(key => {
      if (key === currency) {
        rate = this.copyObject(currencies[key]);
      }
    });

    rate.buy = rate.buy.replace("$", "");
    rate.buy = rate.buy.replace(",", "");

    response = value * rate.buy;

    this.setState({ convertedValue: response.toFixed(2) });
  };

  copyObject = obj => {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    let temp = obj.constructor();

    for (let key in obj) {
      temp[key] = this.copyObject(obj[key]);
    }

    return temp;
  };

  render() {
    const { currencies } = this.props;
    const keys = Object.keys(currencies);

    let translateCurrencies = {};
    translateCurrencies = this.onTranslateKeys(keys);
    translateCurrencies = translateCurrencies.sort();

    return (
      <div className="box-converter">
        <h2>Conversor</h2>

        <input
          type="number"
          placeholder="Insira uma quantia em dinheiro"
          onChange={this.onChangedValue}
        />
        <select onChange={this.onCurrencySelected}>
          <option>Selecione uma moeda</option>
          {translateCurrencies.map(key => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <input type="number" readOnly value={this.state.convertedValue} />
      </div>
    );
  }
}

export default CurrencyConverter;
