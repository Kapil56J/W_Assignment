export interface JobDetails {
    companyName: string;
    jdLink: string;
    jdUid: string;
    jobDetailsFromCompany: string;
    jobRole: string;
    location: string;
    logoUrl: string;
    maxExp: number;
    maxJdSalary: number;
    minExp: number | null;
    minJdSalary: number | null;
    salaryCurrencyCode: string;
}