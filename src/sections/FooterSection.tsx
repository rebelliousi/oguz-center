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
    <footer className="flex items-start justify-center gap-20 pt-[60px] pb-10 px-[150px] w-full bg-[#112d80]">
      <div className="flex flex-col items-center gap-[60px] flex-1">
        <div className="flex items-start justify-between w-full">
          <div className="inline-flex flex-col items-center justify-center gap-4">
            <img
              className="w-[120px] h-[120px] object-cover"
              alt="Logo"
              src={logo}
            />
            <div className="text-gray-white text-[34px] tracking-[-0.68px] leading-[54.4px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold whitespace-nowrap">
              {t('brand')}
            </div>
          </div>

          <div className="inline-flex flex-col items-start gap-4">
            <div className="font-semibold text-gray-white text-[34px] tracking-[-0.68px] leading-[54.4px] [font-family:'Plus_Jakarta_Sans',Helvetica] whitespace-nowrap">
              {t('navigation.about')}
            </div>
            <div className="inline-flex flex-col items-start gap-2">
              <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-gray-white text-2xl tracking-[-0.48px] leading-[38.4px]"  dangerouslySetInnerHTML={{
    __html: t('centerName') 
  }}/>
               
            
            </div>
          </div>

          <div className="inline-flex flex-col items-start gap-4">
            <div className="text-gray-white text-[34px] tracking-[-0.68px] leading-[54.4px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold whitespace-nowrap">
              {t('navigation.contact')}
            </div>
            <div className="inline-flex flex-col items-start gap-2">
              {contactItems.map((item, index) => (
                <div key={index} className="inline-flex items-center gap-4">
                  <item.icon className="w-8 h-8 text-gray-white" />
                  <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-gray-white text-2xl tracking-[-0.48px] leading-[38.4px] whitespace-nowrap">
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="inline-flex flex-col items-start gap-4">
            <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-gray-white text-[34px] tracking-[-0.68px] leading-[54.4px] whitespace-nowrap">
              {t('menu.main')}
            </div>
            <div className="inline-flex flex-col items-start gap-2">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleScroll(item.targetId)}
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-gray-white text-2xl tracking-[-0.48px] leading-[38.4px] whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity"
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-gray-white text-2xl tracking-[-0.48px] leading-[38.4px] whitespace-nowrap">
          2025ý. {t('centerName2')}
        </div>
      </div>
    </footer>
  );
};
