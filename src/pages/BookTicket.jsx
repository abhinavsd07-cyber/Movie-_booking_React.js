import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosConfig from "../api/axiosConfig";
import { Container, Button, Form } from "react-bootstrap";

const times = ["10:00 AM", "1:30 PM", "4:45 PM", "7:30 PM", "10:15 PM"];
const screens = ["Screen 1", "Screen 2", "Screen 3"];

const BookTicket = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [seats, setSeats] = useState(1);
  const [time, setTime] = useState(times[0]);
  const [screen, setScreen] = useState(screens[0]);

  const navigate = useNavigate();

  // ----------------------------------------------
  // Fetch movie data
  // ----------------------------------------------
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axiosConfig.get(`/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error("Movie fetch error:", err);
      }
    };
    fetchMovie();
  }, [id]);

  // ----------------------------------------------
  // BOOK TICKET
  // ----------------------------------------------
  const handleBook = async () => {
    if (!movie) return;

    if (seats < 1) {
      alert("Please select at least 1 seat");
      return;
    }

    const ticket = {
      id: Math.random().toString(36).substring(2, 10), // unique ID
      movieId: movie.id,
      movieName: movie.name,
      poster: movie.poster,
      seats: Number(seats),
      time,
      screen,
      bookingDate: new Date().toISOString().slice(0, 10),
      bookingId: Math.random().toString(36).substring(2, 8),
    };

    try {
      await axiosConfig.post("/tickets", ticket); // Render-safe POST
      navigate("/ticket-success", { state: { ticket } });
    } catch (err) {
      console.error("Ticket booking error:", err);
      alert("Booking failed! Try again.");
    }
  };

  if (!movie)
    return (
      <Container className="py-5 text-center">
        <h4>Loading movie details...</h4>
      </Container>
    );

  return (
    <Container className="py-5">
      <h3>Book Tickets — {movie.name}</h3>

      <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
        {/* Movie Poster */}
        <img
          src={movie.poster}
          alt={movie.name}
          style={{ width: 200, borderRadius: 10 }}
        />

        {/* Booking Form */}
        <div style={{ flex: 1 }}>
          <Form.Group className="mb-3">
            <Form.Label>Number of Seats</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              style={{ width: 150 }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Show Time</Form.Label>
            <Form.Select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{ width: 220 }}
            >
              {times.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Screen</Form.Label>
            <Form.Select
              value={screen}
              onChange={(e) => setScreen(e.target.value)}
              style={{ width: 220 }}
            >
              {screens.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button
            variant="primary"
            size="lg"
            onClick={handleBook}
            style={{ marginTop: 10 }}
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default BookTicket;
