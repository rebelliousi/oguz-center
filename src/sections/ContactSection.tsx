import { useEffect, useRef, useState, useCallback } from "react";
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

// Constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
const VERIFICATION_SUCCESS_DELAY = 1000;

export const ContactSection = () => {
  const { t } = useTranslation();
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormDataType, string>>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const { mutate, isPending } = useSubmitForm();
  const {
    mutate: verifyMutateEmail,
    isPending: isVerifying,
    isSuccess: verifySuccess,
    isError,
    error
  } = useVerifyEmail();

  const [formData, setFormData] = useState<FormDataType>({
    full_name: "",
    gmail: "",
    about_you: "",
    phone_number: "",
    description: "",
    file: null,
  });

  // Animation effect
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

      const formChildren = formRef.current?.children;
      if (formChildren) {
        gsap.from(Array.from(formChildren), {
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
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Verification success handler
  useEffect(() => {
    if (verifySuccess) {
      const timer = setTimeout(() => {
        setShowVerification(false);
        setVerificationCode('');
        resetForm();
      }, VERIFICATION_SUCCESS_DELAY);
      return () => clearTimeout(timer);
    }
  }, [verifySuccess]);

  // Submit success handler
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  // Form reset function
  const resetForm = useCallback(() => {
    setFormData({
      full_name: '',
      gmail: '',
      about_you: '',
      phone_number: '',
      description: '',
      file: null
    });
    setFormErrors({});
  }, []);

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phone.length >= 10 && phoneRegex.test(phone);
  };

  // File validation
  const validateFile = (file: File | null): string | null => {
    if (!file) return null;
    
    if (file.size > MAX_FILE_SIZE) {
      return t("form.fileTooLarge") || "File size must be less than 10MB";
    }
    
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
      return t("form.invalidFileType") || "Invalid file type";
    }
    
    return null;
  };

  // Form validation
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof FormDataType, string>> = {};
    
    if (!formData.full_name.trim()) {
      errors.full_name = t("form.nameRequired") || "Name is required";
    }
    
    if (!formData.gmail.trim()) {
      errors.gmail = t("form.emailRequired") || "Email is required";
    } else if (!validateEmail(formData.gmail)) {
      errors.gmail = t("form.invalidEmail") || "Invalid email format";
    }
    
    if (!formData.phone_number.trim()) {
      errors.phone_number = t("form.phoneRequired") || "Phone is required";
    } else if (!validatePhone(formData.phone_number)) {
      errors.phone_number = t("form.invalidPhone") || "Invalid phone format";
    }
    
    if (!formData.about_you.trim()) {
      errors.about_you = t("form.aboutRequired") || "This field is required";
    }
    
    if (!formData.description.trim()) {
      errors.description = t("form.descriptionRequired") || "Description is required";
    }
    
    const fileError = validateFile(formData.file);
    if (fileError) {
      errors.file = fileError;
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form field change
  const handleChange = useCallback((field: keyof FormDataType, value: string | File) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [formErrors]);

  // Handle form submit
  const handleSubmit = useCallback(() => {
    if (!validateForm()) {
      return;
    }

    mutate(formData, {
      onSuccess: () => {
        setSubmitSuccess(true);
        setShowVerification(true);
      },
      onError: (error) => {
        console.error('Form submission error:', error);
        setFormErrors({
          ...formErrors,
          gmail: t("form.submissionError") || "Submission failed. Please try again."
        });
      }
    });
  }, [formData, mutate, t, formErrors]);

  // Handle verification
  const handleVerification = useCallback(() => {
    if (!verificationCode.trim()) {
      return;
    }

    verifyMutateEmail({
      gmail: formData.gmail,
      verification_code: verificationCode,
    });
  }, [verificationCode, formData.gmail, verifyMutateEmail]);

  // Handle modal close
  const handleCloseVerification = useCallback(() => {
    setShowVerification(false);
    setVerificationCode('');
  }, []);

  return (
    <section
      id="habarlasmak"
      ref={sectionRef}
      className="flex items-start gap-20 p-[150px] w-full bg-gray-white"
    >
      <Modal
        isOpen={showVerification}
        onclose={handleCloseVerification}
      >
        <div className="flex flex-col gap-3">
          <h3 className="w-full font-semibold">
            {t("form.enterVerificationCode")}
          </h3>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            onKeyDown={(e) => { 
              if (e.key === 'Enter' && !isVerifying && verificationCode.trim()) {
                handleVerification();
              }
            }}
            className="border p-2 rounded w-full focus:outline-none"
            placeholder={t("form.verificationCode")}
            aria-label={t("form.verificationCode")}
            disabled={isVerifying}
          />
          <Button
            onClick={handleVerification}
            disabled={isVerifying || !verificationCode.trim()}
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isVerifying ? "Verifying..." : t("form.verifyEmail")}
          </Button>
          {!isVerifying && verificationCode && isError && (
            <p className="text-red-500 text-center mt-2" role="alert">
              ❌ {error?.message || "Error verifying. Try again."}
            </p>
          )}
          {verifySuccess && (
            <p className="text-green-600 text-center" role="alert">
              ✅ Correct! Email verified.
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

          {submitSuccess && (
            <div className="w-full p-4 bg-green-100 border border-green-400 text-green-700 rounded" role="alert">
              ✅ {t("form.submitSuccess") || "Form submitted successfully! Please check your email for verification."}
            </div>
          )}

          <div className="flex flex-col items-end justify-center gap-8 w-full">
            <div className="flex flex-col items-start gap-4 w-full">
              <div className="flex items-start gap-4 w-full">
                <div className="flex-1">
                  <FormField
                    label={t("form.name")}
                    value={formData.full_name}
                    onChange={(val) => handleChange("full_name", val)}
                    aria-label={t("form.name")}
                  />
                  {formErrors.full_name && (
                    <p className="text-red-500 text-sm mt-1" role="alert">{formErrors.full_name}</p>
                  )}
                </div>
                <div className="flex-1">
                  <FormField
                    label={t("form.phone")}
                    value={formData.phone_number}
                    onChange={(val) => handleChange("phone_number", val)}
                    aria-label={t("form.phone")}
                  />
                  {formErrors.phone_number && (
                    <p className="text-red-500 text-sm mt-1" role="alert">{formErrors.phone_number}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4 w-full">
                <div className="flex-1">
                  <FormField
                    label={t("form.email")}
                    value={formData.gmail}
                    onChange={(val) => handleChange("gmail", val)}
                    aria-label={t("form.email")}
                  />
                  {formErrors.gmail && (
                    <p className="text-red-500 text-sm mt-1" role="alert">{formErrors.gmail}</p>
                  )}
                </div>
                <div className="flex-1">
                  <FormField
                    label={t("form.file")}
                    type="file"
                    value={formData.file ?? undefined}
                    onChange={(val) => handleChange("file", val)}
                    aria-label={t("form.file")}
                  />
                  {formErrors.file && (
                    <p className="text-red-500 text-sm mt-1" role="alert">{formErrors.file}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4 w-full">
                <div className="flex-1">
                  <FormField
                    label={t("form.about")}
                    type="textarea"
                    value={formData.about_you}
                    onChange={(val) => handleChange("about_you", val)}
                    aria-label={t("form.about")}
                  />
                  {formErrors.about_you && (
                    <p className="text-red-500 text-sm mt-1" role="alert">{formErrors.about_you}</p>
                  )}
                </div>
                <div className="flex-1">
                  <FormField
                    label={t("form.ideaDescription")}
                    type="textarea"
                    value={formData.description}
                    onChange={(val) => handleChange("description", val)}
                    aria-label={t("form.ideaDescription")}
                  />
                  {formErrors.description && (
                    <p className="text-red-500 text-sm mt-1" role="alert">{formErrors.description}</p>
                  )}
                </div>
              </div>
            </div>

            <Button
              className="h-auto p-6 w-full rounded-lg bg-blue-500 hover:bg-blue-600"
              onClick={handleSubmit}
              disabled={isPending}
              aria-label={t("form.submit")}
            >
              <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-light-themegraywhite text-xl text-center tracking-[0] leading-[24.0px] whitespace-nowrap">
                {isPending ? "Ugradylýar..." : t("form.submit")}
              </span>
            </Button>
          </div>
        </div>

        <div ref={illustrationRef} className="w-[693px] flex-shrink-0">
          <div className="">
            <img src={image} alt="Contact illustration" />
          </div>
        </div>
      </div>
    </section>
  );
};