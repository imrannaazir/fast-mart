"use client";
import { register } from "@/actions/auth";
import assets from "@/assets";
import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { formRules } from "@/constants/form-roule.constants";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { getErrorMessage } from "@repo/utils/functions";
import { TUser } from "@repo/utils/types";
import { Button, Checkbox, Divider, Flex, Form, Input, message, Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const registerPageBreadcrumbItems: TAppBreadcrumbItem[] = [
    {
      title: "Register",
    },
  ];

  const onFinish = async (values: TUser) => {
    const result = await register(values);
    setIsLoading(true);

    if (!result?.success) {
      message.error(getErrorMessage(result));
      setIsLoading(false);
    } else {
      message.info(getErrorMessage(result));
      router.push(`/verify-email?e=${values?.email}`);
    }
  };
  return (
    <Fragment>
      <AppBreadcrumb className="mb-0" items={registerPageBreadcrumbItems} title="Register" />
      <div
        className="h-full w-full bg-cover bg-center bg-no-repeat py-11"
        style={{
          backgroundImage: `url(${assets.images.bg.login_bg})`,
        }}
      >
        <Container className="grid grid-cols-3">
          {/* form */}
          <div className="col-span-2 flex items-center justify-center">
            <Image alt="login" src={assets.images.banners.register} width={550} height={465} />
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-[360px] rounded-lg bg-gray-100 p-[41px]">
              <Form size="large" name="login" initialValues={{ remember: true }} onFinish={onFinish}>
                <Space direction="horizontal">
                  <Form.Item name="firstName" rules={formRules.firstName}>
                    <Input placeholder="First name" />
                  </Form.Item>
                  <Form.Item name="lastName" rules={formRules.lastName}>
                    <Input placeholder="Last name" />
                  </Form.Item>
                </Space>
                <Form.Item name="email" rules={formRules.email}>
                  <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item name="password" rules={formRules.password} hasFeedback>
                  <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  rules={formRules.confirmPassword}
                  hasFeedback
                  dependencies={["password"]}
                >
                  <Input.Password prefix={<LockOutlined />} type="confirmPassword" placeholder="Confirm password" />
                </Form.Item>
                <Form.Item>
                  <Flex justify="space-between" align="center">
                    <Form.Item name="remember" noStyle>
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <a href="">Forgot password</a>
                  </Flex>
                </Form.Item>

                <Form.Item>
                  <Button htmlType="submit" type="primary" className="w-full" loading={isLoading}>
                    Register
                  </Button>
                </Form.Item>
              </Form>

              <Divider />
              <div className="flex flex-col items-center justify-center">
                <p className="text-gray-500">Already have an account?</p>
                <Link href="/login" className="text-primary text-lg font-medium">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default RegisterPage;
