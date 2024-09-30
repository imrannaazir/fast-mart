"use client";
import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { Fragment } from "react";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input, Flex, message } from "antd";
import assets from "@/assets";
import Image from "next/image";
import { AppButton } from "@/components/ui/AppButton";
import { userLogin } from "@/actions/auth";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const loginPageBreadcrumbItems: TAppBreadcrumbItem[] = [
    {
      title: "Login",
    },
  ];

  const onFinish = async (values: any) => {
    const data = await userLogin(values);
    if (data.success) {
      message.success(data.message);
      router.push("/");
    } else {
      message.error(data.message);
    }
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
                <Form.Item
                  initialValue="imrannaaziremon@gmail.com"
                  name="email"
                  rules={[{ required: true, message: "Please input your Username!" }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="email" />
                </Form.Item>
                <Form.Item
                  initialValue="P@ssw0rd"
                  name="password"
                  rules={[{ required: true, message: "Please input your Password!" }]}
                >
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
                  <AppButton variant={"secondary"} className="m-0 min-w-full">
                    Loin
                  </AppButton>
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
