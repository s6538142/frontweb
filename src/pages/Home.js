// pages/Home.js
import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import categories from "../data/categories.json";

function Home() {
  return (
    <Container className="mt-4">
      {/* 搜尋框 */}
      <Row className="mb-4">
        <Col md={{ span: 8, offset: 2 }}>
          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="輸入關鍵字搜尋服務..."
              className="me-2"
            />
            <Button variant="primary">搜尋</Button>
          </Form>
        </Col>
      </Row>

      {/* 分類卡片 */}
      <Row>
        {categories.map((cat) => (
          <Col md={3} sm={6} xs={12} key={cat.id} className="mb-4">
            <Card as={Link} to={`/category/${cat.id}`} className="h-100 text-center">
              <Card.Body>
                <Card.Title>{cat.name}</Card.Title>
                <Card.Text>{cat.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
