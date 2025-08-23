import { useEffect } from "react";

const OAuthSuccess = () => {
  useEffect(() => {
    window.opener.postMessage({ type: 'oauth-success' }, window.location.origin);
    window.close();
  }, []);

  return null;
}

export default OAuthSuccess;