import { useForm } from "react-hook-form";
import { type SignUp, SignUpSchema } from "../../../../entities/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { stringifier } from "../../../../@utils/stringifier";
import { signUp } from "../../../../services/api/user/sign-up";
import { handleResponseToast } from "../../../../utils/handle-toast";

export const useSignUp = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUp>({ resolver: zodResolver(SignUpSchema) });

	const onSubmit = async (data: SignUp) => {
		console.log("submit");
		stringifier(data);

		const res = await signUp({ body: data });

		handleResponseToast(res);
	};

	return {
		register,
		handleSubmit,
		onSubmit,
		errors,
	};
};
