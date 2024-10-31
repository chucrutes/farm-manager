import GuestLayout from "../layout/GuestLayout";
import SignInForm from "../../components/organisms/forms/SignInForm";
import ImageBackground from "../../assets/signInBackground.jpg";

export default function Home() {
  return (
    <GuestLayout>
      <div className="flex items-center justify-center p-10">
        <div className="flex items-center max-h-[460px] rounded-2xl shadow-lg">
          <div className="relative flex justify-center max-[1120px]:hidden">
            <img
              alt="background"
              src={ImageBackground}
              className="rounded-l-2xl w-full h-auto max-w-[400px] max-h-[430px] object-cover"
            />
          </div>
          <SignInForm />
        </div>
      </div>
    </GuestLayout>
  );
}
