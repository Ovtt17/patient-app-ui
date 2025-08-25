export const preventFormSubmitOnEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
  const tag = (e.target as HTMLElement).tagName.toLowerCase();
  if (e.key === "Enter" && tag !== "textarea") {
    e.preventDefault();
  }
};