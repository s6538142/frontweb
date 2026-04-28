// src/pages/Profile.js
import React, { useState, useEffect, useContext } from "react";
import { Container, Form, Button, Alert, ListGroup } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user, login } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setAddresses(user.addresses || []);
      setCurrentAddress(user.currentAddress || "");
    }
  }, [user]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name, phone, addresses, currentAddress };
    login(updatedUser);
    setMessage("會員資料已更新！");
  };

  const handleAddAddress = () => {
    if (newAddress && !addresses.includes(newAddress)) {
      const updatedAddresses = [...addresses, newAddress];
      setAddresses(updatedAddresses);
      setNewAddress("");
    }
  };

  const handleDeleteAddress = (addr) => {
    const updatedAddresses = addresses.filter((a) => a !== addr);
    setAddresses(updatedAddresses);
    if (currentAddress === addr) {
      setCurrentAddress(""); // 如果刪掉的是目前地址，清空
    }
  };

  return (
    <Container className="mt-4">
      <h2>會員資料</h2>
      {message && <Alert variant="success">{message}</Alert>}
      <Form onSubmit={handleSaveProfile}>
        <Form.Group className="mb-3">
          <Form.Label>姓名</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>電話</Form.Label>
          <Form.Control
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>常用地址</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="輸入新地址"
            />
            <Button variant="secondary" onClick={handleAddAddress} className="ms-2">
              新增
            </Button>
          </div>
        </Form.Group>

        <ListGroup className="mb-3">
          {addresses.map((addr, idx) => (
            <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
              <div>
                <Form.Check
                  type="radio"
                  label={addr}
                  checked={currentAddress === addr}
                  onChange={() => setCurrentAddress(addr)}
                />
              </div>
              <Button variant="danger" size="sm" onClick={() => handleDeleteAddress(addr)}>
                刪除
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <Button type="submit" variant="primary">更新資料</Button>
      </Form>
    </Container>
  );
}

export default Profile;
