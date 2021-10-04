import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import router from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { userApi } from 'src/apis';
import LayoutAttempt from 'src/components/common/Layout/LayoutAttempt';
import EmailField from 'src/components/FormControl/EmailField';
import PasswordField from 'src/components/FormControl/PasswordField';
import { AUTH_LOGIN } from 'src/interfaces';
import { setLocalStorage } from 'src/utils';
import * as yup from 'yup';

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

  const onSubmit = async (values: AUTH_LOGIN) => {
    try {
      const res = await userApi.login(values);
      const { data, token } = res.data;

      setLocalStorage('token', JSON.stringify(token));
      setLocalStorage('user', JSON.stringify(data));
      toast.success('Đăng nhập thành công');
      router.back();
    } catch (error) {
      toast.error('Có lỗi xảy ra!');
    }
  };
  return (
    <div className="login">
      <div className="login-body">
        <div className="login-header">
          <div className="login-logo">
            <Link href="/">
              <img
                src="https://fullstack.edu.vn/assets/icon/f8_icon.png"
                alt=""
              />
            </Link>
          </div>
          <h1 className="login-title">Chào mừng đến với F8</h1>
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="login-form-group">
              <EmailField
                placeholder="Địa chỉ email"
                name="email"
                control={control}
              />
            </div>
            <div className="login-form-group">
              <PasswordField
                placeholder="Mật khẩu"
                name="password"
                control={control}
              />
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
