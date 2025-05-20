import GuestLayout from "../layout/guest-layout";
import SignUpForm from "./@forms/sign-up.form";

export default function SignUp() {
  return (
    <GuestLayout>
      <div className="flex justify-center items-center h-full">
        <div className="flex items-center rounded-2xl bg-white shadow-2xl shadow-gray-400">
            <SignUpForm />
        </div>
      </div>
    </GuestLayout>
  );
}
