export interface Favorite {
  id: string;
  jobId: string;
  userId: string;
  category: string;
  companyName: string;
  description: string;
  maxSalary: number | null;
  minSalary: number | null;
  title: string;
  redirectUrl: string | null;
}
