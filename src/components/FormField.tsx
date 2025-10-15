import { AiOutlineUpload } from "react-icons/ai";
import { Label } from "./label";

interface FormFieldProps {
  label: string;
  value?: string | File;
  type?: "text" | "textarea" | "file";
  onChange?: (value: string | File) => void;
}



export const FormField: React.FC<FormFieldProps> = ({ label, value, type = "text", onChange }) => (
  <div className="flex-1 flex flex-col items-start gap-2">
    <div
      className={`flex flex-col items-start gap-2.5 px-4 py-3 w-full ${
        type === "textarea" ? "min-h-[150px]" : "h-[69px]"
      } bg-lightest-gray rounded-lg border border-solid border-[#fcfcfe]`}
    >
      {type === "file" ? (
        <div className="flex items-center  justify-between w-full">
          <Label>{label}</Label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              id={`file-input-${label}`}
              className="hidden"
              onChange={(e) => e.target.files && onChange && onChange(e.target.files[0])}
            />
            <label
              htmlFor={`file-input-${label}`}
              className="flex items-center gap-2 pt-1 cursor-pointer text-blue-500"
            >
              <AiOutlineUpload size={24} />
              <span>{value ? (value as File).name : ''}</span>
            </label>
          </div>
        </div>
      ) : (
        <div className={`flex flex-col  w-full ${type === "textarea" ? "h-full" : "h-9"}`}>
          <Label>{label}</Label>
          {type === "textarea" ? (
            <textarea
              value={value as string}
              onChange={(e) => onChange && onChange(e.target.value)}
              className="bg-transparent  border-none w-full h-full resize-none focus:outline-none min-h-[100px] flex-1"
            />
          ) : (
            <input
              type={type}
              value={value as string}
              onChange={(e) => onChange && onChange(e.target.value)}
              className="bg-transparent mt-[10px] border-none w-full h-full focus:outline-none"
            />
          )}
        </div>
      )}
    </div>
  </div>
);