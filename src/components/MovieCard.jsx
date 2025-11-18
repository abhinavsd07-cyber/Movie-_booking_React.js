import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../styles/MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <Card className="movie-card border" style={{backgroundColor:"black"}}>
      <div className="img-wrapper">
        <Card.Img
          variant="top"
          src={movie.poster || "https://via.placeholder.com/300x450?text=No+Image"}
          className="movie-img"
          alt={movie.name}
         style={{objectFit:"contain"}}/>
      </div>

      <Card.Body className="card-body-dark">
        <Card.Title className="movie-title text-light">{movie.name}</Card.Title>
        <Card.Text className="movie-meta">
          {movie.genre} • {movie.year} <br />
          Director: {movie.director} • ⭐ {movie.rating}
        </Card.Text>

        <div className="d-grid gap-2">
          <Button as={Link} to={`/movie/${movie.id}`} variant="light">Details</Button>
          <Button as={Link} to={`/book/${movie.id}`} variant="danger">Book</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
