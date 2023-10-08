export const pwdRequirementsCopy = {
  en: {
    passwordRequirements: [
      {
        text: "Must be at least 8 characters",
        validator: (val) => val.length >= 8,
      },
      {
        text: "Must contain at least one number",
        validator: (val) => /\d/g.test(val),
      },
      {
        text: "Must contain at least one lower-case letter",
        validator: (val) => /[a-z]/g.test(val),
      },
      {
        text: "Must contain at least one upper-case letter",
        validator: (val) => /[A-Z]/g.test(val),
      },
      {
        text: "Must contain at least one special character (@$%!#)",
        validator: (val) => /[@$%!#]/g.test(val),
      },
    ],
  },
  fr: {
    passwordRequirements: [
      {
        text: "Contenir au moins 8 caractères",
        validator: (val) => val.length >= 8,
      },
      {
        text: "Contenir au moins un chiffre",
        validator: (val) => /\d/g.test(val),
      },
      {
        text: "Contenir au moins une lettre minuscule",
        validator: (val) => /[a-z]/g.test(val),
      },
      {
        text: "Contenir au moins une lettre majuscule",
        validator: (val) => /[A-Z]/g.test(val),
      },
      {
        text: "Contenir au moins un caractère spécial (@$%!#)",
        validator: (val) => /[@$%!#]/g.test(val),
      },
    ],
  },
};
