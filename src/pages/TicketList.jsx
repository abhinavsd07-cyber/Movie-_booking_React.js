import React, { useEffect, useState } from "react";
import axiosConfig from "../api/axiosConfig";
import { Container, Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  const fetch = async () => {
    try {
      const res = await axiosConfig.get("/tickets");
      setTickets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetch(); }, []);

  const download = async (ticket) => {
    // create a DOM element for the ticket visually
    const wrapper = document.createElement("div");
    wrapper.style.width = "600px";
    wrapper.style.padding = "18px";
    wrapper.style.background = "#fff";
    wrapper.style.borderRadius = "8px";
    wrapper.style.color = "#000";
    wrapper.style.fontFamily = "Arial, sans-serif";

    wrapper.innerHTML = `
      <div style="display:flex; gap:12px;">
        <img src="${ticket.poster}" style="width:150px; border-radius:6px;" />
        <div>
          <h2 style="margin:0">${ticket.movieName}</h2>
          <p style="margin:6px 0">Seats: ${ticket.seats}</p>
          <p style="margin:6px 0">Time: ${ticket.time}</p>
          <p style="margin:6px 0">Screen: ${ticket.screen}</p>
          <p style="margin:6px 0; color:#666;">Booking ID: ${ticket.id}</p>
          <p style="margin:6px 0; color:#666;">Date: ${ticket.bookingDate}</p>
        </div>
      </div>
    `;

    document.body.appendChild(wrapper);
    const canvas = await html2canvas(wrapper, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // margins
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
    pdf.save(`${ticket.movieName}_ticket_${ticket.id}.pdf`);

    document.body.removeChild(wrapper);
  };

  return (
    <Container className="py-5">
      <h3>Your Tickets</h3>

      {tickets.length === 0 && <p>No bookings yet.</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {tickets.map((t) => (
          <div key={t.id} style={{ display: "flex", gap: 16, alignItems: "center", background: "#f8f9fa", padding: 12, borderRadius: 8 }}>
            <img src={t.poster} alt={t.movieName} style={{ width: 100, borderRadius: 6 }} />
            <div style={{ flex: 1 }}>
              <h5 style={{ margin: 0 }}>{t.movieName}</h5>
              <small>Seats: {t.seats} • {t.time} • {t.screen}</small>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="success" onClick={() => download(t)}>Download</Button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default TicketList;
