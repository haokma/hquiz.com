import { ErrorMessage } from '@hookform/error-message';
import { NextPage } from 'next';
import { Controller } from 'react-hook-form';

interface EMAILFIELDPROPS {
  control: any;
  name: string;
  placeholder: string;
}

const EmailField = (props: EMAILFIELDPROPS) => {
  const { control, name, placeholder } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        formState: { errors },
      }) => (
        <>
          <input
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            type="email"
            placeholder={placeholder}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="error">{message}</p>
            )}
          />
        </>
      )}
    />
  );
};

export default EmailField;
