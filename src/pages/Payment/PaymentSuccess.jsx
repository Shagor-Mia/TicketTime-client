import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useSecureAxios from "../../hooks/useSecureAxios";

const PaymentSuccess = () => {
  const axiosSecure = useSecureAxios();
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState(null);

  const sessionId = searchParams.get("session_id");
  const bookingId = searchParams.get("bookingId");

  useEffect(() => {
    if (sessionId && bookingId) {
      axiosSecure
        .patch(
          `/payment-success?session_id=${sessionId}&bookingId=${bookingId}`
        )
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            // trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, bookingId, axiosSecure]);

  if (!paymentInfo) return <p>Loading payment info...</p>;

  return (
    <div className="py-10 mx-auto max-w-6xl text-center">
      <h2 className="text-4xl font-bold text-green-600">
        Payment Successful ✅
      </h2>
      <p className="mt-4">Transaction ID: {paymentInfo.transactionId}</p>
      {/* <p>Tracking ID: {paymentInfo.trackingId}</p> */}
    </div>
  );
};

export default PaymentSuccess;
