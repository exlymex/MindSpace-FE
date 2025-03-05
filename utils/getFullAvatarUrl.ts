import { API_ENDPOINTS } from "@/config/api";

export const getFullAvatarUrl = (avatarPath: string | undefined | null) => {
    if (!avatarPath) return undefined;
    
    if (avatarPath.startsWith('http')) {
      return avatarPath;
    }
    
    const baseUrl = API_ENDPOINTS.auth.replace('/api/v1', '');
    return `${baseUrl}${avatarPath}`;
  };