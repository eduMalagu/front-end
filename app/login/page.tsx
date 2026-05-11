import LoginForm from "@/components/LoginForm";

import { loginAction } from "./actions";

export default function LoginPage() {
  return (
    <div className="page-shell screen flex items-center justify-center">
      <LoginForm onSend={loginAction} />
    </div>
  );
}
