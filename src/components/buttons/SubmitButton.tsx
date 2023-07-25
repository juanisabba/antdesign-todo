import { Button } from "antd";

interface SubmitButtonProps {
  isLoading: boolean;
  type: "text" | "link" | "default" | "primary" | "dashed" | undefined;
  htmlType: "button" | "submit" | "reset" | undefined;
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  type,
  htmlType,
  text,
}) => {
  return (
    <Button type={type} htmlType={htmlType} disabled={isLoading}>
      {isLoading ? "Cargando..." : text}
    </Button>
  );
};

export default SubmitButton;
