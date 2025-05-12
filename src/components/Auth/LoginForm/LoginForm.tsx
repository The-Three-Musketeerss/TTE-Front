import BaseInput from '@components/shared/BaseInput/BaseInput';
import Button from '@components/shared/Button/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoginResolver } from './LoginForm.resolver';

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(LoginResolver),
      });

    const onSubmit = (data: any) => {
        console.log(data);
      };

  return (
    <div className='bg-white flex flex-col space-y-2 rounded-lg shadow-lg p-8 lg:w-1/2'>
        <h4 className='font-medium text-lg lg:text-3xl'>Sign in</h4>
        <p className='text-xs lg:text-base'>Please enter your credentials to log in.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseInput register={register('email')} error={errors.email} label='Email' placeholder='Enter your email' />
            <BaseInput register={register('password')} error={errors.password} label='Password' placeholder='Enter your password' type='password'/>
            <Button text='Login' type='submit'/>
        </form>
    </div>
  )
}

export default LoginForm