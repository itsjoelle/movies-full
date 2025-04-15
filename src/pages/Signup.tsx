import { ChangeEvent, useState } from 'react';
import './Signup.scss';
import Header from '../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { login } from '../state/auth/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/store';

const Signup = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (action: string) => {
    const isSignup = action === 'signup';

    if (
      (isSignup &&
        (formData.name.length === 0 ||
          formData.email.length === 0 ||
          formData.password.length === 0)) ||
      (!isSignup &&
        (formData.email.length === 0 || formData.password.length === 0))
    )
      return;

    const endpoint = isSignup
      ? 'http://localhost:5005/auth/signup'
      : 'http://localhost:5005/auth/login';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include',
    });

    if (
      (isSignup && response.status === 201) ||
      (!isSignup && response.status === 200)
    ) {
      dispatch(login());
      navigate('/home');
    } else {
      console.error('Auth failed', response.status);
    }
  };

  return (
    <div className="container-signup">
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center outerContainer">
          <div className="text flex column">
            <h1>Your Ultimate Movie & Series Guide</h1>
            <h4>Anytime, Anywhere!</h4>
          </div>
          <div className={`form`}>
            {!hasAccount ? (
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={(e) => handleForm(e)}
              />
            ) : null}

            <input
              type="email"
              placeholder="Email Adress"
              name="email"
              value={formData.email}
              onChange={(e) => handleForm(e)}
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={(e) => handleForm(e)}
            />
          </div>

          <button
            className="signup-button"
            onClick={() => handleSignUp(!hasAccount ? 'signup' : 'login')}
          >
            {!hasAccount ? 'Sign Up' : 'Log In'}
          </button>

          <div
            className="switch"
            onClick={() => setHasAccount(!hasAccount ? true : false)}
          >
            {!hasAccount ? 'Already have an account?' : 'New Here? Register'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
