type IButton = {
  type?: "button" | "submit";
  onClick?: () => Promise<void>;
  classNameProperties?: string;
  content: string;
  children?: React.ReactNode;
  disabled?: boolean;
};

const Button = ({
  type = "button",
  onClick,
  classNameProperties,
  content,
  children,
  disabled = false,
}: IButton) => {
  const className = `bg-brown rounded inline-flex items-center px-4 py-2 ${classNameProperties}`;

  const handleSubmit = () => {
    if (onClick) {
      onClick();
    }
  };
  if (children) {
    return (
      <button
        className={className}
        type={type}
        disabled={disabled}
        onClick={handleSubmit}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={className}
      type={type}
      disabled={disabled}
      onClick={handleSubmit}
    >
      {content}
    </button>
  );
};

export default Button;
