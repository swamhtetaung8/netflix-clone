import React from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Requests";

const Home = () => {
  return (
    <>
      <Main />
      <div className="my-10">
        <Row rowId="1" title="Upcoming" fetchUrl={requests.requestUpcoming} />
        <Row rowId="2" title="Popular" fetchUrl={requests.requestPopular} />
        <Row rowId="3" title="Trending" fetchUrl={requests.requestTrending} />
        <Row rowId="4" title="Top Rated" fetchUrl={requests.requestTopRated} />
        <Row rowId="5" title="Horror" fetchUrl={requests.requestHorror} />
      </div>
    </>
  );
};

export default Home;
