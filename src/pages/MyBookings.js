import React, { useState, useEffect } from "react";
import { Container, Card, Button, Alert, Modal } from "react-bootstrap";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(storedBookings);
  }, []);

  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleConfirmCancel = () => {
    const updatedBookings = bookings.map((b) =>
      b.id === selectedBooking.id ? { ...b, status: "cancelled" } : b
    );
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setShowModal(false);
  };

  const isWithin24Hours = (date, time) => {
    const bookingDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const diffHours = (bookingDateTime - now) / (1000 * 60 * 60);
    return diffHours < 24;
  };

  return (
    <Container className="mt-4">
      <h2>我的預約紀錄</h2>
      {bookings.length === 0 ? (
        <Alert variant="info">目前沒有預約紀錄</Alert>
      ) : (
        bookings.map((b, index) => (
          <Card key={index} className="mb-3">
            <Card.Body>
              <Card.Title>{b.providerName}</Card.Title>
              <Card.Text>日期：{b.date}</Card.Text>
              <Card.Text>時間：{b.time}</Card.Text>
              <Card.Text>需求描述：{b.description}</Card.Text>
              {b.createdAt && <Card.Text>建立時間：{b.createdAt}</Card.Text>}
              <Card.Text>狀態：{b.status || "active"}</Card.Text>

              {b.status !== "cancelled" && (
                <Button
                  variant="danger"
                  onClick={() => handleCancelClick(b)}
                  className="mt-2"
                >
                  取消預約
                </Button>
              )}
            </Card.Body>
          </Card>
        ))
      )}

      {/* 📌 Modal 提醒 */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>取消預約確認</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking &&
          isWithin24Hours(selectedBooking.date, selectedBooking.time) ? (
            <Alert variant="warning">
              ⚠️ 此預約已接近服務時間，請聯絡客服或店家處理。
              <br />
              客服電話：02-1234-5678
              <br />
              Email：support@example.com
            </Alert>
          ) : (
            <p>您確定要取消這筆預約嗎？</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            關閉
          </Button>
          {selectedBooking &&
          !isWithin24Hours(selectedBooking.date, selectedBooking.time) && (
            <Button variant="danger" onClick={handleConfirmCancel}>
              確認取消
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default MyBookings;
