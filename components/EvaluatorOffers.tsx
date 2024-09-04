export default function EvaluatorOffers() {
  const offers = [
    { name: 'CarBuyer A', offer: 12000 },
    { name: 'AutoTrader B', offer: 12300 },
    { name: 'VehicleMax C', offer: 11800 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Evaluator Offers</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {offers.map((offer, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold mb-2">{offer.name}</h3>
            <p className="text-lg text-dark-orange font-bold">${offer.offer.toLocaleString()}</p>
            <button className="mt-2 bg-dark-orange text-white font-bold py-1 px-3 rounded text-sm">
              View Offer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}