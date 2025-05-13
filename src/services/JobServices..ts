const rootUrl = import.meta.env.VITE_API_URL;

export const getJobs = async (token: string) => {
  const response = await fetch(`${rootUrl}/api/jobs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch jobs");
  }
  return data;
};

export const reviewJob = async (jobId: number, token: string, action: string) => {
    const response = await fetch(`${rootUrl}/api/reviewJob/${jobId}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || "Failed to review job");
    }
    return data;
    }
