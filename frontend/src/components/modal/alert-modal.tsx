import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
import {
  selectIsLoading,
  selectIsOpen,
  selectOnConfirm,
  setIsOpen,
  setOnConfirm,
} from "@/redux/features/modal/alertModal.slice";

const AlertModal = () => {
  const isOpen = useAppSelector(selectIsOpen);
  const isLoading = useAppSelector(selectIsLoading);
  const onConfirm = useAppSelector(selectOnConfirm);
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(setOnConfirm(() => {}));
    dispatch(setIsOpen(false));
  };

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
