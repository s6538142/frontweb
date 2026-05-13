import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

function LoginModal({ show, onHide }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password }); // 模擬登入
    onHide(); // 登入成功後關閉 Modal
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>登入</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>密碼</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100 mb-3">
            登入
          </Button>
        </Form>

        {/* 📌 社群登入選項 */}
        <div className="text-center">
          <p>或使用社群帳號登入</p>
          <Button variant="success" className="me-2 mb-2 w-100">
            <i className="bi bi-chat-dots"></i> 使用 LINE 登入
          </Button>
          <Button variant="danger" className="me-2 mb-2 w-100">
            <i className="bi bi-envelope-fill"></i> 使用 Gmail 登入
          </Button>
          <Button variant="primary" className="w-100">
            <i className="bi bi-facebook"></i> 使用 Facebook 登入
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
