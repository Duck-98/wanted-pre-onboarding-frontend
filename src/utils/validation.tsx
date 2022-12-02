export const validationId = (id: string) => {
  const idRegex =
    /^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  return idRegex.test(id);
};

export const validationPassword = (password: string) => {
  const passwordRegex = /^.{8,}$/; //8글자 이상
  return passwordRegex.test(password);
};
