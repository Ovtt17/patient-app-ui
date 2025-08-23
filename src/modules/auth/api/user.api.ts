// Utilidad síncrona para obtener la URL de avatar por nombre de usuario
export function getAvatarUrl(username: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random`;
}
