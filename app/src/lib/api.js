export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";


export const API_BASE_URL = API_URL.replace(/\/api\/?$/, "").replace(/\/$/, "");

export const API_ENDPOINT = `${API_BASE_URL}/api`;

export const IMAGE_BASE_URL = API_BASE_URL;

export const getImageUrl = (image) => {
  if (!image) return "/Images/default.webp";

  if (image.startsWith("http")) return image;

  if (image.startsWith("/uploads/")) {
    return `${IMAGE_BASE_URL}${image}`;
  }

  if (image.startsWith("/")) return image;

  return `/Images/${image}`;
};

export const getMembers = async (section = "roster") => {
  const response = await fetch(
    `${API_URL}/api/members?section=${section}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Unable to fetch members");
  }

  const result = await response.json();
  return result.data || [];
};