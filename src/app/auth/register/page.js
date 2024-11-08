"use client";
import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Select,
  Radio,
  Spin,
  message,
} from "antd";
import CommonLabel from "@/components/common/label";
import { signIn } from "next-auth/react";

const { Title, Text } = Typography;
const { Option } = Select;

const validatePincode = (pincode) => /^[1-9][0-9]{5}$/.test(pincode);

export default function RegistrationPage() {
  const [role, setRole] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [itemsPrinted, setItemsPrinted] = useState([]);
  const [materialsAvailable, setMaterialsAvailable] = useState([]);
  const [pricing, setPricing] = useState("");
  const [serviceablePincodes, setServiceablePincodes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [printingItems, setPrintingItems] = useState([]);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchLOVs = async () => {
      try {
        const itemsResponse = await fetch("/api/lov/printing_item", {
          method: "GET",
        });
        const materialsResponse = await fetch("/api/lov/material", {
          method: "GET",
        });

        const itemsData = await itemsResponse.json();
        const materialsData = await materialsResponse.json();

        setPrintingItems(itemsData);
        setMaterials(materialsData);
      } catch (error) {
        console.error("Error fetching LOVs:", error);
      }
    };
    if (role === "vendor") fetchLOVs();
  }, [role]);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    for (const pincode of serviceablePincodes) {
      if (!validatePincode(pincode)) {
        message.error({
          content: "Invalid pincode entered",
          key: "register",
          duration: 2,
        });
        return;
      }
    }

    setLoading(true);
    message.loading({ content: "Registering...", key: "register" });

    try {
      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          email,
          password,
          firstName,
          lastName,
          mobileNumber,
          companyName,
          itemsPrinted,
          materialsAvailable,
          pricing,
          serviceablePincodes,
        }),
      });
      if (response.ok) {
        message.success({
          content: "Registration successful!",
          key: "register",
          duration: 2,
        });

        await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl: "/explore",
        }).then((res) => {
          if (res?.ok) {
            window.location.href = res.url;
          }
        });
      } else {
        const data = await response.json();
        setError(data.message || "Registration failed");
        message.error({
          content: data.message || "Registration failed",
          key: "register",
          duration: 2,
        });
      }
    } catch (err) {
      console.log(err);
      setError("An error occurred during registration");
      message.error({
        content: "An error occurred during registration",
        key: "register",
        duration: 2,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePincodeChange = (value) => {
    // Filter invalid pincodes
    const invalidPincodes = value.filter(
      (pincode) => !validatePincode(pincode)
    );

    if (invalidPincodes.length > 0) {
      message.error(
        "Invalid pincode(s) entered. Please enter valid 6-digit pincodes."
      );
    }

    // Set only valid pincodes
    const validPincodes = value.filter((pincode) => validatePincode(pincode));
    setServiceablePincodes(validPincodes);
  };

  return (
    <Form
      onFinish={handleRegister}
      layout="vertical"
      style={{
        padding: "24px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "600px",
        minWidth: "400px",
        margin: "0 auto",
      }}
    >
      <Title level={3}>Register</Title>
      <Form.Item
        label={<CommonLabel>Select Role</CommonLabel>}
        required
        className="!mt-8"
      >
        <Radio.Group value={role} onChange={(e) => setRole(e.target.value)}>
          <Radio value="customer">Customer</Radio>
          <Radio value="vendor">Vendor</Radio>
        </Radio.Group>
      </Form.Item>

      {role === "customer" && (
        <>
          <Form.Item label={<CommonLabel>First Name</CommonLabel>} required>
            <Input
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label={<CommonLabel>Last Name</CommonLabel>} required>
            <Input
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Item>
        </>
      )}

      <Form.Item label={<CommonLabel>Mobile Number</CommonLabel>} required>
        <Input
          name="mobileNumber"
          type="tel"
          pattern="[0-9]{10}"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
      </Form.Item>
      <Form.Item label={<CommonLabel>Email</CommonLabel>} required>
        <Input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item label={<CommonLabel>Password</CommonLabel>} required>
        <Input.Password
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item label={<CommonLabel>Confirm Password</CommonLabel>} required>
        <Input.Password
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Form.Item>

      {role === "vendor" && (
        <>
          <Form.Item label={<CommonLabel>Company Name</CommonLabel>} required>
            <Input
              name="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label={<CommonLabel>Items Printed</CommonLabel>} required>
            <Select
              mode="tags"
              value={itemsPrinted}
              onChange={(value) => setItemsPrinted(value)}
              placeholder="Enter items printed"
            >
              {printingItems.map((item) => (
                <Option key={item.name}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={<CommonLabel>Materials Available</CommonLabel>}
            required
          >
            <Select
              mode="tags"
              value={materialsAvailable}
              onChange={(value) => setMaterialsAvailable(value)}
              placeholder="Enter materials available"
            >
              {materials.map((material) => (
                <Option key={material.name}>{material.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={<CommonLabel>Initial Pricing (per unit)</CommonLabel>}
            required
          >
            <Input
              name="pricing"
              type="number"
              value={pricing}
              onChange={(e) => setPricing(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<CommonLabel>Serviceable Pincodes</CommonLabel>}
            required
          >
            <Select
              mode="tags"
              value={serviceablePincodes}
              onChange={handlePincodeChange}
              placeholder="Enter serviceable pincodes"
            >
              {serviceablePincodes &&
                serviceablePincodes.map((pincode) => (
                  <Option key={pincode} value={pincode}>
                    {pincode}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </>
      )}

      {error && <Text type="danger">{error}</Text>}
      <div className="mt-4">
        <Form.Item>
          <Button type="primary" htmlType="submit" block disabled={loading}>
            {loading ? <Spin /> : "Register"}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button href="/auth/signin" block>
            Already have an account? Sign In
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
