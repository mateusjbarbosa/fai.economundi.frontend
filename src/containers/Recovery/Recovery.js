import React, { Component } from "react";
import axios from "axios";

import api from "../../services/api";

import "./recovery.scss";

class Recovery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      newPass: "",
      loading: true
    };
  }

  componentDidMount() {
    let token = this.props.location.search.replace("?", "");

    this.setState({ token });
  }

  onNewPass = e => {
    this.setState({ newPass: e.target.value });
  };

  onRecovery = async () => {
    const response = await api.post(
      `api/v1/public/recovery?emailVerificationToken=${this.state.token}&password=${this.state.newPass}`
    );

    console.log(response);
  };

  render() {
    return (
      <>
        <div className="recovery-title">
          <h1>Redefinir senha</h1>
        </div>

        <div className="recovery-container">
          <h2>Insira sua nova senha</h2>
          <input
            type="password"
            placeholder="Lembre-se: pelo menos 8 caracteres!"
            onChange={this.onNewPass}
          />
          <button onClick={this.onRecovery}>Redefinir!</button>
        </div>
      </>
    );
  }
}

export default Recovery;
