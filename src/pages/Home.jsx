import React, { useEffect, useState } from "react";
import axiosConfig from "../api/axiosConfig";
import MovieCard from "../components/MovieCard";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const q = params.get("q") || "";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axiosConfig.get("/movies");
        setMovies(res.data);
      } catch (err) {
        console.error("Failed to fetch movies", err);
      }
    };

    fetchMovies();
  }, []);

  const filtered = movies.filter((m) =>
    m.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      {/* ======================== HERO CAROUSEL ======================== */}
      <Carousel fade interval={3000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1763188137924_linkinparkwebnew.jpg"
            alt="Slide 1"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1761907921032_amusementparkdesktop.jpg"
            alt="Slide 2"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1760430005960_popccweb.jpg"
            alt="Slide 3"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1762856240840_littleboxofsweetsweb.jpg"
            alt="Slide 4"
          />
        </Carousel.Item>
      </Carousel>

      {/* ======================== MOVIES GRID ======================== */}
      <div className="movies-section py-5" style={{ backgroundColor: "black" }}>
        <Container>
          <h3 className="text-light mb-4">Available Movies</h3>

          <Row className="gy-4">
  {(q ? filtered : movies).map((movie) => (
    <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
      <MovieCard movie={movie} />
    </Col>
  ))}
</Row>

        </Container>
      </div>
    </div>
  );
};

export default Home;
