export type BodyCreation = {
  message: string;
  type: "success" | "error" | "info";
  dto: unknown;
};

export type ResponseCreation = {
  status: number;
  body: BodyCreation;
};
