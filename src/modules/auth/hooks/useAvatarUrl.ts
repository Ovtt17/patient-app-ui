import { useMemo } from 'react';
import { getAvatarUrl } from '../api/user.api';

/**
 * Hook para obtener la URL final del avatar de usuario (remota o generada)
 */
export function useAvatarUrl(profilePictureUrl: string | null | undefined, username: string | undefined) {
  // Devuelve la URL de la imagen de perfil o la generada por nombre
  return useMemo(() => {
    if (profilePictureUrl) return profilePictureUrl;
    if (username) return getAvatarUrl(username);
    return undefined;
  }, [profilePictureUrl, username]);
}
