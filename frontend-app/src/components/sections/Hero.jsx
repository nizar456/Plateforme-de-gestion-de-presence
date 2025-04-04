import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="pt-20 md:pt-24 relative min-h-[600px] h-[90vh] md:h-screen bg-gradient-to-b from-blue-100 to-blue-50 dark:from-gray-900 dark:to-gray-950">
      <div className="w-full h-full relative flex items-center justify-center">
        
        {/* Hero Content */}
        <div className="absolute inset-0 bg-[url('/assets/image.png')] bg-cover bg-center opacity-60"></div> {/* Image applied here */}
        
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Bienvenue à Notre Université
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-6 md:mb-8 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Façonner l'avenir par l'innovation, la recherche et l'excellence en
            éducation
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-[rgb(0,73,150)] hover:bg-[rgb(0,60,120)] text-white font-semibold py-3 px-6 rounded-md transition-colors">
              Postuler Maintenant
            </button>
            <button className="bg-transparent hover:bg-[rgb(0,73,150)/10] text-[rgb(0,73,150)] font-semibold py-3 px-6 border border-[rgb(0,73,150)] rounded-md transition-colors dark:hover:bg-gray-800">
              Visite Virtuelle
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mt-8 sm:mt-12 md:mt-16 max-w-4xl mx-auto px-2 sm:px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[{ label: "Étudiants", value: "25,000+" }, { label: "Programmes", value: "200+" }, { label: "Professeurs", value: "1,500+" }, { label: "Pays Représentés", value: "120+" }].map((stat, index) => (
              <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 sm:p-4 rounded-lg shadow-sm">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
