"use client";
import { addAddress } from "@/actions/address";
import { getErrorMessage } from "@repo/utils/functions";
import { TAddressInput, TCommonOption } from "@repo/utils/types";
import { Button, Flex, Form, Input, message, Modal, Radio, Select } from "antd";
import { City, Country, State } from "country-state-city";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { PiSuitcaseSimple } from "react-icons/pi";
type TAddAddressForm = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const addressTypeButtons = [
  {
    label: "Home",
    value: "home",
    icon: IoHomeOutline,
  },
  {
    label: "Office",
    value: "office",
    icon: PiSuitcaseSimple,
  },
];
const AddAddressForm: React.FC<TAddAddressForm> = ({ isModalOpen, setIsModalOpen, isLoading, setIsLoading }) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();
  const [countries, setCountries] = useState<TCommonOption[]>([]);
  const [states, setStates] = useState<TCommonOption[]>([]);
  const [cities, setCities] = useState<TCommonOption[]>([]);

  useEffect(() => {
    const rowCountries = Country.getAllCountries();
    const formattedCountries = rowCountries.map((country) => ({
      value: country.isoCode,
      label: country.name,
    }));

    setCountries(formattedCountries);
  }, []);

  const onCountryChange = (value: string) => {
    form.setFieldsValue({ state: undefined, city: undefined });
    const rowStatesOfCountry = State.getStatesOfCountry(value);
    const formattedStates = rowStatesOfCountry.map((state) => ({
      value: state.isoCode,
      label: state.name,
    }));
    setStates(formattedStates);
  };

  const onStateChange = (value: string) => {
    form.setFieldsValue({ city: undefined });
    const rowCities = City.getCitiesOfState(form.getFieldValue("country"), value);
    const formattedCities = rowCities.map((city) => ({
      value: city.name,
      label: city.name,
    }));
    setCities(formattedCities);
  };

  const onFinish = async (values: TAddressInput) => {
    setIsLoading(true);
    try {
      const response = await addAddress(values);

      if (response.success) {
        message.success(response.message);
        setIsModalOpen(false);
        form.resetFields();
        setIsLoading(false);
      } else {
        setIsLoading(false);
        throw new Error(response.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      message.error(getErrorMessage(error?.message!));
    }
  };

  const filterOption = (input: string, option: any) => {
    return (option?.label ?? "")?.toLowerCase()?.includes(input?.toLowerCase());
  };

  return (
    <>
      <Modal title="Add new shipping Address" open={isModalOpen} footer={null} onCancel={handleCancel} centered>
        <Form form={form} name="address" onFinish={onFinish} layout="vertical" disabled={isLoading}>
          <Flex gap={16}>
            <Form.Item
              className="w-full"
              name="fullName"
              label="Full Name"
              rules={[{ required: true, message: "Please input full name." }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              className="w-full"
              name="phoneNumber"
              label="Phone Number"
              rules={[{ required: true, message: "Please input phone number" }]}
            >
              <Input />
            </Form.Item>
          </Flex>
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
                showSearch
                onChange={onCountryChange}
                options={countries}
                filterOption={filterOption}
              />
            </Form.Item>

            <Form.Item
              className="w-full"
              name="state"
              label="State"
              rules={[{ required: true, message: "Please select your state!" }]}
            >
              <Select
                disabled={!form.getFieldValue("country")}
                placeholder="Select state"
                showSearch
                onChange={onStateChange}
                filterOption={filterOption}
                options={states}
              />
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
                disabled={!form.getFieldValue("state")}
                placeholder="Select city"
                showSearch
                filterOption={filterOption}
                options={cities}
              />
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
            <Radio.Group size="large" className="flex w-full">
              {addressTypeButtons.map((button) => (
                <Radio.Button key={button.value} className="w-full" value={button.value}>
                  <div className="flex items-center justify-center gap-4">
                    <span>{<button.icon />}</span>
                    <span>{button.label}</span>
                  </div>
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item
            style={{
              marginBottom: 8,
            }}
          >
            <Button type="primary" htmlType="submit" className="w-full" loading={isLoading}>
              Add Address
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddAddressForm;
