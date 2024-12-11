import { Helmet } from "react-helmet";
import { RegistrationForm } from "../../components/RegistrationForm/RegistrationForm";

export default function RegisterPage() {
  return (
    <div>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <RegistrationForm />
    </div>
  );
}