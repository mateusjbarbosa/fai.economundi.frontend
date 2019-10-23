import React, { Component } from "react";
import axios from "axios";

import api from "../../services/api";

import "./recovery.scss";

class Recovery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      email: "",
      newPass: "",

      existsToken: false
    };
  }

  componentDidMount() {
    let token = this.props.location.search.replace("?", "");

    this.setState({ token });
  }

  onEmail = e => {
    this.setState({ email: e.target.value });
  };

  onNewPass = e => {
    this.setState({ newPass: e.target.value });
  };

  onSend = async () => {
    const { email } = this.state;

    let response = "";

    if (email != null) {
      response = await axios.get(`api/v1/public/recovery/findByEmail/${email}`);
    }

    console.log(response);
  };

  onRecovery = async () => {
    const response = await api.post(
      `api/v1/public/recovery?emailVerificationToken=${this.state.token}&password=${this.state.newPass}`
    );

    console.log(response);
  };

  render() {
    const { existsToken } = this.state;
    return (
      <>
        <div className="recovery-title">
          <h1>Redefinir senha</h1>
        </div>
        {existsToken ? (
          <div className="recovery-container">
            <h2>Insira sua nova senha</h2>
            <input
              type="password"
              placeholder="Lembre-se: pelo menos 8 caracteres!"
              onChange={this.onNewPass}
            />
            <button onClick={this.onRecovery}>Redefinir!</button>
          </div>
        ) : (
          <div className="recovery-container">
            <h2>Insira seu e-mail</h2>
            <input
              type="email"
              placeholder="Lembre-se: você deve estar cadastrado"
              onChange={this.onEmail}
            />
            <button onClick={this.onSend}>Enviar solicitação</button>
          </div>
        )}
      </>
    );
  }
}

export default Recovery;
