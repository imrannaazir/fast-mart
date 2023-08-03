"use client";

import Modal from "@/components/ui/modal";
import { onClose } from "@/redux/features/modalSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

const StoreModal = () => {
  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Modal
      title="Create Store"
      description="Add new store to add new products and categories"
      isOpen={isOpen}
      onClose={() => dispatch(onClose())}
    >
      Form is here
    </Modal>
  );
};

export default StoreModal;
