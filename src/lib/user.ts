export const getUserInitials = (name?: string | null) => {
  const normalizedName = name?.trim();

  if (!normalizedName) {
    return "U";
  }

  const [firstName = "", lastName = ""] = normalizedName.split(/\s+/);
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.trim();

  return initials || "U";
};
