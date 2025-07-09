'use client';

import Toast from "@/components/common/Toast";
import API from "@/libs/api";
import { LoginDto } from "@/types/auth.types";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const initialState: LoginDto = {
	username: "",
	password: "",
};

export default function Login() {
	const [form, setForm] = useState<LoginDto>(initialState);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const [toast, setToast] = useState({ visible: false, message: "", type: "success" as "success" | "error" });

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
			const res = await API.post("/auth", form);
			const token = res.data?.data?.access_token;
			if (token) {
				localStorage.setItem("access_token", token);
				setToast({ visible: true, message: "Logged in successfully", type: "success" });
				setTimeout(() => {
					router.push("/movies");
				}, 1200);
			} else {
				setToast({ visible: true, message: "There was an error with the user", type: "error" });
			}
		} catch (err: any) {
			setToast({ visible: true, message: "Error while logging in", type: "error" });
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Toast
				message={toast.message}
				type={toast.type}
				visible={toast.visible}
				onClose={() => setToast({ ...toast, visible: false })}
			/>
			<div className="text-center py-[10px] flex flex-col justify-center items-center gap-[10px] h-[100dvh] w-[100%]">
				<form className="border flex flex-col p-[20px] rounded-[7px] justify-around items-center border-solid border-[grey] gap-[15px]" onSubmit={handleSubmit}>
					<div className="flex flex-row gap-[20px]">
						<label htmlFor="username">Username</label>
						<input
							className="px-[10px] py-[5px]"
							id="username"
							name="username"
							type="text"
							value={form.username}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="flex flex-row gap-[20px]">
						<label htmlFor="password">Password</label>
						<input
							className="px-[10px] py-[5px]"
							id="password"
							name="password"
							type="password"
							value={form.password}
							onChange={handleChange}
							required
						/>
					</div>
					{error && <div>{error}</div>}
					<button className="px-[15px] py-[5px] w-full" type="submit" disabled={loading}>
						{loading ? "Logging In..." : "Login"}
					</button>
				</form>
			</div>
		</>
	);
} 