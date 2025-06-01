import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect Style
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Discover the latest trends and express yourself with M3 Outfit
            </p>
            <Link
              to="/products"
              className="btn bg-white text-primary hover:bg-opacity-90 px-8 py-3 text-lg"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Men', 'Women', 'Kids'].map((category) => (
              <div
                key={category}
                className="relative rounded-lg overflow-hidden group cursor-pointer"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  {/* Placeholder for category image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white">{category}</h3>
                    <p className="text-white/80">Shop Now →</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Your AI Fashion Assistant</h2>
            <p className="text-lg text-gray-600 mb-8">
              Get personalized fashion advice and recommendations powered by Gemini AI
            </p>
            <button className="btn btn-primary">
              Chat with AI Assistant
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 