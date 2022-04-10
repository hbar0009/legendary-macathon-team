import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Accordion } from "react-bootstrap";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) throw error;
      alert("Signed in successfully!");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      alert("Signed in successfully!");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Log In 🔐</Accordion.Header>
          <Accordion.Body>
            <Form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                handleLogin(email, password);
              }}
            >
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
              <Button
                style={{ marginTop: "30px" }}
                type="submit"
                disabled={!validateForm()}
              >
                <span>{loading ? "Loading..." : "Login"}</span>
              </Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Sign Up 📋</Accordion.Header>
          <Accordion.Body>
            <Form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                handleSignUp(email, password);
              }}
            >
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
              <Button
                style={{ marginTop: "30px" }}
                type="submit"
                disabled={!validateForm()}
              >
                <span>{loading ? "Loading..." : "Sign Up"}</span>
              </Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
