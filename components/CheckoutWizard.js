import React from 'react';

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="mb-5 flex flex-wrap">
      {[
        'Checkout Process',
        'Shipping Address',
        'Payment Method',
        'Place Order',
      ].map((step, index) => (
        <div
          key={step}
          className={`flex-1 border-b-2 text-center ${
            index <= activeStep
              ? 'border-green-400 text-green-500'
              : 'border-neutral-500 text-neutral-600'
          }
            `}
        >
          {step}
        </div>
      ))}
    </div>
  );
}
