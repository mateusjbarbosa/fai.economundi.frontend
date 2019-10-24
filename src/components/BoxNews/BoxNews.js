import React, { Component } from "react";

import "./boxNews.scss";

class BoxNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: {}
    };
  }

  componentDidMount() {
    this.onLoadNews();
  }

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

  onLoadNews = async () => {
    let { news } = this.props;

    news.urlToImage = news.urlToImage.replace("filters:cover():strip_icc()/", "");

    let style = {
      backgroundImage: `url(${news.urlToImage})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    };

    this.setState({ style });
  };

  render() {
    const { news } = this.props;
    const { style } = this.state;
    return (
      <div className="box-news" style={style}>
        <span />
        <div className="box-news-source">
          <h2>{news.source}</h2>
        </div>
        <div className="box-news-description">
          <p>{news.title}</p>
        </div>
        <div className="box-news-link">
          <a href={news.url} target="_blank" rel="noopener noreferrer">
            Ver notícia >>
          </a>
        </div>
      </div>
    );
  }
}

export default BoxNews;
