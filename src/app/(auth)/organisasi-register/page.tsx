import { RegisterOrganisasiForm } from "@/components/auth/organisasi-register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register Organisasi"
};

export default function RegisterPage() {
    return (
        <RegisterOrganisasiForm />
    )
}