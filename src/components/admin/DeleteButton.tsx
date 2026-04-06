"use client";

import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  action: () => Promise<void>;
  label?: string;
}

export default function DeleteButton({
  action,
  label = "Delete",
}: DeleteButtonProps) {
  const router = useRouter();

  async function handleClick() {
    if (!window.confirm("Delete this record? This cannot be undone.")) return;
    await action();
    router.refresh();
  }

  return (
    <button
      onClick={handleClick}
      className="font-body text-sm text-red-500 hover:text-red-700 transition-colors"
    >
      {label}
    </button>
  );
}
