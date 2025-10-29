import React from 'react';
import Head from 'next/head';
import Button from '../components/common/Button';
import { APP_CONFIG } from '../constants';

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>{APP_CONFIG.name} - Home</title>
        <meta name="description" content={APP_CONFIG.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {APP_CONFIG.name}
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              {APP_CONFIG.description}
            </p>
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 border-white"
            >
              Explore Listings
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold mb-2">Unique Properties</h3>
                <p className="text-gray-600">
                  Discover one-of-a-kind places to stay around the world
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="text-xl font-semibold mb-2">Trusted Reviews</h3>
                <p className="text-gray-600">
                  Read verified reviews from real guests
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
                <p className="text-gray-600">
                  Find great deals on amazing properties
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
