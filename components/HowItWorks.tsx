export default function HowItWorks() {
  const steps = [
    { title: 'Upload Photos', description: 'Take clear photos of your car from different angles.' },
    { title: 'AI Analysis', description: 'Our AI examines your car\'s condition and features.' },
    { title: 'Get Valuation', description: 'Receive an accurate estimate of your car\'s value.' },
  ];

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Get your car's value in three simple steps
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="bg-white text-gray-900 shadow-sm border border-dark-orange rounded-lg">
                <div className="flex flex-col items-center space-y-2 p-6">
                  <div className="flex items-center justify-center w-12 h-12 text-white bg-gradient-to-r from-dark-orange to-purple-600 rounded-full">
                    <span className="text-lg font-bold">{index + 1}</span>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}