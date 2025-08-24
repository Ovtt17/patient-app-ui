import { useAuth } from "@/shared/context/auth/useAuth";
import { useEffect, useCallback } from "react";
import { getCurrentUserInfo } from "../api/auth.api";

const OAUTH_WINDOW_FEATURES = (width = 500, height = 600) => {
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  return `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`;
};

export const useOAuth = () => {
  const { login } = useAuth();

  const signInWithProvider = useCallback((url: string) => {
    window.open(url, "_blank", OAUTH_WINDOW_FEATURES());
  }, []);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      // Seguridad: solo aceptar mensajes del mismo origin
      if (event.origin !== window.location.origin) return;

      // Si OAuth fue exitoso
      if (event.data.type === "oauth-success") {
        try {
          const user = await getCurrentUserInfo();
          login(user);
        } catch (error) {
          console.error("❌ Error obteniendo usuario:", error);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    // Cleanup del listener cuando se desmonta
    return () => window.removeEventListener("message", handleMessage);
  }, [login]);

  return { signInWithProvider };
};
