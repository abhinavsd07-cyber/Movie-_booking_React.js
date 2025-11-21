import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosConfig from "../api/axiosConfig";
import { Container, Button } from "react-bootstrap";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axiosConfig.get(`/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <Container className="py-5">Loading...</Container>;

  return (
    <Container className="py-5">
      <h2>{movie.name}</h2>

      <div style={{ display: "flex", gap: 25, marginTop: 25 }}>
        <img
          src={movie.poster}
          alt={movie.name}
          style={{ width: 260, borderRadius: 10 }}
        />

        <div>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Rating:</strong> ⭐ {movie.rating}</p>
          <p><strong>Description:</strong> {movie.description}</p>

          <Button
            variant="success"
            onClick={() => navigate(`/book/${movie.id}`)}
          >
            Book Ticket
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default MovieDetails;
