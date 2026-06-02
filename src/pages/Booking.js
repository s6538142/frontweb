import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import providers from "../data/providers.json";
import { Container, Form, Button, Card, Alert, Modal } from "react-bootstrap"; // ✅ 加上 Modal
import { AuthContext } from "../context/AuthContext";
import useGeoLocation from "../hooks/useGeoLocation"; // 📌 引用共用 Hook

function Booking() {
  const { id } = useParams(); // providerId
  const provider = providers.find((p) => p.id === parseInt(id));
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  // 📌 使用共用 Hook
  const { detectedAddress, getLocation, loading } = useGeoLocation();
  const [showLocationModal, setShowLocationModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const bookingData = {
      id: Date.now(), // 預約編號
      providerId: id,
      providerName: provider?.name,
      date: formData.get("date"),
      time: formData.get("time"),
      address: address || formData.get("address"), // 📌 優先使用定位或選取的地址
      description: formData.get("description"),
      createdAt: new Date().toLocaleString(),
      status: "active" // ✅ 新增狀態欄位
    };

    // 存到 localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push(bookingData);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // 跳轉到成功頁面
    navigate("/booking-success", { state: bookingData });
  };

  // 📌 確認定位結果 → 填入表單
  const handleConfirmDetectedAddress = () => {
    if (detectedAddress) {
      setAddress(detectedAddress);
      setMessage("定位地址已填入！");
    }
    setShowLocationModal(false);
  };

  return (
    <Container className="mt-4">
      <h2>預約服務：{provider ? provider.name : "未知業者"}</h2>
      {provider && (
        <Card className="mb-3">
          <Card.Body>
            <Card.Text>技能：{provider.skills.join(", ")}</Card.Text>
            <Card.Text>價格範圍：{provider.priceRange}</Card.Text>
            <Card.Text>服務範圍：{provider.serviceArea.join(", ")}</Card.Text>
          </Card.Body>
        </Card>
      )}

      {message && <Alert variant="info">{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>日期</Form.Label>
          <Form.Control type="date" name="date" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>時間</Form.Label>
          <Form.Control type="time" name="time" required />
        </Form.Group>

        {/* 📌 地址選擇 */}
        <Form.Group className="mb-3">
          <Form.Label>服務地址</Form.Label>
          <div className="d-flex mb-2">
            <Form.Control
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="請輸入或選擇服務地址"
              required
            />
            <Button
              variant="info"
              onClick={() => {
                getLocation();
                setShowLocationModal(true);
              }}
              className="ms-2"
            >
              {loading ? "定位中..." : "GPS定位"}
            </Button>
          </div>

          {/* 常用地址選擇 */}
          {user?.addresses && user.addresses.length > 0 && (
            <div>
              <Form.Label>選擇常用地址</Form.Label>
              {user.addresses.map((addr, idx) => (
                <Form.Check
                  key={idx}
                  type="radio"
                  label={addr}
                  checked={address === addr}
                  onChange={() => setAddress(addr)}
                />
              ))}
            </div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>需求描述</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" required />
        </Form.Group>
        <Button variant="primary" type="submit">
          確認預約
        </Button>
      </Form>

      {/* 📌 定位結果 Modal */}
      <Modal show={showLocationModal} onHide={() => setShowLocationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>定位結果</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{detectedAddress}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLocationModal(false)}>
            取消
          </Button>
          <Button variant="primary" onClick={handleConfirmDetectedAddress}>
            確認並填入地址
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Booking;
