export interface MembershipFeatures {
  apiAccess: boolean;
  mealPlans: boolean;
  basicReports: boolean;
  advancedReports: boolean;
  patientManagement: boolean;
  appointmentScheduling: boolean;
}

export interface Membership {
  id: string;
  name: string;
  description: string;
  price: string;
  durationMonths: number;
  maxUsers: number;
  maxPatients: number;
  features: MembershipFeatures;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
}

export interface AssignMembershipData {
  membershipId: string;
  startDate: string;
  endDate: string;
  amountPaid: number;
  paymentMethod: string;
  paymentStatus: string;
  paymentDate: string;
  notes: string;
  transactionReference: string;
}

export interface MembershipsResponse {
  success: boolean;
  data: Membership[];
}