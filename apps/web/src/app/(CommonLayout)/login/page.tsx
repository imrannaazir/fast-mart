"use client";
import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { Fragment } from "react";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import assets from "@/assets";
import Image from "next/image";

const LoginPage = () => {
  const loginPageBreadcrumbItems: TAppBreadcrumbItem[] = [
    {
      title: "Login",
    },
  ];

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Fragment>
      <AppBreadcrumb className="mb-0" items={loginPageBreadcrumbItems} title="Login" />
      <div
        className="h-full w-full bg-cover bg-center bg-no-repeat py-11"
        style={{
          backgroundImage: `url(${assets.images.bg.login_bg})`,
        }}
      >
        <Container className="grid grid-cols-3">
          {/* form */}
          <div className="col-span-2 flex items-center justify-center">
            <Image alt="login" src={assets.images.banners.login} width={550} height={465} />
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-[360px] rounded-lg bg-gray-100 p-[41px]">
              <Form size="large" name="login" initialValues={{ remember: true }} onFinish={onFinish}>
                <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]}>
                  <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
                  <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                  <Flex justify="space-between" align="center">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <a href="">Forgot password</a>
                  </Flex>
                </Form.Item>

                <Form.Item>
                  <Button block type="primary" htmlType="submit">
                    Log in
                  </Button>
                  or <a href="">Register now!</a>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default LoginPage;
