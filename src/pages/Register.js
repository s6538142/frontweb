import React, { useState, useContext } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("兩次輸入的密碼不一致");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find((u) => u.email === email);

    if (exists) {
      setError("此 Email 已被註冊");
      return;
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    login({ email }); // 註冊成功後自動登入
    navigate("/my-bookings");
  };

  return (
    <Container className="mt-4">
      <h2>會員註冊</h2>
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
        <Form.Group className="mb-3">
          <Form.Label>確認密碼</Form.Label>
          <Form.Control type="password" name="confirmPassword" required />
        </Form.Group>
        <Button type="submit" variant="success">註冊</Button>
      </Form>
    </Container>
  );
}

export default Register;
