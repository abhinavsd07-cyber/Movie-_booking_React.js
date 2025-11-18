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

  const handleBook = async () => {
    if (!movie) return;
    try {
      const ticket = {
        id: Math.random().toString(36).substring(2, 9),
        movieId: movie.id,
        movieName: movie.name,
        poster: movie.poster,
        seats: Number(seats),
        time,
        screen,
        bookingDate: new Date().toISOString().slice(0, 10),
        bookingId: Math.random().toString(36).substring(2, 8)
      };
      await axiosConfig.post("/tickets", ticket);
      // navigate to success and pass ticket via state
      navigate("/ticket-success", { state: { ticket } });
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  if (!movie) return <Container className="py-5">Loading...</Container>;

  return (
    <Container className="py-5">
      <h3>Book for: {movie.name}</h3>
      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <img src={movie.poster} alt={movie.name} style={{ width: 180, borderRadius: 8 }} />
        <div style={{ flex: 1 }}>
          <Form.Group className="mb-3">
            <Form.Label>Seats</Form.Label>
            <Form.Control type="number" min={1} value={seats} onChange={(e) => setSeats(e.target.value)} style={{ width: 120 }} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Show Time</Form.Label>
            <Form.Select value={time} onChange={(e) => setTime(e.target.value)} style={{ width: 200 }}>
              {times.map((t) => <option key={t}>{t}</option>)}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Screen</Form.Label>
            <Form.Select value={screen} onChange={(e) => setScreen(e.target.value)} style={{ width: 200 }}>
              {screens.map((s) => <option key={s}>{s}</option>)}
            </Form.Select>
          </Form.Group>

          <Button variant="primary" onClick={handleBook}>Confirm Booking</Button>
        </div>
      </div>
    </Container>
  );
};

export default BookTicket;
