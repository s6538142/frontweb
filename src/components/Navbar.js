// src/components/Navbar.js
import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
import { Navbar, Nav, Form, InputGroup, Modal, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AppNavbar() {
  const { user, logout, login } = useContext(AuthContext);
  const [inputAddress, setInputAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const inputRef = useRef(null);

  const handleAddressChange = useCallback(
    (addr) => {
      if (!user) return;
      const updatedUser = { ...user, currentAddress: addr };
      login(updatedUser);
      setInputAddress(addr);
    },
    [user, login]
  );

  // Google Places Autocomplete
  useEffect(() => {
    if (window.google && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["geocode"],
        componentRestrictions: { country: "tw" }
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          handleAddressChange(place.formatted_address);
        }
      });
    }
  }, [handleAddressChange]);

  useEffect(() => {
    if (user?.currentAddress) {
      setInputAddress(user.currentAddress);
    } else {
      setInputAddress("");
    }
  }, [user]);

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (inputAddress.trim() !== "" && user) {
      const updatedUser = {
        ...user,
        addresses: [...(user.addresses || []), inputAddress],
        currentAddress: inputAddress
      };
      login(updatedUser);
    }
  };

  const handleDelete = (addr) => {
    setDeleteTarget(addr);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (user) {
      const updatedUser = {
        ...user,
        addresses: (user.addresses || []).filter((a) => a !== deleteTarget),
        currentAddress: user.currentAddress === deleteTarget ? "" : user.currentAddress
      };
      login(updatedUser);
      setShowConfirm(false);
      setDeleteTarget(null);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">多元需求平台</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">首頁</Nav.Link>
          
        </Nav>

        {user && (
          <Form className="mx-auto d-flex" onSubmit={handleInputSubmit}>
            <InputGroup style={{ minWidth: "300px" }}>
              <Form.Control
                type="text"
                value={user?.currentAddress || inputAddress}
                placeholder="新增常用地址"
                onChange={(e) => setInputAddress(e.target.value)}
                ref={inputRef}
              />
              <InputGroup.Text
                style={{ cursor: "pointer" }}
                onClick={() => setShowModal(true)}
              >
                <i className="bi bi-geo-alt-fill"></i>
              </InputGroup.Text>
            </InputGroup>
          </Form>
        )}

        <Nav className="ms-auto">
          {user ? (
            <>
              <Nav.Link as={Link} to="/my-bookings">我的預約</Nav.Link>
              <Nav.Link as={Link} to="/profile">會員資料</Nav.Link>
              <Nav.Link onClick={logout}>登出</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">登入</Nav.Link>
              <Nav.Link as={Link} to="/register">註冊</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>

      {/* 地址管理 Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>管理常用地址</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleInputSubmit} className="d-flex mb-3">
            <Form.Control
              type="text"
              placeholder="輸入新地址"
              value={inputAddress}
              onChange={(e) => setInputAddress(e.target.value)}
            />
            <Button type="submit" variant="primary" className="ms-2">
              新增常用地址
            </Button>
          </Form>

          <ListGroup>
            {user?.addresses && user.addresses.length > 0 ? (
              user.addresses.map((addr, idx) => (
                <ListGroup.Item
                  key={idx}
                  className="d-flex justify-content-between align-items-center"
                >
                  {/* 點擊地址 → 選擇並關閉 Modal */}
                  <span
                    onClick={() => {
                      handleAddressChange(addr);
                      setShowModal(false); // ✅ 選擇後自動關閉
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {addr}
                  </span>

                  {/* 垃圾桶刪除按鈕 */}
                  <i
                    className="bi bi-trash text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(addr)}
                  ></i>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>尚未新增常用地址</ListGroup.Item>
            )}
          </ListGroup>
        </Modal.Body>
      </Modal>

      {/* 確認刪除 Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>確認刪除</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          確定要刪除「{deleteTarget}」嗎？
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            取消
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            刪除
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}

export default AppNavbar;
