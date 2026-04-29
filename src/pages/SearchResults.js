// src/pages/SearchResults.js
import React, { useContext } from "react";
import { Container, Card } from "react-bootstrap";
import providers from "../data/providers.json"; 
import { AuthContext } from "../context/AuthContext";
import { filterProvidersByAddress } from "../utils/filterProvidersByAddress"; // 匯入共用函式

function SearchResults() {
  const { user } = useContext(AuthContext);

  // 模擬搜尋邏輯：假設有個 keyword (實際上你可能從 URL 或 state 取得)
  const keyword = "便當"; // 這裡只是示範，實際要改成動態
  const matchedProviders = providers.filter((p) =>
    p.name.includes(keyword)
  );

  // 使用共用 Utility 依據目前地址過濾
  const filteredProviders = filterProvidersByAddress(matchedProviders, user?.currentAddress);

  return (
    <Container className="mt-4">
      <h2>搜尋結果</h2>
      {filteredProviders.length === 0 ? (
        <p>
          {user?.currentAddress
            ? `目前沒有符合您地址 (${user.currentAddress}) 的店家`
            : "目前沒有符合的店家"}
        </p>
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

export default SearchResults;
