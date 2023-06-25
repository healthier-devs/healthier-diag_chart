interface IFormInput {
  name: String;
  id: String;
  pw: String;
  pwConfirm: String;
  email: String;
}

interface ILoginFormInput {
  id: String;
  pw: String;
}

export type { IFormInput, ILoginFormInput };
