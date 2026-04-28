// src/pages/MyBookings.js
import React from "react";
import { Container, Card } from "react-bootstrap";

function MyBookings() {
  // 從 localStorage 取出預約紀錄
  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

  return (
    <Container className="mt-4">
      <h2>我的預約紀錄</h2>
      {bookings.length === 0 ? (
        <p>目前沒有預約紀錄</p>
      ) : (
        bookings.map((b, index) => (
          <Card key={index} className="mb-3">
            <Card.Body>
              <Card.Title>{b.providerName}</Card.Title>
              <Card.Text>日期：{b.date}</Card.Text>
              <Card.Text>時間：{b.time}</Card.Text>
              <Card.Text>需求描述：{b.description}</Card.Text>
              {b.createdAt && <Card.Text>建立時間：{b.createdAt}</Card.Text>}
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}

export default MyBookings;
