import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosConfig from "../api/axiosConfig";
import { Container, Row, Col, Button } from "react-bootstrap";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosConfig.get(`/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [id]);

  if (!movie) return <Container className="py-5">Loading...</Container>;

  return (
    <Container className="py-5"  >
      <Row>
        <Col md={4}>
          <img src={movie.poster} alt={movie.name} style={{ width: "100%", borderRadius: 8 }} />
        </Col>

        <Col md={8}>
          <h2>{movie.name}</h2>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Rating:</strong> ⭐ {movie.rating}</p>

          <div className="mt-3 d-flex gap-2">
            <Link to={`/book/${movie.id}`}><Button variant="primary">Book Tickets</Button></Link>
            <Link to="/"><Button variant="outline-secondary">Back</Button></Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetails;
