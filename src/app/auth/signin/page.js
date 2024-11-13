/* eslint-disable react/no-unescaped-entities */
"use client";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { Form, Input, Button, Typography, message, Spin } from "antd";
import { MailOutlined, LockOutlined, MobileOutlined } from "@ant-design/icons";
import Link from "next/link";
import ErrorMessage from "./../../../components/auth/ErrorMessage";

const { Title } = Typography;

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    mobile: "",
    otp: "",
  });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [loginMethod, setLoginMethod] = useState("mobile");
  const { data: session } = useSession();

  const handleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const payload =
        loginMethod === "email"
          ? { email: credentials.email, password: credentials.password }
          : { mobile: credentials.mobile, otp: credentials.otp };
      const res = await signIn("credentials", {
        redirect: false,
        ...payload,
      });
      setLoading(false);
      if (!res.ok) setError(res.error);
      else window.location.href = "/";
    } catch (err) {
      setLoading(false);
      setError("Login failed. Please check your credentials or OTP.");
    }
  };

  const sendOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber: credentials.mobile }),
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        setIsOtpSent(true);
      } else {
        setError(data.message || "Failed to send OTP");
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred while sending OTP");
    }
  };

  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "400px",
        margin: "0 auto",
        background: "#fff",
        marginTop: "100px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Title level={3} style={{ textAlign: "center" }}>
        Signin
      </Title>

      <Form layout="vertical" onFinish={handleSignIn}>
        {loginMethod === "email" ? (
          <>
            <Form.Item label="Email" required>
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Password" required>
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item label="Mobile Number" required>
              <Input
                prefix={<MobileOutlined />}
                type="tel"
                pattern="[0-9]{10}"
                placeholder="Mobile Number"
                value={credentials.mobile}
                onChange={(e) =>
                  setCredentials({ ...credentials, mobile: e.target.value })
                }
                required
                minLength={10}
                maxLength={10}
              />
            </Form.Item>
            {!isOtpSent && (
              <Button type="primary" block onClick={sendOtp} disabled={loading}>
                {loading ? <Spin size="small" /> : "Send OTP"}
              </Button>
            )}
            {isOtpSent && (
              <Form.Item label="OTP" required>
                <Input
                  type="text"
                  pattern="[0-9]{4}"
                  placeholder="OTP"
                  value={credentials.otp}
                  onChange={(e) =>
                    setCredentials({ ...credentials, otp: e.target.value })
                  }
                  required
                  minLength={4}
                  maxLength={4}
                />
              </Form.Item>
            )}
          </>
        )}

        <ErrorMessage error={error} />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {loginMethod === "mobile" && isOtpSent && (
              <Button type="primary" htmlType="submit" block disabled={loading}>
                {loading ? <Spin size="small" /> : "Verify OTP & Sign In"}
              </Button>
            )}
            {loginMethod === "email" && (
              <Button type="primary" htmlType="submit" block disabled={loading}>
                {loading ? <Spin size="small" /> : "Sign In"}
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <Button
              block
              onClick={() =>
                setLoginMethod(loginMethod === "email" ? "mobile" : "email")
              }
            >
              {loginMethod === "email"
                ? "Sign in with Mobile OTP"
                : "Sign in with Email & Password"}
            </Button>

            <Link href="/auth/register" passHref>
              <Button type="text" block>
                Don't have an account? Register
              </Button>
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
}
