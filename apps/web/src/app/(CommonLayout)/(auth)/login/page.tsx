"use client";
import assets from "@/assets";
import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { formRules } from "@/constants/form-rule.constants";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Divider, Flex, Form, Input, message } from "antd";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT;

  const loginPageBreadcrumbItems: TAppBreadcrumbItem[] = [
    {
      title: "Login",
    },
  ];

  const onFinish = async (values: any) => {
    setIsLoading(true);
    const result = await signIn("login", {
      email: values.email,
      password: values.password,
      callbackUrl,
      redirect: false,
    });

    if (result?.ok) {
      router.push(callbackUrl);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      message.error("Failed to login!");
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
        <Container className="flex justify-center">
          {/* form */}
          <div className="hidden flex-grow items-center justify-center md:flex">
            <Image alt="login" src={assets.images.banners.login} width={550} height={465} />
          </div>
          <div className="flex w-full items-center justify-center sm:max-w-[440px]">
            <div className="w-full min-w-full rounded-lg bg-gray-100 p-[41px]">
              <Form size="large" name="login" initialValues={{ remember: true }} onFinish={onFinish}>
                <Form.Item initialValue="john@gmail.com" name="email" rules={formRules.email}>
                  <Input prefix={<UserOutlined />} placeholder="email" />
                </Form.Item>
                <Form.Item initialValue="P@ssw0rd" name="password" rules={formRules.password}>
                  <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
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
                  <Button type="primary" className="w-full" loading={isLoading} htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </Form>
              <Divider />
              <div className="flex flex-col items-center justify-center">
                <p className="text-gray-500">Don't have an account?</p>
                <Link href="/register" className="text-primary text-lg font-medium">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default LoginPage;
