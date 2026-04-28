// src/pages/NearbyProviders.js
import React, { useContext } from "react";
import { Container, Card } from "react-bootstrap";
import providers from "../data/providers.json";
import { AuthContext } from "../context/AuthContext";

function NearbyProviders() {
  const { user } = useContext(AuthContext);

  if (!user || !user.address) {
    return (
      <Container className="mt-4">
        <h2>附近店家</h2>
        <p>請先在會員資料頁面設定您的地址。</p>
      </Container>
    );
  }

  const nearbyProviders = providers.filter((p) =>
    p.serviceArea.includes(user.address)
  );

  return (
    <Container className="mt-4">
      <h2>您所在區域的店家服務</h2>
      {nearbyProviders.length === 0 ? (
        <p>目前沒有符合您地址的店家</p>
      ) : (
        nearbyProviders.map((provider) => (
          <Card key={provider.id} className="mb-3">
            <Card.Body>
              <Card.Title>{provider.name}</Card.Title>
              <Card.Text>服務範圍：{provider.serviceArea.join(", ")}</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}

export default NearbyProviders;
