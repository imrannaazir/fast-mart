"use client";
import { changePassword } from "@/actions/auth";
import { formRules } from "@/constants/form-roule.constants";
import { LockOutlined } from "@ant-design/icons";
import { getErrorMessage } from "@repo/utils/functions";
import { TChangePasswordPayload } from "@repo/utils/types";
import { Button, Form, FormProps, Input, message } from "antd";
import { useState } from "react";

const ChangePassword = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const onFinish: FormProps<TChangePasswordPayload>["onFinish"] = async (values) => {
    setLoading(true);

    const response = await changePassword({
      oldPassword: values?.oldPassword,
      password: values?.password,
    });

    if (response?.success) {
      message.success(getErrorMessage(response));
      form.resetFields();
      setLoading(false);
    } else {
      message.error(getErrorMessage(response));
      setLoading(false);
    }
  };
  return (
    <div className="mt-6 w-1/2">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-lg font-medium">Change Your Password </h2>
      </div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="oldPassword" rules={formRules.password} hasFeedback>
          <Input.Password prefix={<LockOutlined />} type="password" placeholder="Old password" />
        </Form.Item>
        <Form.Item name="password" rules={formRules.password} hasFeedback>
          <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item name="confirmPassword" rules={formRules.confirmPassword} hasFeedback dependencies={["password"]}>
          <Input.Password prefix={<LockOutlined />} type="confirmPassword" placeholder="Confirm password" />
        </Form.Item>

        <Form.Item label="">
          <Button loading={loading} type="primary" htmlType="submit">
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
