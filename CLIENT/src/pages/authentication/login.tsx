import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import LayoutAttempt from '../../components/common/LayoutAttempt';
import EmailField from '../../components/form-controls/EmailFlied';
import PasswordField from '../../components/form-controls/PasswordFiled';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Vui lòng nhập đúng định dạng email')
    .required('Vui lòng nhập địa chỉ email'),
  password: yup
    .string()
    .min(6, 'Mật khẩu chứa tối thiểu 6 kí tự')
    .required('Vui lòng nhập mật khẩu'),
});

interface FormValues {
  email: string;
  password: string;
}

const Login: any = () => {
  const { handleSubmit, control } = useForm<any>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <div className="login">
      <div className="login-body">
        <div className="login-header">
          <div className="login-logo">
            <Link href="/">
              <img src="https://fullstack.edu.vn/assets/icon/f8_icon.png" alt="" />
            </Link>
          </div>
          <h1 className="login-title">Chào mừng đến với F8</h1>
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="login-form-group">
              <EmailField placeholder="Địa chỉ email" name="email" control={control} />
            </div>
            <div className="login-form-group">
              <PasswordField placeholder="Mật khẩu" name="password" control={control} />
            </div>
            <div className="login-form-group">
              <button type="submit">Đăng nhập</button>
            </div>
          </form>
          <div className="login-footer">
            <p>
              Bạn chưa có tài khoản?
              <Link href="/authentication/register">Đăng ký</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
Login.Layout = LayoutAttempt;

export default Login;
