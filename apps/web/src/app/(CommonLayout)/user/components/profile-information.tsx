"use client";
import { updateProfile } from "@/actions/user";
import { useUser } from "@/contexts/user-context";
import { getErrorMessage } from "@repo/utils/functions";
import { TUser } from "@repo/utils/types";
import { Button, DatePicker, Form, FormProps, Input, message } from "antd";
import dayjs from "dayjs";
import { Edit, X } from "lucide-react";
import { useState } from "react";
type FieldType = Pick<TUser, "firstName" | "lastName" | "phoneNumber" | "dateOfBirth">;
const dateFormat = "YYYY/MM/DD";

const ProfileInformation = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUser();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    values.dateOfBirth = values.dateOfBirth ? dayjs(values?.dateOfBirth, dateFormat).toISOString() : undefined;
    const response = await updateProfile(values);
    if (response?.success) {
      message.success(getErrorMessage(response));

      setUser(response?.data!);
      setIsDisabled(true);
      setLoading(false);
    } else {
      message.error(getErrorMessage(response));
      setLoading(false);
    }
  };
  return (
    <div className="mt-6">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-lg font-medium">Profile Information </h2>
        <Button
          danger={!isDisabled}
          disabled={loading}
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
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          phoneNumber: user?.phoneNumber || "",
          dateOfBirth: user?.dateOfBirth ? dayjs(user?.dateOfBirth, dateFormat) : null,
        }}
        layout="vertical"
        className="grid gap-x-6 sm:grid-cols-2"
      >
        <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
          <Input placeholder="Enter last name" />
        </Form.Item>
        <Form.Item label="Phone Number" name="phoneNumber" rules={[{ min: 9 }]}>
          <Input placeholder="Enter phone number" />
        </Form.Item>
        <Form.Item label="Date Of Birth" name="dateOfBirth">
          <DatePicker className="w-full" format={dateFormat} />
        </Form.Item>
        {!isDisabled && (
          <Form.Item label=" ">
            <Button loading={loading} type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};

export default ProfileInformation;
