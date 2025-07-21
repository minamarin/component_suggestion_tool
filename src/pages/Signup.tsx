import { Button } from '@visa/nova-react';

const Signup = () => {
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
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Sign Up</h2>

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

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        style={{
          padding: '0.75rem',
          width: '300px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '1rem'
        }}
      />

      {/* Sign Up Button */}
      <Button alternate>Create Account</Button>

      {/* Divider */}
      <div style={{ fontWeight: 'bold' }}>or</div>

      {/* Google Sign Up */}
      <Button
        style={{
          backgroundColor: '#4285F4',
          color: '#fff',
          width: '300px',
          fontWeight: 'bold'
        }}
      >
        Sign Up with Google
      </Button>
    </div>
  );
};

export default Signup;