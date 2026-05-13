import React, { useState, useEffect, useContext } from "react";
import { Container, Form, Button, Alert, ListGroup, Modal } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user, login } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [message, setMessage] = useState("");

  // 📌 Modal 狀態
  const [showModal, setShowModal] = useState(false);
  const [detectedAddress, setDetectedAddress] = useState("");

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
      setCurrentAddress("");
    }
  };

  // 📌 定位功能（只顯示結果在 Modal）
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        const apiKey = "AIzaSyBtXgF9eT33rVN3BGPQXjRy_kJhziG2tEU"; // ⚠️ 請替換成你的 API Key
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.results && data.results[0]) {
          const addr = data.results[0].formatted_address;
          setDetectedAddress(addr);
          setShowModal(true); // 打開 Modal 顯示結果
        } else {
          setDetectedAddress("定位失敗，無法取得地址");
          setShowModal(true);
        }
      });
    } else {
      setDetectedAddress("您的瀏覽器不支援定位功能");
      setShowModal(true);
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
            <Button variant="info" onClick={handleGetLocation} className="ms-2">
              GPS定位
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

      {/* 📌 Modal 顯示定位結果 */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>定位結果</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{detectedAddress}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Profile;
