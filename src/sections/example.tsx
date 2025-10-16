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
    <footer className="flex items-start justify-center gap-20 pt-[60px] pb-6 px-4 lg:px-20 xl:px-32 2xl:px-[150px] w-full bg-[#112d80]">
      <div className="flex flex-col items-center gap-[60px] flex-1 w-full">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-start lg:justify-between gap-10 w-full">
          {/* Logo Section - Mobile: Centered, Desktop: Left aligned */}
          <div className="inline-flex flex-col items-center lg:items-start justify-center gap-4 w-full lg:w-auto">
            <img
              className="w-20 h-20 lg:w-[120px] lg:h-[120px] object-cover"
              alt="Logo"
              src={logo}
            />
            <div className="text-gray-white text-xl lg:text-[34px] tracking-tight [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-center lg:text-left lg:whitespace-nowrap">
              {t('brand')}
            </div>
          </div>

          {/* Mobile: Vertical Stack - Desktop: Horizontal */}
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-12 w-full lg:w-auto lg:flex-1">
            {/* Contact Section */}
            <div className="inline-flex flex-col items-start gap-4 w-full lg:w-auto lg:flex-1">
              <div className="text-gray-white text-xl lg:text-[34px] tracking-tight [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold whitespace-nowrap">
                {t('navigation.contact')}
              </div>
              <div className="inline-flex flex-col items-start gap-2">
                {contactItems.map((item, index) => (
                  <div key={index} className="inline-flex items-center gap-3 lg:gap-4">
                    <item.icon className="w-6 h-6 lg:w-8 lg:h-8 text-gray-white flex-shrink-0" />
                    <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-gray-white text-sm lg:text-xl xl:text-2xl tracking-tight leading-relaxed break-words">
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About Section */}
            <div className="inline-flex flex-col items-start gap-4 w-full lg:w-auto lg:flex-1">
              <div className="font-semibold text-gray-white text-xl lg:text-[34px] tracking-tight [font-family:'Plus_Jakarta_Sans',Helvetica] whitespace-nowrap">
                {t('navigation.about')}
              </div>
              <div className="inline-flex flex-col items-start gap-2">
                <div 
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-gray-white text-sm lg:text-xl xl:text-2xl tracking-tight leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: t('centerName') }}
                />
              </div>
            </div>

            {/* Menu Section */}
            <div className="inline-flex flex-col items-start gap-4 w-full lg:w-auto">
              <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-gray-white text-xl lg:text-[34px] tracking-tight whitespace-nowrap">
                {t('menu.main')}
              </div>
              <nav className="inline-flex flex-col items-start gap-2">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleScroll(item.targetId)}
                    className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-gray-white text-sm lg:text-xl xl:text-2xl tracking-tight leading-relaxed cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-gray-white text-sm lg:text-xl xl:text-2xl tracking-tight leading-relaxed text-center lg:text-left w-full whitespace-nowrap">
          2025ý. {t('centerName2')}
        </p>
      </div>
    </footer>
  );
};