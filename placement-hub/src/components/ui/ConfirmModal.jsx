"use client";

import Modal from "./Modal";
import Button from "./Button";

export default function ConfirmModal({
  open,
  onOpenChange,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "primary",
  isLoading = false,
  onConfirm,
}) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title={title} description={description} size="sm">
      <div className="mt-2 flex justify-end gap-2">
        <Button variant="secondary" size="sm" onClick={() => onOpenChange(false)}>
          {cancelLabel}
        </Button>
        <Button
          variant={tone === "danger" ? "danger" : "primary"}
          size="sm"
          isLoading={isLoading}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
