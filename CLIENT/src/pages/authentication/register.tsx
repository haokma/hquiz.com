import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import LayoutAttempt from 'src/components/common/LayoutAttempt';
import EmailField from 'src/components/form-controls/EmailField';
import PasswordField from 'src/components/form-controls/PasswordField';
import * as yup from 'yup';
import TextField from 'src/components/form-controls/TextField';
import { AUTH_REGISTER } from 'src/interfaces';
import userApi from 'src/apis/userApi';
import router from 'next/router';
import { setLocalStorage } from 'src/utils';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  username: yup.string().required('Vui lòng nhập tên người dùng'),
  email: yup
    .string()
    .email('Vui lòng nhập đúng định dạng email')
    .required('Vui lòng nhập địa chỉ email'),
  password: yup
    .string()
    .min(6, 'Mật khẩu chứa tối thiểu 6 kí tự')
    .required('Vui lòng nhập mật khẩu'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Mật khẩu không trùng khớp'),
});

const Register: any = () => {
  const { handleSubmit, control } = useForm<any>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: AUTH_REGISTER) => {
    try {
      const res = await userApi.register(values);
      const { data, token } = res.data;
      setLocalStorage('token', JSON.stringify(token));
      setLocalStorage('user', JSON.stringify(data));
      router.push('/');
      toast.success('Đăng kí tài khoản thành công');
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
              <TextField
                placeholder="Tên người dùng"
                name="username"
                control={control}
              />
            </div>
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
              <PasswordField
                placeholder="Xác nhận mật khẩu"
                name="confirmPassword"
                control={control}
              />
            </div>
            <div className="login-form-group">
              <button type="submit">Đăng ký</button>
            </div>
          </form>
          <div className="login-footer">
            <p>
              Bạn đã có tài khoản?
              <Link href="/authentication/login">Đăng nhập</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
Register.Layout = LayoutAttempt;

export default Register;
