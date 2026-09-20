import { ReactNode } from "react";

export type BasePopoverProps = {
  trigger: (args: { isOpen: boolean; toggle: () => void }) => ReactNode;
  children: ReactNode;
};