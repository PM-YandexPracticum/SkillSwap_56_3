import { ReactNode } from "react";

export type InfoBlockProps = {
  image: ReactNode;
  title: string;
  description: string;
  extraClass?: string;
};