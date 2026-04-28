// src/pages/Category.js
import React, { useContext } from "react";
import { Container, Card } from "react-bootstrap";
import providers from "../data/providers.json";
import { AuthContext } from "../context/AuthContext";

function Category() {
  const { user } = useContext(AuthContext);

  // 篩選符合目前地址的店家
  const filteredProviders = user?.currentAddress
    ? providers.filter((p) => p.serviceArea.includes(user.currentAddress))
    : providers; // 如果沒設定地址，顯示全部

  return (
    <Container className="mt-4">
      <h2>服務分類店家</h2>
      {filteredProviders.length === 0 ? (
        <p>目前沒有符合您地址的店家</p>
      ) : (
        filteredProviders.map((provider) => (
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

export default Category;
