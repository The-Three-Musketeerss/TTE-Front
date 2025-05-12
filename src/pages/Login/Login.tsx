import Logo from '@assets/Icons/TTELogo.png'

const Login = () => {
  return (
    <section>
        <h4>Tech Trend Emporium</h4>
        <div className="flex justify-between">

            <img src={Logo} alt="Logo" className="w-1/2 h-1/2" />
        </div>
    </section>
  )
}

export default Login