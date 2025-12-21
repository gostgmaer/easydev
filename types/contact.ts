export interface ContactFormData {
  client: {
    name: string;
    email: string;
    phone?: string;
    companyName?: string;
  };
  projectDetails: {
    servicesInterested: string[];
    budgetRange?: string;
    timelinePreference?: string;
  };
  message: {
    subject: string;
    body: string;
  };
  preferences: {
    preferredContactMethod: string;
    newsletterOptIn: boolean;
    privacyConsent: boolean;
  };
}

export interface ContactInfo {
  title: string;
  value: string;
  href: string;
  description: string;
  icon: any;
}

export interface ServiceOption {
  key: string;
  value: string;
}

export interface FAQ {
  q: string;
  a: string;
}




export interface ContactSubmissionResponse {
  success: boolean;
  message: string;
  id?: string;
}
