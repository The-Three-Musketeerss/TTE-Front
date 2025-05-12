import Logo from '@assets/Icons/TTELogo.png'
import LoginForm from '@components/Auth/LoginForm/LoginForm'

const Login = () => {
  return (
    <section className='space-y-8 -my-24'>
        <h4 className='font-bold text-xl lg:text-2xl'>Tech Trend Emporium</h4>
        <div className="flex justify-around">
            <LoginForm />
            <img src={Logo} alt="Logo" className="w-1/3 h-1/3 hidden lg:flex" />
        </div>
    </section>
  )
}

export default Login