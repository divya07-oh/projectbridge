import { ApiError } from '../../utils/apiError';

// Mock in-memory database
let applications: any[] = [];

export const applicationsService = {
  applyToProject: async (projectId: string, studentId: string, data: any) => {
    // Check if already applied
    const existing = applications.find(a => a.projectId === projectId && a.studentId === studentId);
    if (existing) {
      throw new ApiError(400, 'You have already applied to this project');
    }

    const newApplication = {
      id: `app_${Date.now()}`,
      projectId,
      studentId,
      ...data,
      status: 'pending',
      appliedAt: new Date()
    };

    applications.push(newApplication);
    return newApplication;
  },

  getStudentApplications: async (studentId: string) => {
    return applications.filter(a => a.studentId === studentId);
  },

  getProjectApplicants: async (projectId: string, businessId: string) => {
    // In a real DB, verify that businessId owns the projectId
    return applications.filter(a => a.projectId === projectId);
  },

  updateApplicationStatus: async (applicationId: string, status: string, businessId: string) => {
    const application = applications.find(a => a.id === applicationId);
    if (!application) {
      throw new ApiError(404, 'Application not found');
    }
    // In a real DB, verify that businessId owns the project
    application.status = status;
    return application;
  }
};
