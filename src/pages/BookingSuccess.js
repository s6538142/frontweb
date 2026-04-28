// pages/BookingSuccess.js
import React from "react";
import { Container, Alert, Button, Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function BookingSuccess() {
  const location = useLocation();
  const { providerId, providerName, date, time, description } = location.state || {};
  const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <Container className="mt-4 text-center">
      <Alert variant="success">
        已成功預約 {providerName || "未知業者"}！
      </Alert>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>預約摘要</Card.Title>
          <Card.Text>訂單編號：{orderNumber}</Card.Text>
          <Card.Text>日期：{date}</Card.Text>
          <Card.Text>時間：{time}</Card.Text>
          <Card.Text>需求描述：{description}</Card.Text>
        </Card.Body>
      </Card>

      {/* 提示保持電話暢通 */}
      <Alert variant="info" className="mt-3">
        請保持電話暢通，以便業者與您確認服務細節。
      </Alert>

      {/* 平台客服資訊 */}
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>平台客服聯絡資訊</Card.Title>
          <Card.Text>客服電話：02-1234-5678</Card.Text>
          <Card.Text>客服 Email：support@yourplatform.com</Card.Text>
          <Card.Text>服務時間：週一至週五 09:00 - 18:00</Card.Text>
        </Card.Body>
      </Card>

      {/* 返回按鈕 */}
      <div className="mt-3">
        <Button as={Link} to="/" variant="secondary" className="me-2">
          返回首頁
        </Button>
        {providerId && (
          <Button as={Link} to={`/provider/${providerId}`} variant="primary">
            返回業者頁面
          </Button>
        )}
      </div>
    </Container>
  );
}

export default BookingSuccess;
