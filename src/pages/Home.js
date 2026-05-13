// pages/Home.js
import React from "react";
import { Container, Row, Col, Card, Form, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import categories from "../data/categories.json";

function Home() {
  return (
    <>
    <Container className="mt-4">

      {/* Banner 區塊 (促銷/活動) */}
      <Row className="mb-4">
        <Col>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://via.placeholder.com/1200x300?text=新用戶首單享優惠"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://via.placeholder.com/1200x300?text=限時折扣+免服務費"
                alt="Second slide"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>

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
            <Card as={Link} to={`/category/${cat.id}`} className="h-100 text-center shadow-sm">
              <Card.Body>
                <Card.Title>{cat.name}</Card.Title>
                <Card.Text>{cat.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 推薦服務提供者區塊 */}
      <Row className="mt-5">
        <Col>
          <h4 className="mb-3">推薦服務提供者</h4>
        </Col>
      </Row>
      <Row>
        {[1,2,3,4].map((id) => (
          <Col md={3} sm={6} xs={12} key={id} className="mb-4">
            <Card className="h-100 text-center shadow-sm">
              <Card.Body>
                <Card.Title>服務商 {id}</Card.Title>
                <Card.Text>⭐ 4.{id} 評分</Card.Text>
                <Button variant="outline-primary" size="sm">查看詳情</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 精選主題區塊 */}
      <Row className="mt-5">
        <Col>
          <h4 className="mb-3">精選主題</h4>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>🏠 夏季大掃除</Card.Title>
              <Card.Text>推薦居家清潔服務，讓家煥然一新</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>🐶 假日寵物照護</Card.Title>
              <Card.Text>寵物陪伴服務，安心出遊不擔心</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Home;
