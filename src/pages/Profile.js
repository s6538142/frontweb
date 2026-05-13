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

  const [showModal, setShowModal] = useState(false);
  const [detectedAddress, setDetectedAddress] = useState("");
  const [error, setError] = useState("");

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

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
          );
          const data = await response.json();

          if (data.results && data.results[0]) {
            const addr = data.results[0].formatted_address;
            setDetectedAddress(addr);
            setError("");
          } else {
            setDetectedAddress("定位失敗，無法取得地址");
            setError("定位失敗，請確認 API Key 或權限設定");
          }
          setShowModal(true);
        } catch (err) {
          setDetectedAddress("API 呼叫失敗");
          setError("定位失敗，請檢查網路或 API Key");
          setShowModal(true);
        }
      });
    } else {
      setDetectedAddress("您的瀏覽器不支援定位功能");
      setError("瀏覽器不支援定位功能");
      setShowModal(true);
    }
  };

  const handleConfirmDetectedAddress = () => {
    if (detectedAddress && !addresses.includes(detectedAddress)) {
      const updatedAddresses = [...addresses, detectedAddress];
      setAddresses(updatedAddresses);
      setCurrentAddress(detectedAddress);
      setMessage("定位地址已新增！");
    }
    setShowModal(false);
  };

  return (
    <Container className="mt-4">
      <h2>會員資料</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

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

      {/* 📌 社群帳號連結按鈕 */}
      <div className="mt-4">
        <h5>連結社群帳號</h5>
        <Button variant="success" className="me-2">
          <i className="bi bi-chat-dots"></i> LINE
        </Button>
        <Button variant="danger" className="me-2">
          <i className="bi bi-envelope-fill"></i> Gmail
        </Button>
        <Button variant="primary">
          <i className="bi bi-facebook"></i> Facebook
        </Button>
      </div>

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
            取消
          </Button>
          <Button variant="primary" onClick={handleConfirmDetectedAddress}>
            確認並加入地址
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Profile;
