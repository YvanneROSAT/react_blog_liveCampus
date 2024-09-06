import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputWithLabelProps = {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  classNameInput?: string;
};

export function InputWithLabel({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
  classNameInput,
}: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={classNameInput}
      />
    </div>
  );
}
