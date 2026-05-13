import React, { useContext } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import providers from "../data/providers.json";
import { AuthContext } from "../context/AuthContext";
import { filterProvidersByAddress } from "../utils/filterProvidersByAddress";

function Category() {
  const { user } = useContext(AuthContext);
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const matchedProviders = providers.filter(
    (p) => p.categoryId === Number(categoryId)
  );

  const filteredProviders = filterProvidersByAddress(
    matchedProviders,
    user?.currentAddress
  );

  const handleViewProvider = (providerId) => {
    navigate(`/provider/${providerId}`);
  };

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
              <Card.Text>技能：{provider.skills.join(", ")}</Card.Text>
              <Card.Text>價格範圍：{provider.priceRange}</Card.Text>
              <Button
                variant="primary"
                onClick={() => handleViewProvider(provider.id)}
              >
                查看詳情
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}

export default Category;
