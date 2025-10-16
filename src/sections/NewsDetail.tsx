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
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] space-y-4">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-4xl">📰</span>
        </div>
        <p className="text-xl text-gray-500 font-medium">Habar tapylmady</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
        <div className="max-w-5xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/')}
            className="group inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <div className="p-2 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
              <ArrowLeftIcon className="w-5 h-5" />
            </div>
            <span className="font-semibold">Baş sahypa</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        {/* Category & Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          {newsItem.category && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
              {newsItem.category}
            </span>
          )}
          {newsItem.date && (
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4" />
              <span>{newsItem.date}</span>
            </div>
          )}
          {newsItem.author && (
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 bg-gray-300 rounded-full" />
              <span>{newsItem.author}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight [font-family:'Plus_Jakarta_Sans',Helvetica]"
        >
          {newsItem.title}
        </motion.h1>

        {/* Featured Image */}
        {newsItem.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl shadow-2xl aspect-video bg-gray-200"
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
          className="prose prose-lg max-w-none"
        >
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed [font-family:'Plus_Jakarta_Sans',Helvetica] whitespace-pre-wrap">
            {newsItem.description}
          </p>
        </motion.div>

        {/* Related News Section */}
        {relatedNews && relatedNews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-12 border-t border-gray-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Başga habarlar</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNews.map((news) => (
                <Link
                  key={news.id}
                  to={`/news/${news.id}`}
                  className="group block"
                >
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                      {news.image ? (
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <span className="text-6xl">📰</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 space-y-2">
                      <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {news.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {news.description}
                      </p>
                      {news.date && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <CalendarIcon className="w-3 h-3" />
                          <span>{news.date}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-blue-600 font-medium text-sm pt-2">
                        <span>Doly oka</span>
                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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