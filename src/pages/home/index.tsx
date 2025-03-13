import GuestLayout from "../layout/guest-layout";
import SignInForm from "../../components/organisms/forms/sign-in-form/sign-in.form";
import ImageBackground from "../../assets/signInBackground.jpg";
import LiveCattleFrame from "../../components/molecules/live-cattle-frame";

export default function Home() {
  return (
    <GuestLayout>
      <div className="flex justify-center items-center h-full">
        <div className="flex items-center rounded-2xl bg-white shadow-2xl shadow-gray-400">
          <div className="relative flex justify-center max-[1024px]:hidden">
            <img
              alt="background"
              src={ImageBackground}
              className="rounded-l-2xl w-full h-auto max-w-[550px] object-cover"
            />
          </div>
          <div className="flex flex-col px-8 gap-8 h-full max-lg:w-full py-8 lg:py-0">
            <SignInForm />
            <LiveCattleFrame />
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
