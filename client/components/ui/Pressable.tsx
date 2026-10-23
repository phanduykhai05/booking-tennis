import type { ButtonHTMLAttributes, ReactNode } from "react";

type TouchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick"> & {
  accessibilityLabel?: string;
  accessibilityRole?: string;
  children?: ReactNode;
  className?: string;
  onPress?: () => void;
};

/** Nút bấm với phản hồi chạm thống nhất: mờ nhẹ khi nhấn, mờ hơn khi disabled. */
export default function Touch({
  accessibilityLabel,
  accessibilityRole: _role,
  children,
  className = "",
  disabled,
  onPress,
  ...props
}: TouchProps) {
  return (
    <button
      aria-label={accessibilityLabel}
      className={`${disabled ? "cursor-default opacity-55" : "active:opacity-70"} ${className}`}
      disabled={disabled}
      onClick={onPress}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
