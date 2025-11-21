import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import axiosConfig from "../api/axiosConfig";

// FIX 1: Stronger image-to-base64 converter (works with Render)
const toBase64 = async (url) => {
  try {
    const res = await fetch(url, { mode: "cors" });
    const blob = await res.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
    });
  } catch (err) {
    console.error("Base64 error:", err);
    return null;
  }
};

const TicketSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const ticket = state?.ticket;

  if (!ticket)
    return <div style={{ padding: 40 }}>❌ No ticket data found.</div>;

  // ------------------------------------------------
  // PDF GENERATOR (Fixed for external image links)
  // ------------------------------------------------
  const generatePDF = async () => {
    try {
      const pdf = new jsPDF("p", "mm", "a4");

      pdf.setFontSize(22);
      pdf.text(ticket.movieName, 20, 20);

      const base64 = await toBase64(ticket.poster);

      if (base64) {
        pdf.addImage(base64, "JPEG", 15, 30, 180, 100);
      } else {
        pdf.text("(Poster failed to load)", 20, 40);
      }

      pdf.setFontSize(12);
      pdf.text(`Seats: ${ticket.seats}`, 20, 140);
      pdf.text(`Time: ${ticket.time}`, 20, 150);
      pdf.text(`Screen: ${ticket.screen}`, 20, 160);
      pdf.text(`Booking ID: ${ticket.bookingId}`, 20, 170);
      pdf.text(`Date: ${ticket.bookingDate}`, 20, 180);

      pdf.save(`${ticket.movieName}_ticket.pdf`);
    } catch (err) {
      console.error("PDF Error:", err);
      alert("Failed to generate ticket PDF");
    }
  };

  // ------------------------------------------------
  // Cancel Ticket (Works With Render)
  // ------------------------------------------------
  const handleCancel = async () => {
    const ok = window.confirm("Are you sure you want to cancel this ticket?");
    if (!ok) return;

    try {
      await axiosConfig.delete(`/tickets/${ticket.id}`);
      alert("Ticket cancelled successfully!");
      navigate("/tickets");
    } catch (err) {
      console.error(err);
      alert("Could not cancel ticket. Try again.");
    }
  };

  return (
    <div style={{ padding: 40, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: 420,
          background: "#fff",
          padding: 20,
          borderRadius: 8,
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2>🎉 Booking Confirmed</h2>

        <img
          src={ticket.poster}
          alt={ticket.movieName}
          style={{
            width: "100%",
            borderRadius: 8,
            marginBottom: 12,
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        />

        <h4>{ticket.movieName}</h4>
        <p>Seats: {ticket.seats}</p>
        <p>Time: {ticket.time}</p>
        <p>Screen: {ticket.screen}</p>
        <p>Booking ID: {ticket.bookingId}</p>

        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <button onClick={generatePDF} style={btn.green}>
            ⬇ Download Ticket PDF
          </button>
          <button onClick={handleCancel} style={btn.red}>
            ❌ Cancel Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

const btn = {
  green: {
    background: "#198754",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
  },
  red: {
    background: "#dc3545",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
  },
};

export default TicketSuccess;
