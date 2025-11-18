import React, { useEffect, useState } from "react";
import axiosConfig from "../api/axiosConfig";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);

  const loadTickets = async () => {
    const res = await axiosConfig.get("/tickets");
    setTickets(res.data);
  };

  const cancelTicket = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this ticket?")) return;

    try {
      await axiosConfig.delete(`/tickets/${id}`);
      alert("Ticket cancelled successfully!");
      loadTickets(); // refresh list
    } catch (err) {
      console.log(err);
      alert("Failed to cancel ticket.");
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-light mb-4">My Booked Tickets</h2>

      <Row>
        {tickets.map((t) => (
          <Col md={4} key={t.id} className="mb-4">
            <Card className="shadow">
              <Card.Img
                variant="top"
                src={t.moviePoster}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{t.movieName}</Card.Title>
                <Card.Text>
                  🎬 Seats: {t.seats.join(", ")} <br />
                  📅 Date: {t.date} <br />
                  🎟 Tickets: {t.count} <br />
                  💰 Price: ₹{t.price}
                </Card.Text>
                <Button
                  variant="danger"
                  className="w-100"
                  onClick={() => cancelTicket(t.id)}
                >
                  Cancel Ticket
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {tickets.length === 0 && (
        <p className="text-light text-center mt-5">No tickets booked yet.</p>
      )}
    </Container>
  );
};

export default AllTickets;
