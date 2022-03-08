import { useState } from "react";

export const useForm = initialValues => {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    e => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    },
  ];
};
