type IButton = {
  onSubmit?: () => Promise<void>;
  classNameProperties?: string;
  content: string;
  children?: React.ReactNode;
  disabled?: boolean;
};

const Button = ({
  onSubmit,
  classNameProperties,
  content,
  children,
  disabled = false,
}: IButton) => {
  const className = `bg-brown rounded inline-flex items-center px-4 py-2 ${classNameProperties}`;

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
  };
  if (children) {
    return <button disabled={disabled}>{children}</button>;
  }

  return (
    <button className={className} disabled={disabled} onClick={handleSubmit}>
      {content}
    </button>
  );
};

export default Button;
