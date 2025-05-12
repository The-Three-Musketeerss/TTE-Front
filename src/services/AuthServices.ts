const rootUrl = import.meta.env.VITE_API_URL;

export const Login = async (email: string, password: string) => {
    const response = await fetch(`${rootUrl}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    return data;
};