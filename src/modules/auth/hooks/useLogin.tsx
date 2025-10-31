import type { ProcessedError } from "@/modules/errors/types/exception-response.types";
import { useAuth } from "@/shared/context/auth/useAuth";
import { useState } from "react";
import type { LoginRequest } from "../types/login-request.types";
import { signInUser } from "../api/auth.api";
import { useLocation } from "react-router-dom";
import { Routes } from "@/shared/constants/routes";

export const useLogin = () => {
	const { login } = useAuth();
	const location = useLocation();
	const [error, setError] = useState<ProcessedError | null>(null);

	const handleLogin = async (loginRequest: LoginRequest) => {
		try {
			const user = await signInUser(loginRequest);
			const redirectTo = (location.state as any)?.redirectTo;
			setError(null);
			login(user, redirectTo || Routes.HOME);
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
