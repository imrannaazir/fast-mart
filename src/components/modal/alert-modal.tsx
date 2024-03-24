import { FC } from "react";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
type AlertModalProps = {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const AlertModal: FC<AlertModalProps> = ({
  isLoading,
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      title="Are you sure?"
      description="This action can not be undo."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button variant="outline" disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>

        <Button disabled={isLoading} variant="destructive" onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
