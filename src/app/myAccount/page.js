// pages/my-account.js
"use client";
import React from "react";
import { Card, Avatar, Form, Input, Button, Typography } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const MyAccount = () => {
  const handleUpdateProfile = (values) => {
    console.log("Updated values:", values);
    // Add logic to update user profile details
  };

  return (
    <div className="p-8 bg-background-muted min-h-screen">
      <Title level={2} className="text-primary mb-6">
        My Account
      </Title>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="shadow-md rounded-lg p-6">
          <div className="flex flex-col items-center">
            <Avatar
              size={96}
              icon={<UserOutlined />}
              style={{
                backgroundColor: "#00927F",
                color: "#ffffff",
                marginBottom: "16px",
              }}
            />
            <Text strong className="text-lg">
              John Doe
            </Text>
            <Text type="secondary">john.doe@example.com</Text>
          </div>
        </Card>

        {/* Profile Information Form */}
        <Card className="shadow-md rounded-lg p-6 lg:col-span-2">
          <Title level={4} className="text-secondary mb-4">
            Profile Information
          </Title>
          <Form
            layout="vertical"
            onFinish={handleUpdateProfile}
            initialValues={{
              name: "John Doe",
              email: "john.doe@example.com",
            }}
          >
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Enter your email" />
            </Form.Item>
            <Button variant="outlined" htmlType="submit" className="w-full">
              Update Profile
            </Button>
          </Form>
        </Card>
      </div>

      {/* Account Settings Section */}
      <div className="mt-8">
        <Card className="shadow-md rounded-lg p-6">
          <Title level={4} className="text-secondary mb-4">
            Account Settings
          </Title>
          <Form
            layout="vertical"
            onFinish={handleUpdateProfile} // Update with your account settings function
          >
            <Form.Item
              label="Current Password"
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter your current password",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter current password"
              />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please enter a new password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter new password"
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Update Password
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default MyAccount;
