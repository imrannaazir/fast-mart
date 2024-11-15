"use client";
import { Button, DatePicker, Form, FormProps, Input } from "antd";
import dayjs from "dayjs";
import { Edit, X } from "lucide-react";
import { useState } from "react";
type FieldType = {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  dateOfBirth?: string;
};
const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};
const ProfileInformation = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  return (
    <div className="mt-6">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-lg font-medium">Profile Information </h2>
        <Button
          danger={!isDisabled}
          type="primary"
          shape="circle"
          onClick={() => setIsDisabled(!isDisabled)}
          icon={isDisabled ? <Edit size={20} /> : <X size={20} />}
        />
      </div>
      <Form
        disabled={isDisabled}
        onFinish={onFinish}
        initialValues={{
          firstName: "Imran",
          lastName: "Nazir",
          phoneNumber: "+8801405580607",
          dateOfBirth: dayjs("2001-05-16"),
        }}
        layout="vertical"
        className="grid gap-x-6 md:grid-cols-2"
      >
        <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Phone Number" name="phoneNumber" rules={[{ min: 9 }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Date Of Birth" name="dateOfBirth">
          <DatePicker className="w-full" />
        </Form.Item>
        {!isDisabled && (
          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};

export default ProfileInformation;
