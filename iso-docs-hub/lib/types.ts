export type Category =
  | "iso-9001"
  | "iso-14001"
  | "iso-45001"
  | "ims"
  | "zed-certification"
  | "vendor-registration"
  | "sops"
  | "formats"
  | "audit-checklists"
  | "legal-registers"
  | "risk-assessment"
  | "calibration"
  | "training"
  | "hr-documents"
  | "quality-documents"
  | "environment-documents"
  | "safety-documents";

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: Category;
  tagline: string;
  description: string;
  price: number; // paise
  compareAtPrice?: number;
  docCode: string; // e.g. QMS-9001-KIT
  version: string;
  lastUpdated: string;
  documentCount: number;
  whatsIncluded: string[];
  compatibility: string[];
  images: string[];
  previewPdfUrl?: string;
  rating: number;
  reviewCount: number;
  popular?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  name: string;
  company: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  author: string;
  date: string;
  readMinutes: number;
}
