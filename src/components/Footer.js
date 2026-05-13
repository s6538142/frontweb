// components/Footer.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLine } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-light mt-5 py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>平台資訊</h5>
            <p>提供居家清潔、人力派遣、寵物陪伴、專業工匠等多元服務。</p>
          </Col>
          <Col md={4}>
            <h5>快速連結</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-light">關於我們</Link></li>
              <li><Link to="/contact" className="text-light">聯絡我們</Link></li>
              <li><Link to="/faq" className="text-light">常見問題</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>聯絡方式</h5>
            <p>Email: support@example.com</p>
            <p>電話: 02-1234-5678</p>
            <div className="d-flex gap-3 mt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light">
                <FaFacebook size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light">
                <FaInstagram size={24} />
              </a>
              <a href="https://line.me" target="_blank" rel="noopener noreferrer" className="text-light">
                <FaLine size={24} />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <small>© 2026 MyService 平台. All rights reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
