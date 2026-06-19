// Mock data implementations
export const dashboardService = {
  getStudentDashboard: async (studentId: string) => {
    // In a real app, this would aggregate data from Projects, Applications, and Users tables
    return {
      earnings: 45000,
      applications: {
        total: 15,
        pending: 3,
        accepted: 2,
        rejected: 10
      },
      activeProjects: 2,
      completedProjects: 12,
      rating: 4.8
    };
  },

  getBusinessDashboard: async (businessId: string) => {
    return {
      projectsPosted: 5,
      activeProjects: 3,
      totalApplicants: 42,
      moneySpent: 120000,
      rating: 4.5
    };
  }
};
