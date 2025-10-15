import React, { useEffect, useRef, useState } from "react";
import { Button } from "../components/button";
import { Label } from "../components/label";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSubmitForm, type FormDataType } from "../hooks/useSendForm"
import { AiOutlineUpload } from "react-icons/ai";
import image from '../../public/email.svg'
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

interface FormFieldProps {
  label: string;
  value?: string | File;
  type?: "text" | "textarea" | "file";
  onChange?: (value: string | File) => void;
}

const FormField: React.FC<FormFieldProps> = ({ label, value, type = "text", onChange }) => (
  <div className="flex-1 flex flex-col items-start gap-2">
    <div
      className={`flex flex-col items-start gap-2.5 px-4 py-3 w-full ${
        type === "textarea" ? "min-h-[150px]" : "h-[69px]"
      } bg-lightest-gray rounded-lg border border-solid border-[#fcfcfe]`}
    >
      {type === "file" ? (
        <div className="flex items-center justify-between w-full">
          <Label className="text-[length:var(--big-font-size)] tracking-[var(--big-letter-spacing)] leading-[var(--big-line-height)] font-big font-[number:var(--big-font-weight)] text-light-themegraymd-new-grey whitespace-nowrap [font-style:var(--big-font-style)]">
            {label}
          </Label>
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
        <div className={`flex flex-col w-full ${type === "textarea" ? "h-full" : "h-9"}`}>
          <Label className="text-[length:var(--big-font-size)] tracking-[var(--big-letter-spacing)] leading-[var(--big-line-height)] font-big font-[number:var(--big-font-weight)] text-light-themegraymd-new-grey whitespace-nowrap [font-style:var(--big-font-style)]">
            {label}
          </Label>
          {type === "textarea" ? (
            <textarea
              value={value as string}
              onChange={(e) => onChange && onChange(e.target.value)}
              className="bg-transparent border-none w-full h-full resize-none focus:outline-none min-h-[100px] flex-1"
              style={{ minHeight: "100px" }}
            />
          ) : (
            <input
              type={type}
              value={value as string}
              onChange={(e) => onChange && onChange(e.target.value)}
              className="bg-transparent border-none w-full h-full focus:outline-none"
            />
          )}
        </div>
      )}
    </div>
  </div>
);

export const ContactSection = () => {
     const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const { mutate, isPending, isSuccess, isError } = useSubmitForm();

  const [formData, setFormData] = useState<FormDataType>({
    full_name: "",
    gmail: "",
    about_you: "",
    phone_number: "",
    description: "",
    file: null,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(illustrationRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(formRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (field: keyof FormDataType, value: string | File) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    mutate(formData);
  };

  return (
    <section id="habarlasmak" ref={sectionRef} className="flex items-start gap-20 p-[150px] w-full bg-gray-white">
      <div className="flex items-start gap-20 flex-1">
        <div ref={formRef} className="flex flex-col items-start gap-8 flex-1">
          <h2 className="w-fit [font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-dark-blue-gray text-[44px] text-center tracking-[0] leading-[52.8px] whitespace-nowrap">
            {t('innovation')}
          </h2>

          <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-dark-blue-gray text-2xl tracking-[-0.48px] leading-[38.4px]">
           {t('contactText')}
          </p>

          <div className="flex flex-col items-end justify-center gap-8 w-full">
            <div className="flex flex-col items-start gap-4 w-full">
              <div className="flex items-start gap-4 w-full">
                <FormField
                  label={t('form.name')}
                  value={formData.full_name}
                  onChange={(val) => handleChange("full_name", val)}
                />
                <FormField
                    label={t('form.phone')}
                  value={formData.phone_number}
                  onChange={(val) => handleChange("phone_number", val)}
                />
              </div>

              <div className="flex items-start gap-4 w-full">
                <FormField
                  label={t('form.email')}
                  value={formData.gmail}
                  onChange={(val) => handleChange("gmail", val)}
                />
                <FormField
                 label={t('form.file')}
                  type="file"
                  value={formData.file ?? undefined}
                  onChange={(val) => handleChange("file", val)}
                />
              </div>

              <div className="flex items-start gap-4 w-full">
                <FormField
                label={t('form.about')}
                  type="textarea"
                  value={formData.about_you}
                  onChange={(val) => handleChange("about_you", val)}
                />
                <FormField
                 label={t('form.ideaDescription')}
                  type="textarea"
                  value={formData.description}
                  onChange={(val) => handleChange("description", val)}
                />
              </div>
            </div>

            <Button
              className="h-auto p-6 w-full rounded-lg bg-blue-500 hover:bg-blue0/90"
              onClick={handleSubmit}
              disabled={isPending}
            >
              <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-light-themegraywhite text-xl text-center tracking-[0] leading-[24.0px] whitespace-nowrap">
                   {isPending ? "Ugradylýar..." : t('form.submit')}
              </span>
            </Button>
         
            {isSuccess && <p className="text-green-600">{t('form.submitted')}</p>}
            {isError && <p className="text-red-600">{t('form.submit')}</p>}
          </div>
        </div>

        <div ref={illustrationRef} className="w-[693px] flex-shrink-0">
          <div className="">
            <img src={image} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};