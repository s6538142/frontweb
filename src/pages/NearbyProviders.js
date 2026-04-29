// src/pages/NearbyProviders.js
import React, { useContext } from "react";
import { Container, Card } from "react-bootstrap";
import providers from "../data/providers.json";
import { AuthContext } from "../context/AuthContext";
import { filterProvidersByAddress } from "../utils/filterProvidersByAddress"; // 匯入共用函式

function NearbyProviders() {
  const { user } = useContext(AuthContext);

  if (!user || !user.currentAddress) {
    return (
      <Container className="mt-4">
        <h2>附近店家</h2>
        <p>請先在會員資料頁面設定您的地址。</p>
      </Container>
    );
  }

  // 使用共用 Utility 來篩選符合目前地址的店家
  const nearbyProviders = filterProvidersByAddress(providers, user.currentAddress);

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
