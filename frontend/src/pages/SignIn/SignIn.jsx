import Lottie from 'lottie-react';
import LottieSignIn from '../../assets/lotties/SignIn.json'
import { use, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const SignIn = () => {
    const {signIn} = useContext(AuthContext)

    const handleSignIn = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value

        console.log(email, password)
        // sign in user
        signIn(email, password)
        .then((res) => {
            console.log(res.user)
        }).catch((error) => {
            console.log(error.code)
            console.log(error.message)
        })
    }

    return (
            <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Lottie
          style={{ width: "200px" }}
          animationData={LottieSignIn}
        ></Lottie>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Sign In!</h1>
            </div>
            <form onSubmit={handleSignIn}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Sign In</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
};

export default SignIn;