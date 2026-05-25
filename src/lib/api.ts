import {
  AdmissionApplication,
  ContactInquiry,
  NewsItem,
} from '../types';

// Google Apps Script URL (used for form submissions)
const GAS_URL = import.meta.env.VITE_GAS_URL || '';

// ─── Google Apps Script Form Submission ───────────────────────────────────────
// Submits any form data to the connected Google Sheet via GAS Web App
export async function submitToGAS(formType: string, data: Record<string, string>): Promise<{ success: boolean; id: string }> {
  if (!GAS_URL) throw new Error('Google Apps Script URL is not configured.');

  const payload = { formType, ...data };

  const response = await fetch(GAS_URL, {
    method: 'POST',
    // GAS requires text/plain or no-cors — use URLSearchParams for reliability
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
  });

  if (!response.ok) throw new Error('Submission failed. Please try again.');
  const result = await response.json();
  return result;
}

// ─── Admission Form ──────────────────────────────────────────────────────────
export async function createAdmission(data: Omit<AdmissionApplication, 'id'>) {
  const result = await submitToGAS('admission', {
    studentName: data.studentName,
    gradeAppliedFor: data.gradeAppliedFor,
    fatherName: data.fatherName,
    parentPhone: data.parentPhone,
    parentEmail: data.parentEmail || '',
    remarks: data.address || '',
    submittedAt: data.submittedAt,
  });
  // Return a shaped object that matches AdmissionApplication
  return { ...data, id: result.id || generateLocalId('AD') };
}

// ─── Contact Inquiry Form ─────────────────────────────────────────────────────
export async function createInquiry(data: Omit<ContactInquiry, 'id'>) {
  const result = await submitToGAS('inquiry', {
    name: data.name,
    email: data.email,
    message: data.message,
    submittedAt: data.submittedAt,
  });
  return { ...data, id: result.id || generateLocalId('INQ') };
}

// ─── Admission Lookup (for tracker) ─────────────────────────────────────────
export async function getAdmissionById(id: string): Promise<AdmissionApplication> {
  if (!GAS_URL) throw new Error('GAS not configured');
  const response = await fetch(`${GAS_URL}?type=admission&id=${encodeURIComponent(id)}`);
  if (!response.ok) throw new Error('Not found');
  const data = await response.json();
  if (!data || !data.studentName) throw new Error('Not found');
  return data as AdmissionApplication;
}

// ─── Inquiry Lookup (for tracker) ────────────────────────────────────────────
export async function getInquiryById(id: string): Promise<ContactInquiry> {
  if (!GAS_URL) throw new Error('GAS not configured');
  const response = await fetch(`${GAS_URL}?type=inquiry&id=${encodeURIComponent(id)}`);
  if (!response.ok) throw new Error('Not found');
  const data = await response.json();
  if (!data || !data.name) throw new Error('Not found');
  return data as ContactInquiry;
}

// ─── News (static — no backend needed) ───────────────────────────────────────
// News is now managed statically in the News.tsx page component
export const getAllNews = async (): Promise<NewsItem[]> => [];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function generateLocalId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}`;
}