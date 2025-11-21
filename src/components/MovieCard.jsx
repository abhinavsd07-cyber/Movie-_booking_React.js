import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "../styles/MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <Card className="movie-card border" style={{backgroundColor:"black",color:"white"}}>
      <Card.Img
        variant="top"
        src={movie.poster}
        alt={movie.name}
        className="movie-img"
      />

      <Card.Body>
        <Card.Title className="movie-title">{movie.name}</Card.Title>

        <div className="btn-row">
          <Link to={`/movie/${movie.id}`}>
            <Button variant="dark" size="sm">Details</Button>
          </Link>

          <Link to={`/book/${movie.id}`}>
            <Button variant="success" size="sm">Book Now</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
