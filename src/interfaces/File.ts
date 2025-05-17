import type { Metadata } from "./Metadata";

export interface IFile {
  id: string;
  index: number;
  metadata: Metadata;
  file: File;
}