import React, { Component } from "react";
import axios from 'axios';

import api from "../../services/api";

import "./profileData.scss";

const update = {
  WAIT: 0,
  OK: 1,
  ERROR: 2
};

class ProfileData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      name: "",
      lastName: "",
      birth: "",

      newName: "",
      newLastName: "",
      newBirth: "",

      loading: true,

      statusUpdate: update.WAIT
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const response = await api.get("api/v1/public/getlogin", {
      headers: {
        Authorization: localStorage.getItem("tokenUser")
      }
    });

    let birth = "";

    if (response.status === 200) {
      this.setState({
        id: response.data.id,
        name: response.data.FirstName,
        lastName: response.data.LastName,

        newLastName: response.data.LastName,
        newName: response.data.FirstName
      }, () => {
        birth = response.data.birth;
        birth = this.alterBirthFormat(birth);
        this.setState({ birth, newBirth: birth });
      });
    }
  };

  onFirstNameChanged = async e => {
    const value = e.target.value;

    this.setState(() => ({ newName: value }));
  };

  onLastNameChanged = async e => {
    const value = e.target.value;

    this.setState(() => ({ newLastName: value }));
  };

  onBirthChanged = async e => {
    const value = e.target.value;

    this.setState(() => ({ newBirth: value }));
  };

  onUpdateSubmit = async () => {
    const { id, newBirth, newLastName, newName } = this.state;

    this.setState({ loading: true });

    const response = await axios.put("http:/economundi-frontend.herokuapp.com/api/v1/public/update", {
      id: id,
      date_birth: newBirth,
      first_name: newName,
      last_name: newLastName
    });

    if (response.status === 200) {
      this.setState({ statusUpdate: update.OK, loading: false });

      window.scrollTo(0, window.innerHeight);
    } else {
      this.setState({ statusUpdate: update.ERROR });
    }
  };

  alterBirthFormat = birth => {
    const birthSplit = birth.split(" ");
    const birthFormat = birthSplit[1].replace(",", "");
    const newBirth = [birthSplit[0], birthFormat, birthSplit[2]];

    let monthNumber = 0;

    switch (newBirth[0]) {
      case "Jan":
        monthNumber = 1;
        break;

      case "Feb":
        monthNumber = 2;
        break;

      case "Mar":
        monthNumber = 3;
        break;

      case "Apr":
        monthNumber = 4;
        break;

      case "May":
        monthNumber = 5;
        break;

      case "Jun":
        monthNumber = 6;
        break;

      case "Jul":
        monthNumber = 7;
        break;

      case "Aug":
        monthNumber = 8;
        break;

      case "Sep":
        monthNumber = 9;
        break;

      case "Oct":
        monthNumber = 10;
        break;

      case "Nov":
        monthNumber = 11;
        break;

      case "Dec":
        monthNumber = 12;
        break;

      default:
        break;
    }

    let dayNumber = parseInt(newBirth[1]);

    const birthSave =
      newBirth[2] +
      "-" +
      (monthNumber < 10
        ? "0" + monthNumber.toString()
        : monthNumber.toString()) +
      "-" +
      (dayNumber < 10 ? "0" + dayNumber.toString() : dayNumber);

    this.setState({ loading: false });

    return birthSave;
  };

  renderStatusUpdate = () => {
    const { statusUpdate } = this.state;
    switch (statusUpdate) {
      case update.WAIT:
        return <div></div>;

      case update.OK:
        return (
          <div className="pop-up-green">
            <h2>
              Dados enviados com sucesso!
            </h2>
          </div>
        );

      case update.ERROR:
        return (
          <div className="pop-up-red">
            <h2>
              Desculpe-nos, algo de errado aconteceu! Verifique os campos e
              tente novamente, por favor!
            </h2>
          </div>
        );

      default:
        return <div></div>;
    }
  };

  render() {
    const { name, lastName, birth, loading } = this.state;

    return (
      <>
        {loading ? (
          <h1>Carregando seus dados...</h1>
        ) : (
          <>
            <div className="update-title">
              <h1>Olá, {name}!</h1>
            </div>

            <div className="data">
              <h2>Seus dados</h2>
              <div className="data-user">
                <input
                  type="text"
                  onChange={this.onFirstNameChanged}
                  defaultValue={name}
                />
                <input
                  type="text"
                  onChange={this.onLastNameChanged}
                  defaultValue={lastName}
                />
                <input
                  type="date"
                  onChange={this.onBirthChanged}
                  defaultValue={birth}
                />
              </div>

              <button className="btn-save" onClick={this.onUpdateSubmit}>
                Salvar alterações
              </button>
              <button className="btn-alter-pass" onClick={this.onAlterPassword}>
                Redefinir senha
              </button>
              <button className="btn-delete-user" onClick={this.onDeleteUser}>
                Deletar meu usuário
              </button>
            </div>

            {this.renderStatusUpdate()}
          </>
        )}
      </>
    );
  }
}

export default ProfileData;
