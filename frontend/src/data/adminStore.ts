import { PRODUCTS as DEFAULT_PRODUCTS } from './products';
import type { ProductDetailItem } from './products';
import { 
  INITIAL_JOB_POSITIONS, 
  INITIAL_APPLICATIONS 
} from './careers';
import type { JobPosition, CandidateApplication } from './careers';

const PRODUCTS_KEY = 'hitech_products_v1';
const JOBS_KEY = 'hitech_jobs_v1';
const APPLICATIONS_KEY = 'hitech_applications_v1';

// --- PRODUCTS ---
export function getStoredProducts(): ProductDetailItem[] {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_PRODUCTS;
  } catch (e) {
    console.error('Error loading stored products:', e);
    return DEFAULT_PRODUCTS;
  }
}

export function saveStoredProduct(product: ProductDetailItem): ProductDetailItem[] {
  const current = getStoredProducts();
  const index = current.findIndex(p => p.id === product.id);
  let updated: ProductDetailItem[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = product;
  } else {
    updated = [product, ...current];
  }
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('hitech-products-updated'));
  return updated;
}

export function deleteStoredProduct(id: string): ProductDetailItem[] {
  const current = getStoredProducts();
  const updated = current.filter(p => p.id !== id);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('hitech-products-updated'));
  return updated;
}

export function resetStoredProducts(): ProductDetailItem[] {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
  window.dispatchEvent(new Event('hitech-products-updated'));
  return DEFAULT_PRODUCTS;
}

// --- JOBS ---
export function getStoredJobs(): JobPosition[] {
  try {
    const raw = localStorage.getItem(JOBS_KEY);
    if (!raw) {
      localStorage.setItem(JOBS_KEY, JSON.stringify(INITIAL_JOB_POSITIONS));
      return INITIAL_JOB_POSITIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_JOB_POSITIONS;
  } catch (e) {
    console.error('Error loading stored jobs:', e);
    return INITIAL_JOB_POSITIONS;
  }
}

export function saveStoredJob(job: JobPosition): JobPosition[] {
  const current = getStoredJobs();
  const index = current.findIndex(j => j.id === job.id);
  let updated: JobPosition[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = job;
  } else {
    updated = [job, ...current];
  }
  localStorage.setItem(JOBS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('hitech-jobs-updated'));
  return updated;
}

export function deleteStoredJob(id: string): JobPosition[] {
  const current = getStoredJobs();
  const updated = current.filter(j => j.id !== id);
  localStorage.setItem(JOBS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('hitech-jobs-updated'));
  return updated;
}

export function toggleStoredJobStatus(id: string): JobPosition[] {
  const current = getStoredJobs();
  const updated = current.map(job => {
    if (job.id === id) {
      return {
        ...job,
        status: (job.status === 'paused' ? 'active' : 'paused') as 'active' | 'paused'
      };
    }
    return job;
  });
  localStorage.setItem(JOBS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('hitech-jobs-updated'));
  return updated;
}

// --- APPLICATIONS ---
export function getStoredApplications(): CandidateApplication[] {
  try {
    const raw = localStorage.getItem(APPLICATIONS_KEY);
    if (!raw) {
      localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_APPLICATIONS;
  } catch (e) {
    console.error('Error loading stored applications:', e);
    return INITIAL_APPLICATIONS;
  }
}

export function submitStoredApplication(app: Omit<CandidateApplication, 'id' | 'appliedAt' | 'status'>): CandidateApplication {
  const current = getStoredApplications();
  const newApp: CandidateApplication = {
    ...app,
    id: `app-${Date.now()}`,
    appliedAt: new Date().toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    status: 'Under Review'
  };
  const updated = [newApp, ...current];
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('hitech-applications-updated'));
  return newApp;
}

export function updateStoredApplicationStatus(id: string, status: CandidateApplication['status']): CandidateApplication[] {
  const current = getStoredApplications();
  const updated = current.map(a => a.id === id ? { ...a, status } : a);
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('hitech-applications-updated'));
  return updated;
}

export function deleteStoredApplication(id: string): CandidateApplication[] {
  const current = getStoredApplications();
  const updated = current.filter(a => a.id !== id);
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('hitech-applications-updated'));
  return updated;
}
