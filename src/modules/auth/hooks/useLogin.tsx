import type { ProcessedError } from "@/modules/errors/types/exception-response.types";
import { useAuth } from "@/shared/context/auth/useAuth";
import { useState } from "react";
import type { LoginRequest } from "../types/login-request.types";
import { signInUser } from "../api/auth.api";

export const useLogin = () => {
	const { login } = useAuth();
	const [error, setError] = useState<ProcessedError | null>(null);

	const handleLogin = async (loginRequest: LoginRequest) => {
		try {
      const user = await signInUser(loginRequest);
			login(user);
			setError(null);
		} catch (err: unknown) {
			setError(err as ProcessedError);
		}
	};

	return {
		handleLogin,
		error,
		setError,
	};
};
