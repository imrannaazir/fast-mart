"use client";
import { Button, Form, FormProps, Input } from "antd";

type FieldType = {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  dateOfBirth?: string;
};
const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};
const ChangePassword = () => {
  return (
    <div className="mt-6 w-1/2">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-lg font-medium">Change Your Password </h2>
      </div>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item label="Current Password" name="currentPassword" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="New Password" name="newPassword" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="">
          <Button type="primary" htmlType="submit">
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
