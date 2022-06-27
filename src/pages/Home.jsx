import React from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Request";

const Home = () => {
  console.log(requests.requestAPI);
  return (
    <>
      <Main />
      <Row
        path="explore"
        rowID="1"
        title="Upcoming"
        fetchURL={requests.requestUpcoming}
        fetchAPI={requests.requestAPI}
      />
      <Row
        rowID="2"
        title="Popular"
        fetchURL={requests.requestPopular}
        fetchAPI={requests.requestAPI}
      />
      <Row
        rowID="3"
        title="Trending"
        fetchURL={requests.requestTrending}
        fetchAPI={requests.requestAPI}
      />
      <Row
        rowID="4"
        title="TopRated"
        fetchURL={requests.requestTopRated}
        fetchAPI={requests.requestAPI}
      />
      <Row
        rowID="5"
        title="Horror"
        fetchURL={requests.requestHorror}
        fetchAPI={requests.requestAPI}
      />
    </>
  );
};

export default Home;
