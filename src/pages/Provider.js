import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ 加上 useNavigate
import { Container, Card, Alert, Button } from "react-bootstrap";
import providers from "../data/providers.json";
import { AuthContext } from "../context/AuthContext";
import { filterProvidersByAddress } from "../utils/filterProvidersByAddress";

function Provider() {
  const { id } = useParams();
  const provider = providers.find((p) => p.id === parseInt(id));
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // ✅ 新增

  if (!provider) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">找不到此業者</Alert>
      </Container>
    );
  }

  // 📌 使用共用的 filterProvidersByAddress 判斷是否支援地址
  const isServiceAvailable =
    filterProvidersByAddress([provider], user?.currentAddress).length > 0;

  const handleBooking = () => {
    navigate(`/booking/${provider.id}`);
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>{provider.name}</Card.Title>
          <Card.Text>評分: {provider.rating} ⭐</Card.Text>
          <Card.Text>評論數: {provider.reviews.length} 則</Card.Text>
          <Card.Text>技能: {provider.skills.join(", ")}</Card.Text>
          <Card.Text>價格範圍: {provider.priceRange}</Card.Text>
          <Card.Text>服務範圍: {provider.serviceArea.join(", ")}</Card.Text>

          {!isServiceAvailable && (
            <Alert variant="warning" className="mt-3">
              此店家不提供您目前地址 ({user?.currentAddress}) 的服務
            </Alert>
          )}

          {/* 📌 預約按鈕 */}
          <div className="text-center mt-3">
            <Button
              variant="success"
              onClick={handleBooking}
              disabled={!isServiceAvailable} // 如果不支援地址就禁用
            >
              立即預約
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Provider;
