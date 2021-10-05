import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
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
    <>
      <Head>
        <meta lang="UTF-8" />
        <title>Trắc nghiệm Online – Luyện thi Online miễn phí</title>
        <meta
          name="Keywords"
          content="Trắc nghiệm, Đề Thi Học Kỳ, Đề Thi THPT Quốc Gia, Đề Kiểm Tra, English test, IT test, MBTI test, IQ/EQ test, thi bắng lái, công chức, đại cương, chuyên nghành, kết thúc học phần ĐHCĐ"
        />
        <meta
          name="Description"
          content="Tuyển tập các đề thi trắc nghiệm THPT QG 2020, ngân hàng câu trắc nghiệm các môn từ lớp 1 đến 12, English test, IT test, MBTI test, IQ/EQ test, thi bắng lái, công chức và kết thúc học phần ĐHCĐ"
        />
        <meta
          property="og:title"
          content="Trắc nghiệm Online – Luyện thi Online miễn phí"
        />
        <meta
          property="og:description"
          content="Tuyển tập các đề thi trắc nghiệm THPT QG 2020, ngân hàng câu trắc nghiệm các môn từ lớp 1 đến 12, English test, IT test, MBTI test, IQ/EQ test, thi bắng lái, công chức và kết thúc học phần ĐHCĐ"
        />
        <meta
          property="og:image"
          content="https://s.tracnghiem.net/assets/images/fb-trac-nghiem.jpg"
        />
      </Head>
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
    </>
  );
};
Login.Layout = LayoutAttempt;

export default Login;
