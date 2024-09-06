export const fetchCsrfToken = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_KEY}${process.env.REACT_APP_CSRF_TOKEN_ENDPOINT}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    if (response.ok) localStorage.setItem("csrfToken", data.csrfToken);
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
  }
};

export const getCsrfTokenFromStorage = () => {
  return localStorage.getItem("csrfToken");
};

