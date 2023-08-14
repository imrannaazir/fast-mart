"use client";
import { useState } from "react";

import Headline from "@/components/ui/headline";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import AlertModal from "@/components/modals/alert-modal";

const SettingsForm = () => {
  // loading state
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <AlertModal
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {}}
      />
      <div className="flex items-center justify-between">
        <Headline
          title="Store settings"
          description="Manage store preferences"
        />
        <Button
          variant="destructive"
          size="sm"
          disabled={isLoading}
          onClick={() => setIsOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export default SettingsForm;
