import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, NewspaperIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../components/button";
import { Card, CardContent } from "../components/card";
import { useNews } from "../hooks/useNews";
import { Link } from "react-router-dom";

export const AllNewsPage = () => {
  const { data } = useNews();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Pagination hesaplamaları
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = data?.slice(startIndex, endIndex) || [];

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* MODERN HEADER */}
      <div className="w-full px-0 sticky top-0 z-10">
        <div className="w-full h-[220px] bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-400/80 backdrop-blur-lg shadow-lg flex flex-col justify-center">
          <div className="flex items-center justify-between px-[150px] pt-12">
            <div className="flex items-center gap-4">
              <NewspaperIcon className="w-12 h-12 text-white/80" />
              <h1 className="font-extrabold text-white text-[42px] sm:text-[56px] tracking-tight leading-tight [font-family:'Plus_Jakarta_Sans',Helvetica]">
                TÄZELIKLER
              </h1>
            </div>
            <Link to="/">
              <Button className="px-6 py-3 bg-white/80 text-blue-900 hover:bg-white hover:text-blue-800 font-semibold shadow-md rounded-lg transition duration-200">
                Baş sahypa
              </Button>
            </Link>
          </div>
          <div className="px-[150px] text-white/80 text-lg mt-4">
            <span className="bg-white/10 px-3 py-2 rounded-lg text-white/80 backdrop-blur-sm">
              Ähli täzelikler we habarlar
            </span>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="flex flex-col w-full px-[150px] py-16">
        <div className="grid grid-cols-1 gap-8 mb-12">
          {currentNews.map((item, index) => (
            <Card key={index} className="border-[#d6dce6] hover:shadow-xl transition-shadow duration-300">
              <CardContent className="flex items-center gap-6 p-6">
                {/* IMAGE OR EMOJI + BLUE GRADIENT */}
                <div className="w-[300px] h-[300px] rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-400 flex items-center justify-center">
                      <span className="text-7xl">📰</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-start gap-4 flex-1">
                  <h3 className="font-h5-semib font-[number:var(--h5-semib-font-weight)] text-dark-blue-gray text-[length:var(--h5-semib-font-size)] tracking-[var(--h5-semib-letter-spacing)] leading-[var(--h5-semib-line-height)] [font-style:var(--h5-semib-font-style)]">
                    {item.title}
                  </h3>
                  <div className="flex flex-col items-start justify-between flex-1 w-full">
                    <p className="text-dark-blue-gray text-[length:var(--big-font-size)] tracking-[var(--big-letter-spacing)] leading-[var(--big-line-height)] font-big font-[number:var(--big-font-weight)] [font-style:var(--big-font-style)] mb-4">
                      {item.description}
                    </p>
                    {item.date && (
                      <span className="text-gray-500 text-sm font-medium mb-4">
                        {item.date}
                      </span>
                    )}
                    <Link to={`/news/${item.id}`} className="inline-flex items-center gap-2 text-dark-blue-gray hover:text-blue-600 transition-colors">
                      <span className="font-semibold whitespace-nowrap">
                        Doly oka
                      </span>
                      <ArrowRightIcon className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 bg-lighter-gray rounded-lg hover:bg-light-gray disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "ghost"}
                  className={`h-12 w-12 rounded-lg font-semibold ${
                    currentPage === page
                      ? "bg-dark-blue-gray text-white"
                      : "bg-lighter-gray hover:bg-light-gray"
                  }`}
                  onClick={() => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 bg-dark-blue-gray text-white rounded-lg hover:bg-dark-blue-gray/90 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </Button>
          </div>
        )}

        {/* Page Info */}
        {data && data.length > 0 && (
          <div className="text-center mt-6 text-gray-600">
            Sahypa {currentPage} / {totalPages} • Jemi {data.length} täzelik
          </div>
        )}
      </div>
    </div>
  );
};