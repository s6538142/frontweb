import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import providers from "../data/providers.json";
import { Container, Form, Button, Card } from "react-bootstrap";

function Booking() {
  const { id } = useParams(); // providerId
  const provider = providers.find((p) => p.id === parseInt(id));
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const bookingData = {
      id: Date.now(), // 預約編號
      providerId: id,
      providerName: provider?.name,
      date: formData.get("date"),
      time: formData.get("time"),
      address: formData.get("address"),
      description: formData.get("description"),
      createdAt: new Date().toLocaleString()
    };

    // 存到 localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push(bookingData);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // 跳轉到成功頁面
    navigate("/booking-success", { state: bookingData });
  };

  return (
    <Container className="mt-4">
      <h2>預約服務：{provider ? provider.name : "未知業者"}</h2>

      {provider && (
        <Card className="mb-3">
          <Card.Body>
            <Card.Text>技能：{provider.skills.join(", ")}</Card.Text>
            <Card.Text>價格範圍：{provider.priceRange}</Card.Text>
            <Card.Text>服務範圍：{provider.serviceArea.join(", ")}</Card.Text>
          </Card.Body>
        </Card>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>日期</Form.Label>
          <Form.Control type="date" name="date" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>時間</Form.Label>
          <Form.Control type="time" name="time" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>服務地址</Form.Label>
          <Form.Control type="text" name="address" placeholder="請輸入服務地址" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>需求描述</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" required />
        </Form.Group>
        <Button variant="primary" type="submit">
          確認預約
        </Button>
      </Form>
    </Container>
  );
}

export default Booking;
