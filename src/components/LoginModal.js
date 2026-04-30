// src/components/LoginModal.js
import React, { useState, useContext } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

function LoginModal({ show, onHide }) {
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      login({ email }); // 使用 Context 更新狀態
      setError("");
      onHide(); // 登入成功後關閉 Modal
    } else {
      setError("帳號或密碼錯誤");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>會員登入</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>密碼</Form.Label>
            <Form.Control type="password" name="password" required />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">
            登入
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
