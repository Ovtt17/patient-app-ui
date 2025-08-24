import FacebookIcon from '@/assets/FacebookIcon';
import GoogleIcon from '@/assets/GoogleIcon';
import type { FC } from 'react';
import { cn } from '@/lib/utils';
import { useOAuth } from '../../hooks/useOAuth';

const googleProvider = import.meta.env.VITE_GOOGLE_OAUTH_URL;
const facebookProvider = import.meta.env.VITE_FACEBOOK_OAUTH_URL;

const SocialLoginButtons: FC = () => {
  const { signInWithProvider } = useOAuth();


  return (
    <div className="flex flex-col gap-3 w-full">
      <button
        onClick={() => signInWithProvider(googleProvider)}
        aria-label="Continuar con Google"
        className={cn(
          "flex items-center justify-center gap-3 w-full px-5 py-3 rounded-xl border border-gray-30",
          "bg-white text-gray-700 font-medium shadow-sm hover:shadow-md hover:bg-gray-50",
          "focus:ring-2 focus:ring-offset-2 focus:ring-[#4285F4] transition duration-200 ease-in-out cursor-pointer"

        )}
      >
        <GoogleIcon className="w-5 h-5" />
        Continuar con Google
      </button>

      <button
        onClick={() => signInWithProvider(facebookProvider)}
        aria-label="Continuar con Facebook"
        className={cn(
          "flex items-center justify-center gap-3 w-full px-5 py-3 rounded-xl",
          "bg-[#1877F2] text-white font-medium shadow-sm hover:bg-[#166FE5] hover:shadow-md",
          "focus:ring-2 focus:ring-offset-2 focus:ring-[#1877F2] transition duration-200 ease-in-out cursor-pointer"
        )}
      >
        <FacebookIcon className="w-5 h-5" />
        Continuar con Facebook
      </button>
    </div>
  );
};

export default SocialLoginButtons;