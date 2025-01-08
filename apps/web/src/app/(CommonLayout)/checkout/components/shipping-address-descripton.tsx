"use client";
import { deleteAddress, markAsDefaultAddress } from "@/actions/address";
import { useOrderContext } from "@/contexts/order-context";
import { getErrorMessage } from "@repo/utils/functions";
import { TAddress } from "@repo/utils/types";
import { Button, Card, Empty, message, Modal, Radio, RadioChangeEvent, Tag } from "antd";
import { Country, State } from "country-state-city";
import { MapPin, Trash } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BsExclamationCircleFill, BsTelephone } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { PiSuitcaseSimple } from "react-icons/pi";
import AddAddressForm from "./add-address-form";

type TShippingAddressDescription = {
  addresses: TAddress[];
};

const ShippingAddressDescription: FC<TShippingAddressDescription> = ({ addresses }) => {
  const { defaultAddress, setDefaultAddress } = useOrderContext();

  useEffect(() => {
    setDefaultAddress(addresses?.find((address) => !!address.default)?._id || "");
  }, [addresses]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertModelOpen, setIsAlertModalOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [addressId, setAddressId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [alertDescription, setAlertDescription] = useState("");
  const [actionType, setActionType] = useState<"delete" | "markAsDefault" | undefined>(undefined);

  const handleOpenDeleteModal = (addressId: string) => {
    setAlertTitle("Delete Address");
    setAlertDescription("Are you sure want to delete this address?");
    setAddressId(addressId);
    setActionType("delete");
    setIsAlertModalOpen(true);
  };
  const handleOpenMarkDefaultModal = (addressId: string) => {
    setAlertTitle("Mark as Default");
    setAlertDescription("Are you sure want to mark as default?");
    setAddressId(addressId);
    setActionType("markAsDefault");
    setIsAlertModalOpen(true);
  };

  const onChange = (e: RadioChangeEvent) => {
    handleOpenMarkDefaultModal(e.target.value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleAlertCancel = () => {
    setIsAlertModalOpen(false);
  };

  const handleOk = () => {
    if (actionType === "delete") {
      handleDeleteAddress(addressId);
    } else if (actionType === "markAsDefault") {
      handleMarkAsDefault(addressId);
    }
  };

  // delete address
  const handleDeleteAddress = async (addressId: string) => {
    setIsLoading(true);
    try {
      const response = await deleteAddress(addressId);
      if (response.success && response?.data?.deletedCount! > 0) {
        setIsLoading(false);
        setActionType(undefined);
        setAlertTitle("");
        setAlertDescription("");
        setAddressId("");
        setIsAlertModalOpen(false);
        message.success(response.message);
      } else if (response.success) {
        throw new Error(`Failed to delete address.`);
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      message.error(getErrorMessage(error.message));
    }
  };
  // markAsDefault
  const handleMarkAsDefault = async (addressId: string) => {
    setIsLoading(true);
    try {
      const response = await markAsDefaultAddress(addressId);
      if (response.success) {
        setIsLoading(false);
        setActionType(undefined);
        setAlertTitle("");
        setAlertDescription("");
        setAddressId("");
        setIsAlertModalOpen(false);
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      message.error(getErrorMessage(error.message));
    }
  };

  return (
    <>
      <Card
        className="mt-0 bg-gray-100"
        extra={
          <Button type="primary" icon={<BiPlus />} onClick={showModal} disabled={isAdding}>
            Add new
          </Button>
        }
      >
        {addresses?.length > 0 ? (
          <Radio.Group className="grid w-full gap-6 lg:grid-cols-2" onChange={onChange} value={defaultAddress}>
            {addresses?.map((address) => {
              const AddressTypeIcon = address.addressType === "home" ? IoHomeOutline : PiSuitcaseSimple;
              return (
                <Card key={address._id}>
                  <div className="flex items-start justify-between gap-2">
                    <Radio value={address._id} className="mt-1 flex items-start" />
                    <div className="w-full">
                      <div className="flex justify-between">
                        <h3 className="text-base font-medium">{`${address.fullName}`} </h3>
                        <Button onClick={() => handleOpenDeleteModal(address._id!)} danger size="small">
                          <Trash size={12} />
                        </Button>
                      </div>
                      <Tag
                        className="flex w-fit items-center gap-1"
                        color={address.addressType === "home" ? "green" : "magenta"}
                      >
                        <AddressTypeIcon />
                        <span className="capitalize">{address.addressType}</span>
                      </Tag>
                      <p className="flex items-start justify-start gap-1">
                        <MapPin size={14} className="mt-1" />
                        <span>
                          {`${address.fullAddress}, ${address.city}, ${State.getStateByCode(address.state)?.name}, ${address.zipCode}, ${Country.getCountryByCode(address.country)?.name}`}
                        </span>
                      </p>

                      <p className="flex items-start justify-start gap-1">
                        <BsTelephone size={14} className="mt-1" />
                        {address.phoneNumber}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </Radio.Group>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Card>

      <AddAddressForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isLoading={isAdding}
        setIsLoading={setIsAdding}
      />
      <Modal
        okType={actionType === "delete" ? "danger" : "primary"}
        centered
        onOk={handleOk}
        title={
          <h3 className="flex items-center gap-2">
            <BsExclamationCircleFill className="text-yellow-500" size={20} /> <span>{alertTitle}</span>{" "}
          </h3>
        }
        open={isAlertModelOpen}
        confirmLoading={isLoading}
        onCancel={handleAlertCancel}
      >
        <p>{alertDescription}</p>
      </Modal>
    </>
  );
};

export default ShippingAddressDescription;
