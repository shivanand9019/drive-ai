import api from "@/apis/axios.jsx";

/**
 * Service to fetch dashboard analytics and stats from the backend.
 */
export async function getDashboardData() {
  try {
    const response = await api.get("/dashboard/data");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    // Fallback default values if backend API is unavailable or errors
    return {
      totalFiles: 0,
      filesUploadedThisMonth: 0,
      aiProcessedFiles: 0,
      duplicateFiles: 0,
    };
  }
}

export const dashboardService = {
  getDashboardData,
};

export default dashboardService;

