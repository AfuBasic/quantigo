import { apiClient } from '@/api/client';
import type { VerificationProfile, VerificationHistory } from '../types';

export const getVerificationStatus = async (): Promise<VerificationProfile> => {
  const { data } = await apiClient.get('/business-verification/status');
  return data.data;
};

export const getVerificationHistory = async (): Promise<VerificationHistory[]> => {
  const { data } = await apiClient.get('/business-verification/history');
  return data.data;
};

export const submitVerification = async (): Promise<VerificationProfile> => {
  const { data } = await apiClient.post('/business-verification/submit');
  return data.data;
};

export const resubmitVerification = async (notes: string): Promise<VerificationProfile> => {
  const { data } = await apiClient.post('/business-verification/resubmit', { notes });
  return data.data;
};

export const uploadVerificationDocument = async (documentType: string, file: File): Promise<VerificationProfile> => {
  // In a real implementation, you would first upload the file to Cloudinary/S3
  // and then send the URL to this endpoint. For simulation, we assume a fake URL.
  const dummyUrl = URL.createObjectURL(file);
  const { data } = await apiClient.post('/business-verification/documents', {
    document_type: documentType,
    document_url: dummyUrl,
  });
  return data.data;
};
