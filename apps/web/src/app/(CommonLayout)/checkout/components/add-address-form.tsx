"use client";
import { Button, Flex, Form, Input, message, Modal, Select } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { City, Country, ICity, ICountry, IState, State } from "country-state-city";
import { TAddress } from "@repo/utils/types";
type TAddAddressForm = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

console.log(Country.getAllCountries());

const AddAddressForm: React.FC<TAddAddressForm> = ({ isModalOpen, setIsModalOpen }) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { Option } = Select;

  const [form] = Form.useForm();
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const onCountryChange = (value: string) => {
    form.setFieldsValue({ state: undefined, city: undefined });
    setStates(State.getStatesOfCountry(value));
  };

  const onStateChange = (value: string) => {
    form.setFieldsValue({ city: undefined });
    setCities(City.getCitiesOfState(form.getFieldValue("country"), value));
  };

  const onFinish = (values: TAddress) => {
    console.log("Success:", values);
    message.success("Address added successfully!");
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("Please fill all required fields correctly.");
  };

  return (
    <>
      <Modal title="Add new shipping Address" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} centered>
        <Form form={form} name="address" onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
          <Form.Item
            name="fullAddress"
            label="Full Address"
            rules={[{ required: true, message: "Please input your full address!" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Flex gap={16}>
            <Form.Item
              className="w-full"
              name="country"
              label="Country"
              rules={[{ required: true, message: "Please select your country!" }]}
            >
              <Select
                placeholder="Select country"
                onChange={onCountryChange}
                showSearch
                filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              >
                {countries.map((country) => (
                  <Option key={country.isoCode} value={country.isoCode} label={country.name}>
                    {country.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              className="w-full"
              name="state"
              label="State"
              rules={[{ required: true, message: "Please select your state!" }]}
            >
              <Select
                placeholder="Select state"
                onChange={onStateChange}
                showSearch
                filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              >
                {states.map((state) => (
                  <Option key={state.isoCode} value={state.isoCode} label={state.name}>
                    {state.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Flex>

          <Flex gap={16}>
            <Form.Item
              className="w-full"
              name="city"
              label="City"
              rules={[{ required: true, message: "Please select your city!" }]}
            >
              <Select
                placeholder="Select city"
                showSearch
                filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              >
                {cities.map((city) => (
                  <Option key={city.name} value={city.name} label={city.name}>
                    {city.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              className="w-full"
              name="zipCode"
              label="Zip Code"
              rules={[{ required: true, message: "Please input your zip code!" }]}
            >
              <Input />
            </Form.Item>
          </Flex>
          <Form.Item
            name="addressType"
            label="Address Type"
            rules={[{ required: true, message: "Please select an address type!" }]}
          >
            <Select placeholder="Select address type">
              <Option value="home">Home</Option>
              <Option value="work">Work</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Add Address
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddAddressForm;
