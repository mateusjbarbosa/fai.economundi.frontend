import React, { Component } from "react";
import { Link } from 'react-router-dom';

import api from "../../services/api";

import "./pinnedNews.scss";

import LogoIcon from "../../img/logo-icon.png";

class PinnedNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pinned: [],
      style: {}, 

      loading: true
    };
  }

  async componentDidMount() {
    await this.getPinnedNews();

    this.setStyle();
  }

  getPinnedNews = async () => {
    const response = await api.get("/api/v1/news/Brazil/0");

    this.setState({ pinned: response.data.data[0] });
  };

  setStyle = async () => {
    let { pinned } = this.state;

    pinned.urlToImage = pinned.urlToImage.replace("filters:cover():strip_icc()/", "");

    let style = {
      backgroundImage: `url(${pinned.urlToImage})`,
      height: "100%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }

    this.setState({ style }, this.setState({ loading: false }));
  }

  render() {
    const { loading, pinned, style } = this.state;

    return (
      <>
        {loading ? (<h1>Carregando...</h1>) :
          (
            <div className='pinnedNews' style={style}>
              <Link to="/noticias">
                <div className='logo'><img src={LogoIcon} alt="Portal EconoMundi" /></div>
              </Link>
              
              <h3>{pinned.source}</h3>
              <h1>{pinned.title}</h1>
              <h2>{pinned.description}</h2>
            </div>
          )
        }
      </>
    )
  }
}

export default PinnedNews;