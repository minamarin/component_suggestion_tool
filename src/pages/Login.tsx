import { Button } from '@visa/nova-react';

const Login = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      gap: '1.5rem',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Login</h2>

      {/* Full Name */}
      <input
        type="text"
        placeholder="Full Name"
        style={{
          padding: '0.75rem',
          width: '300px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '1rem'
        }}
      />

      {/* Email */}
      <input
        type="email"
        placeholder="Email Address"
        style={{
          padding: '0.75rem',
          width: '300px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '1rem'
        }}
      />

      {/* Submit Button */}
      <Button>Login</Button>

      {/* Divider */}
      <div style={{ fontWeight: 'bold' }}>or</div>

      {/* Gmail Login */}
      <Button
        style={{
          backgroundColor: '#4285F4',
          color: '#fff',
          width: '300px',
          fontWeight: 'bold'
        }}
      >
        Sign in with Google
      </Button>
    </div>
  );
};

export default Login;