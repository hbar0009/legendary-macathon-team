/* eslint-disable @next/next/link-passhref */
import type { NextPage } from "next";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Link from "next/link";

const LoginPage: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
  }

  return (
    <div className="auth-page">
      <Container className="auth-form">
        <h3 id="LoginHeading">Log In</h3>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Link href="/home">
            <Button
              style={{ marginTop: "15px" }}
              type="submit"
              disabled={!validateForm()}
            >
              Login
            </Button>
          </Link>
        </Form>
      </Container>
    </div>
  );
};

export default LoginPage;
