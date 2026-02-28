export interface Jobs {
  count: number;
  mean: number;
  results: Results[];
}

export interface Results {
  id: string;
  contract_time: string;
  description: string;
  redirect_url: string;
  salary_max: number;
  salary_min: number;
  title: string;
  company: {
    display_name: string;
  };
  category: Category;
  location: {
    display_name: string;
  };
  latitude: number;
  longitude: number;
}

export interface CategoryResult {
  results: Category[];
}

interface Category {
  label: string;
  tag: string;
}
