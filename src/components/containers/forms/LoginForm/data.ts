import { tKey } from "@/i18n";
import * as z from "zod";
import { TFormConfig } from "@/common/types";

const schema = {
  username: z.string(tKey("Components.Containers.Forms.LoginForm.username.errorMsg")),
  password: z.string(tKey("Components.Containers.Forms.LoginForm.password.errorMsg")),
};

export const formConfig: TFormConfig<typeof schema> = {
  labelTranslationKey: {
    username: "Components.Containers.Forms.LoginForm.username.label",
    password: "Components.Containers.Forms.LoginForm.password.label",
  },
  placeholderTranslationKey: {
    username: "Components.Containers.Forms.LoginForm.username.placeholder",
    password: "Components.Containers.Forms.LoginForm.password.placeholder",
  },
  name: {
    username: "username",
    password: "password",
  },
  defaultValues: {
    username: "",
    password: "",
  },
  validationRules: z.object(schema),
};
