import FormInput from "./FormInput";

export default function SignUp({handleChange, handleShowPassword}) {
  return (
    <>
      <FormInput
        name="confirmPassword"
        label="Repeat Password"
        type="password"
        handleChange={handleChange}
        handleShowPassword={handleShowPassword}
      />
      <FormInput name="firstName" label="First Name" half handleChange={handleChange}/>
      <FormInput name="lastName" label="Last Name" half handleChange={handleChange}/>
      <FormInput name="phone" label="Phone Number" handleChange={handleChange}/>
    </>
  );
}
