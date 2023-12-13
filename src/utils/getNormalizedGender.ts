export const getNormalizedGender = (gender: string): string => {
    return gender !== "male" && gender !== "female" ? "other" : gender;
  };