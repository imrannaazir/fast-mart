"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { onOpen } from "@/redux/features/modalSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";

const SetupPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isOpen = useAppSelector((state) => state.modal.isOpen);

  useEffect(() => {
    if (!isOpen) {
      dispatch(onOpen());
    }
  }, [dispatch, isOpen]);
  return <div>Root page</div>;
};

export default SetupPage;
