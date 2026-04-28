// src/pages/Provider.js
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Alert } from "react-bootstrap";
import providers from "../data/providers.json";
import { AuthContext } from "../context/AuthContext";

function Provider() {
  const { id } = useParams();
  const provider = providers.find((p) => p.id === parseInt(id));
  const { user } = useContext(AuthContext);

  if (!provider) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">找不到此業者</Alert>
      </Container>
    );
  }

  // 判斷是否符合目前地址
  const isServiceAvailable =
    !user?.currentAddress || provider.serviceArea.includes(user.currentAddress);

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
              此店家不提供您目前地址 ({user.currentAddress}) 的服務
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Provider;
