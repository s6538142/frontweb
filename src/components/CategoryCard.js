import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <Card className="m-2" style={{ width: "12rem" }}>
      <Card.Body className="text-center">
        <h2>{category.icon}</h2>
        <Card.Title>{category.name}</Card.Title>
        <Link to={`/category/${category.id}`} className="btn btn-primary mt-2">
          查看業者
        </Link>
      </Card.Body>
    </Card>
  );
}

export default CategoryCard;
