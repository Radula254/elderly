import Image from 'next/image';
import featureImg from '/public/pie.png';
import sellingHomesImg from '/public/home3.webp';
import relocationServicesImg from '/public/feature3.webp';

export default function FeaturesPage() {
  return (
    <div className="bg-gradient-to-r from-green-100 to-blue-200" id='features'>
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold  px-8 py-4 inline-block">
          Features
        </h1>
      </header>
      <main className="px-4 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src={featureImg}
              alt="Feature Image"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">01 FEATURE</h2>
              <p className="text-gray-700">Short description</p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src={sellingHomesImg}
              alt="Selling Homes Image"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">02 SELLING HOMES</h2>
              <p className="text-gray-700">
                Are you thinking of selling your home? Let us help you.
              </p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src={relocationServicesImg}
              alt="Relocation Services Image"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">03 RELOCATION SERVICES</h2>
              <p className="text-gray-700">
                Got a new job and relocating to a new place? We can help.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
