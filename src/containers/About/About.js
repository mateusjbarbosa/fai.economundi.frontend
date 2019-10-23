import React from "react";

import "./about.scss";

const About = () => {
  return (
    <>
      <h1>O que é o Portal EconoMundi?</h1>
      <div className="scope">
        <p>
          EconoMundi é um portal de notícias integrado com o objetivo de exibir
          o que há de mais importante no contexto econômico do Brasil e do
          mundo. Leitores leigos no assunto conseguem aprender lendo as matérias
          que estão disponíveis, com o auxílio de um dicionário que explica
          todos os termos técnicos, pode também criar um perfil de investidor e
          descobrir qual investimento se adequa a sua personalidade. Para os
          usuários que já têm uma certa familiaridade, EconoMundi também
          possibilita que esse possa simular investimentos. O portal exibe
          índice das bolsas, ações e câmbio.
        </p>
      </div>

      <div className="developers">
        <h2>Desenvolvido por:</h2>
        <p>Alexandre da Silva Ribeiro</p>
        <p>João Vitor Teixeira</p>
        <p>Mateus José Barbosa</p>
      </div>
    </>
  );
};

export default About;
