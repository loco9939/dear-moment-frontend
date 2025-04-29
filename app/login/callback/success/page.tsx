"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Suspense } from "react";
import LoginSuccessPageUI from "./page-ui";

export default function LoginSuccessPage() {
	return (
		<Suspense fallback={<LoadingSpinner />}>
			<LoginSuccessPageUI />
		</Suspense>
	);
}
