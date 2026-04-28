import React, { useState, useContext } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
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
      navigate("/my-bookings");
    } else {
      setError("帳號或密碼錯誤");
    }
  };

  return (
    <Container className="mt-4">
      <h2>會員登入</h2>
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
        <Button type="submit" variant="primary">登入</Button>
      </Form>
    </Container>
  );
}

export default Login;
