export interface AnalysisResult {
  hasAction: boolean;
  actionRequired?: string;
  when?: string;
  date?: string;
  time?: string;
  where?: string;
  amount?: string;
  importantDetails?: string;
  nextStep?: string;
  summary?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readingTime: number;
  category: string;
  keywords: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface UseCase {
  icon: string;
  title: string;
  description: string;
  example: string;
}
