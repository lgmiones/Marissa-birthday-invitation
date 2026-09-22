"use client";

import { useState, type ReactNode } from "react";
import LocationModal from "./LocationModal";
import OutfitModal from "./outfits/OutfitModal";

export type DetailAction = "map" | "outfits";

/** Turns a Save-the-Date card into a button that opens its popup. */
export default function DetailCardTrigger({
  action,
  className,
  children,
}: {
  action: DetailAction;
  className: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button type="button" aria-haspopup="dialog" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      {action === "map" ? (
        <LocationModal open={open} onClose={close} />
      ) : (
        <OutfitModal open={open} onClose={close} />
      )}
    </>
  );
}
