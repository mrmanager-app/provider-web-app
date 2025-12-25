// Auth Types
export type AuthMethod = "email" | "phone";

export type AuthStep = "identifier" | "otp" | "password";

// Form Component Props
export interface FormHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export interface IdentifierFormProps {
  onSubmit: (value: string) => void | Promise<void>;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  submitLabel?: string;
  className?: string;
}

export interface OtpFormProps {
  identifier: string;
  onSubmit: (otp: string) => void | Promise<void>;
  onResend: () => void | Promise<void>;
  onBack?: () => void;
  className?: string;
}

export interface PasswordFormProps {
  identifier: string;
  onSubmit: (password: string) => void | Promise<void>;
  onBack?: () => void;
  onForgotPassword?: () => void;
  forgotPasswordHref?: string;
  submitLabel?: string;
  className?: string;
}

export interface CreatePasswordFormProps {
  identifier: string;
  onSubmit: (password: string) => void | Promise<void>;
  submitLabel?: string;
  className?: string;
}
