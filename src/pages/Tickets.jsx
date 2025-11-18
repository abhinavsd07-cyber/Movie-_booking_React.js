import React, { useEffect, useState } from "react";
import axiosConfig from "../api/axiosConfig";
import jsPDF from "jspdf";
import { imageToBase64 } from "../utils/imageToBase64";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const res = await axiosConfig.get("/tickets");
      setTickets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchTickets(); }, []);

  const handleDownload = async (ticket) => {
    try {
      const pdf = new jsPDF();
      pdf.setFontSize(20);
      pdf.text(ticket.movieName, 20, 20);

      const base64 = await imageToBase64(ticket.poster);
      if (base64) pdf.addImage(base64, "JPEG", 15, 30, 180, 100);

      pdf.setFontSize(12);
      pdf.text(`Seats: ${ticket.seats}`, 20, 140);
      pdf.text(`Time: ${ticket.time}`, 20, 150);
      pdf.text(`Screen: ${ticket.screen}`, 20, 160);
      pdf.text(`Booking ID: ${ticket.bookingId}`, 20, 170);
      pdf.text(`Date: ${ticket.bookingDate}`, 20, 180);

      pdf.save(`${ticket.movieName}_ticket.pdf`);
    } catch (err) {
      console.error(err);
      alert("PDF creation failed");
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure to cancel this ticket?")) return;
    try {
      await axiosConfig.delete(`/tickets/${id}`);
      fetchTickets();
    } catch (err) {
      console.error(err);
      alert("Cancel failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Your Tickets</h1>
      {tickets.length === 0 && <p>No tickets booked.</p>}

      {tickets.map((t) => (
        <div key={t.id} style={cardStyle}>
          <img src={t.poster} alt={t.movieName} style={{ width: 110, height: 160, objectFit: "cover", borderRadius: 6 }} />
          <div style={{ marginLeft: 18, flex: 1 }}>
            <h4 style={{ margin: 0 }}>{t.movieName}</h4>
            <small>Seats: {t.seats} • {t.time} • {t.screen}</small>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button onClick={() => handleDownload(t)} style={btn.green}>Download</button>
            <button onClick={() => handleCancel(t.id)} style={btn.red}>Cancel</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const cardStyle = { display: "flex", alignItems: "center", gap: 16, background: "#f8f9fa", padding: 18, borderRadius: 12, marginBottom: 18 };
const btn = {
  green: { background: "#198754", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer" },
  red: { background: "#dc3545", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer" }
};

export default Tickets;
