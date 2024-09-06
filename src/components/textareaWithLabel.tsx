import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type TextareaWithLabelProps = {
    label: string;
    id: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    classNameTextarea?: string;
};

export function TextareaWithLabel({label, id, placeholder, value, onChange, classNameTextarea}:TextareaWithLabelProps) {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Textarea placeholder={placeholder} value={value} onChange={onChange} className={classNameTextarea} id={id} />
    </div>
  )
}
