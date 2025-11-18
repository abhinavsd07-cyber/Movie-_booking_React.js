import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { imageToBase64 } from "../utils/imageToBase64";
import axiosConfig from "../api/axiosConfig";

const TicketSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const ticket = state?.ticket;

  if (!ticket) return <div style={{ padding: 40 }}>No ticket data found.</div>;

  const generatePDF = async () => {
    try {
      const pdf = new jsPDF();
      pdf.setFontSize(22);
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
      console.error("pdf error", err);
      alert("Failed to create PDF");
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Cancel this ticket?")) return;
    try {
      await axiosConfig.delete(`/tickets/${ticket.id}`);
      alert("Ticket cancelled");
      navigate("/tickets");
    } catch (err) {
      console.error(err);
      alert("Cancel failed");
    }
  };

  return (
    <div style={{ padding: 40, display: "flex", justifyContent: "center" }}>
      <div style={{ width: 420, background: "#fff", padding: 20, borderRadius: 8, boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }}>
        <h2>Booking Confirmed 🎉</h2>
        <img src={ticket.poster} alt={ticket.movieName} style={{ width: "100%", borderRadius: 8, marginBottom: 12 }} />
        <h4>{ticket.movieName}</h4>
        <p>Seats: {ticket.seats}</p>
        <p>Time: {ticket.time}</p>
        <p>Screen: {ticket.screen}</p>
        <p>Booking ID: {ticket.bookingId}</p>

        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <button onClick={generatePDF} style={btnStyle.green}>⬇ Download PDF</button>
          <button onClick={handleCancel} style={btnStyle.red}>❌ Cancel Ticket</button>
        </div>
      </div>
    </div>
  );
};

const btnStyle = {
  green: { background: "#198754", color: "#fff", padding: "8px 14px", border: "none", borderRadius: 6, cursor: "pointer" },
  red: { background: "#dc3545", color: "#fff", padding: "8px 14px", border: "none", borderRadius: 6, cursor: "pointer" }
};

export default TicketSuccess;
