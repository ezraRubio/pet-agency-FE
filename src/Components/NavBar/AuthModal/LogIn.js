import FormInput from "./FormInput";

export default function LogIn({handleChange, handleShowPassword, showPassword}) {
  
  return (
    <>
      <FormInput
      variant="outlined"
        name="email"
        label="Email Address"
        type="email"
        fullWidth
        autoFocus
        handleChange={handleChange}
      />
      <FormInput
        name="password"
        label="Password"
        fullWidth
        type={showPassword ? "text" : "password"}
        handleChange={handleChange}
        handleShowPassword={handleShowPassword}
      />
    </>
  );
}
