export const validationId = (id: string) => {
  const idRegex =
    /^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  return idRegex.test(id);
};

export const validationPassword = (password: string) => {
  const passwordRegex = /^.{8,}$/; //8κΈμ μ΄μ
  return passwordRegex.test(password);
};
