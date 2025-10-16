import { useParams, useNavigate } from "react-router-dom";
import { useNews } from "../hooks/useNews";
import { ArrowLeftIcon, CalendarIcon, ArrowRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";

interface NewsItem {
  id: number | string;
  title: string;
  description: string;
  image?: string;
  date?: string;
  author?: string;
  category?: string;
}

export const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useNews();
  const navigate = useNavigate();

  // ID değiştiğinde sayfayı en üste kaydır
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const newsItem: NewsItem | undefined = data?.find(
    (item: NewsItem) => item.id.toString() === id
  );

  // Mevcut haberi hariç tut, rastgele 3 haber seç
  const relatedNews = data
    ?.filter((item) => item.id.toString() !== id)
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] px-4">
        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] space-y-4 px-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-3xl sm:text-4xl">📰</span>
        </div>
        <p className="text-lg sm:text-xl text-gray-500 font-medium text-center">
          Habar tapylmady
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2.5 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          Baş sahypa
        </button>
      </div>
    );
  }

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Header with Back Button */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <button
            onClick={() => navigate('/')}
            className="group inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <div className="p-1.5 sm:p-2 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
              <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="font-semibold text-sm sm:text-base">Baş sahypa</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12 space-y-6 sm:space-y-8">
        {/* Category & Meta Info */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-gray-600">
          {newsItem.category && (
            <span className="px-2.5 py-1 sm:px-3 sm:py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
              {newsItem.category}
            </span>
          )}
          {newsItem.date && (
            <div className="flex items-center gap-1 sm:gap-1.5">
              <CalendarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{newsItem.date}</span>
            </div>
          )}
          {newsItem.author && (
            <div className="flex items-center gap-1 sm:gap-1.5">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-300 rounded-full" />
              <span>{newsItem.author}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight [font-family:'Plus_Jakarta_Sans',Helvetica]"
        >
          {newsItem.title}
        </motion.h1>

        {/* Featured Image */}
        {newsItem.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl aspect-video bg-gray-200"
          >
            <img
              src={newsItem.image}
              alt={newsItem.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-sm sm:prose-base md:prose-lg max-w-none"
        >
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed [font-family:'Plus_Jakarta_Sans',Helvetica] whitespace-pre-wrap">
            {newsItem.description}
          </p>
        </motion.div>

        {/* Related News Section */}
        {relatedNews && relatedNews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-8 sm:pt-10 md:pt-12 border-t border-gray-200"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Başga habarlar
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {relatedNews.map((news) => (
                <Link
                  key={news.id}
                  to={`/news/${news.id}`}
                  className="group block"
                >
                  <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                    <div className="relative h-40 sm:h-44 md:h-48 bg-gray-200 overflow-hidden">
                      {news.image ? (
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <span className="text-4xl sm:text-5xl md:text-6xl">📰</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {news.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                        {news.description}
                      </p>
                      {news.date && (
                        <div className="flex items-center gap-1 sm:gap-1.5 text-xs text-gray-500">
                          <CalendarIcon className="w-3 h-3" />
                          <span>{news.date}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-blue-600 font-medium text-xs sm:text-sm pt-1 sm:pt-2">
                        <span>Doly oka</span>
                        <ArrowRightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};