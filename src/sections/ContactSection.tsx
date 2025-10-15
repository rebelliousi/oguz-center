import { useEffect, useRef, useState } from "react";
import { Button } from "../components/button";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSubmitForm, type FormDataType } from "../hooks/useSendForm";
import { useVerifyEmail } from "../hooks/useVerifyEmail";

import image from "../../public/email.svg";
import { useTranslation } from "react-i18next";
import { Modal } from "../components/modal";
import { FormField } from "../components/FormField";

gsap.registerPlugin(ScrollTrigger);

export const ContactSection = () => {
  const { t } = useTranslation();
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const { mutate, isPending } = useSubmitForm();
  const {
    mutate: verifyMutateEmail,
    isPending: isVerifying,
    isSuccess: verifySuccess,
  
  } = useVerifyEmail();

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
    mutate(formData, {
      onSuccess: () => setShowVerification(true),
    });
  };

  return (
    <section
      id="habarlasmak"
      ref={sectionRef}
      className="flex items-start gap-20 p-[150px] w-full bg-gray-white"
    >
      <Modal
        isOpen={showVerification}
        onclose={() => setShowVerification(false)}
      >
        <div className="flex flex-col gap-3">
          {/* <p className="text-green-600 text-center">{t('form.submitted')}</p> */}
          <h3 className="w-full font-semibold">
            {t("form.enterVerificationCode")}
          </h3>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="border p-2 rounded w-full focus:outline-none"
            placeholder={t("form.verificationCode")}
          />
          <Button
            onClick={() =>
              verifyMutateEmail({
                gmail: formData.gmail,
                verification_code: verificationCode,
              })
            }
            disabled={isVerifying}
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isVerifying ? "Verifying..." : t("form.verifyEmail")}
          </Button>
          {verifySuccess && (
            <p className="text-green-600 text-center">
              {t("form.emailVerified")}
            </p>
          )}
        </div>
      </Modal>
      <div className="flex items-start gap-20 flex-1">
        <div ref={formRef} className="flex flex-col items-start gap-8 flex-1">
          <h2 className="w-fit [font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-dark-blue-gray text-[44px] text-center tracking-[0] leading-[52.8px] whitespace-nowrap">
            {t("innovation")}
          </h2>

          <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-dark-blue-gray text-2xl tracking-[-0.48px] leading-[38.4px]">
            {t("contactText")}
          </p>

          <div className="flex flex-col items-end justify-center gap-8 w-full">
            <div className="flex flex-col items-start gap-4 w-full">
              <div className="flex items-start gap-4 w-full">
                <FormField
                  label={t("form.name")}
                  value={formData.full_name}
                  onChange={(val) => handleChange("full_name", val)}
                />
                <FormField
                  label={t("form.phone")}
                  value={formData.phone_number}
                  onChange={(val) => handleChange("phone_number", val)}
                />
              </div>

              <div className="flex items-start gap-4 w-full">
                <FormField
                  label={t("form.email")}
                  value={formData.gmail}
                  onChange={(val) => handleChange("gmail", val)}
                />
                <FormField
                  label={t("form.file")}
                  type="file"
                  value={formData.file ?? undefined}
                  onChange={(val) => handleChange("file", val)}
                />
              </div>

              <div className="flex items-start gap-4 w-full">
                <FormField
                  label={t("form.about")}
                  type="textarea"
                  value={formData.about_you}
                  onChange={(val) => handleChange("about_you", val)}
                />
                <FormField
                  label={t("form.ideaDescription")}
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
                {isPending ? "Ugradylýar..." : t("form.submit")}
              </span>
            </Button>
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
