import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import React from "react";
import logo from '../../public/logo 1.svg'
import { useTranslation } from "react-i18next";

const contactItems = [
  {
    icon: MailIcon,
    text: "oguz.scitech.center@gmail.com",
  },
  {
    icon: MapPinIcon,
    text: "Aşgabat şäheri, Köşi köçesi, 100-nji jaý",
  },
  {
    icon: PhoneIcon,
    text: "+99312391600",
  },
];

export const FooterSection = () => {
  const { t } = useTranslation();
  
  const menuItems = [
    { label: t('navigation.main'), targetId: "hero" },
    { label: t('navigation.news'), targetId: "news" },
    { label: t('navigation.about'), targetId: "biz-barada" },
    { label: t('navigation.departments'), targetId: "bolumler" },
  ];

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="flex items-start justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 pt-8 sm:pt-10 md:pt-12 lg:pt-[60px] pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-[150px] w-full bg-[#112d80]">
      <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12 lg:gap-[60px] flex-1 w-full">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 sm:gap-10 md:gap-12 lg:gap-8 xl:gap-12 w-full">
          {/* Logo Section */}
          <div className="inline-flex flex-col items-center justify-center gap-3 sm:gap-4 w-full lg:w-auto">
            <img
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-[120px] lg:h-[120px] object-cover"
              alt="Logo"
              src={logo}
            />
            <div className="text-gray-white text-xl sm:text-2xl md:text-3xl lg:text-[34px] tracking-tight [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-center lg:whitespace-nowrap">
              {t('brand')}
            </div>
          </div>

          {/* About Section */}
          <div className="inline-flex flex-col items-center lg:items-start gap-3 sm:gap-4 w-full lg:w-auto lg:flex-1">
            <div className="font-semibold text-gray-white text-xl sm:text-2xl md:text-3xl lg:text-[34px] tracking-tight [font-family:'Plus_Jakarta_Sans',Helvetica] text-center lg:text-left lg:whitespace-nowrap">
              {t('navigation.about')}
            </div>
            <div className="inline-flex flex-col items-center lg:items-start gap-2">
              <div 
                className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-gray-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-tight leading-relaxed text-center lg:text-left"
                dangerouslySetInnerHTML={{ __html: t('centerName') }}
              />
            </div>
          </div>

          {/* Contact Section */}
          <div className="inline-flex flex-col items-center lg:items-start gap-3 sm:gap-4 w-full lg:w-auto lg:flex-1">
            <div className="text-gray-white text-xl sm:text-2xl md:text-3xl lg:text-[34px] tracking-tight [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-center lg:text-left lg:whitespace-nowrap">
              {t('navigation.contact')}
            </div>
            <div className="inline-flex flex-col items-center lg:items-start gap-2 sm:gap-3">
              {contactItems.map((item, index) => (
                <div key={index} className="inline-flex items-center gap-3 sm:gap-4">
                  <item.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-white flex-shrink-0" />
                  <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-gray-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl tracking-tight leading-relaxed break-words text-center lg:text-left">
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Menu Section */}
          <div className="inline-flex flex-col items-center lg:items-start gap-3 sm:gap-4 w-full lg:w-auto">
            <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-gray-white text-xl sm:text-2xl md:text-3xl lg:text-[34px] tracking-tight text-center lg:text-left lg:whitespace-nowrap">
              {t('menu.main')}
            </div>
            <nav className="inline-flex flex-col items-center lg:items-start gap-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleScroll(item.targetId)}
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-gray-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-tight leading-relaxed cursor-pointer hover:opacity-80 transition-opacity text-center lg:text-left"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-gray-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-tight leading-relaxed text-center w-full">
          2025ý. {t('centerName2')}
        </div>
      </div>
    </footer>
  );
};