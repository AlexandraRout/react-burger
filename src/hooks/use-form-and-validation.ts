import {
  useState, useCallback, ChangeEvent, FocusEvent,
} from 'react';

function useFormAndValidation<T extends Record<string, string>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value } as T));
    setErrors((prev) => ({ ...prev, [name]: e.target.validationMessage }));
    setIsValid(e.target.closest('form')?.checkValidity() ?? false);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: false }));
  };

  const resetForm = useCallback(
    (newValues = initialValues, newErrors: Record<string, string> = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setTouched({});
      setIsValid(newIsValid);
    },
    [],
  );

  return {
    values, handleChange, handleBlur, handleFocus, errors, touched, isValid, resetForm, setValues, setIsValid,
  };
}

export default useFormAndValidation;
