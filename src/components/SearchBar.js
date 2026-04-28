import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/category/search?keyword=${keyword}`);
    }
  };

  return (
    <Form inline className="my-3 justify-content-center" onSubmit={handleSearch}>
      <FormControl
        type="text"
        placeholder="輸入需求..."
        className="mr-sm-2"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button variant="primary" type="submit">搜尋</Button>
    </Form>
  );
}

export default SearchBar;
