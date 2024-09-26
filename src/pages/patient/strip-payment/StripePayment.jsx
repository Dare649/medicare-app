import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import { useIntentContext } from "../../../context/IntentContext";
import { axiosClient } from "../../../axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaRegCreditCard, FaArrowLeftLong  } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";

// Load Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_MEDICARE_APP_STRIPE_KEY);

const StripeForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { intentData } = useIntentContext(); // Getting intentData from context
    console.log(intentData);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        try {
            setLoading(true);

            if (!intentData || !intentData.paymentIntent) {
                throw new Error("Client secret is missing. Please check your backend response.");
            }

            const clientSecret = intentData.paymentIntent;

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                },
            });

            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }

            // Check if the payment succeeded
            if (paymentIntent && paymentIntent.status === 'succeeded') {
                // The payment was successful

                // Calculate the amount by dividing by 100 and ensure it's a number
                const amountReceived = paymentIntent.amount;
                const amountInCurrency = amountReceived ? Number(amountReceived) / 100 : 0;

                // Proceed with further actions, e.g., making a deposit
                const depositData = {
                    amount: amountInCurrency, // Amount divided by 100
                    customer_id: intentData.customer,
                    status: paymentIntent.status, // Use the status from paymentIntent
                    payment_method_id: paymentIntent.payment_method,
                };

                const response = await axiosClient.post("/api/patient/wallet/make_deposit", depositData);

                if (response.data.status === 1) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Deposit successful!" || response?.data?.message,
                    }).then(() => {
                        navigate("/patient-transactions");
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: response?.data?.message,
                    }).then(() => {
                        navigate("/stripe-payment");
                    });
                }

            } else {
                // Handle unsuccessful payment
                setError("Payment failed. Please try again.");
            }

            setLoading(false);
        } catch (err) {
            setError(err.message || "An error occurred. Please try again.");
            setLoading(false);
        }
    };

    return (
        <section className='w-full lg:p-10 sm:p-2 '>
            <div className="lg:p-10 sm:p-2 lg:mt-40 sm:20 bg-white rounded-lg w-full h-full">
                <h2 className="lg:text-2xl sm:text-lg font-bold text-center">
                    Complete Your Payment
                </h2>
                {error && (
                    <div className="text-red-600 text-center font-semibold mb-2">
                        {error}
                    </div>
                )}
                <form className="max-w-lg m-auto p-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <div className="relative flex items-center justify-start border-2 border-gray-300 rounded-md mb-4 p-3">
                            <FaRegCreditCard className="absolute top-2 left-2 text-gray-600" size={30} />
                            <CardNumberElement
                                className="w-full ml-8 text-base font-medium"
                                options={{
                                    style: {
                                        base: {
                                            fontSize: "16px",
                                            color: "#424770",
                                            letterSpacing: "0.025em",
                                            fontFamily: "Source Code Pro, monospace",
                                            "::placeholder": {
                                                color: "#aab7c4",
                                            },
                                        },
                                        invalid: {
                                            color: "#9e2146",
                                        },
                                    },
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center justify-start border-2 border-gray-300 rounded-md p-3">
                                <CardExpiryElement
                                    className="w-full ml-2 text-base font-medium"
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: "16px",
                                                color: "#424770",
                                                letterSpacing: "0.025em",
                                                fontFamily: "Source Code Pro, monospace",
                                                "::placeholder": {
                                                    color: "#aab7c4",
                                                },
                                            },
                                            invalid: {
                                                color: "#9e2146",
                                            },
                                        },
                                    }}
                                />
                            </div>
                            <div className="flex items-center justify-start border-2 border-gray-300 rounded-md p-3">
                                <CardCvcElement
                                    className="w-full ml-2 text-base font-medium"
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: "16px",
                                                color: "#424770",
                                                letterSpacing: "0.025em",
                                                fontFamily: "Source Code Pro, monospace",
                                                "::placeholder": {
                                                    color: "#aab7c4",
                                                },
                                            },
                                            invalid: {
                                                color: "#9e2146",
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>

                        <button
                            className="w-full p-3 text-white bg-primary-100 font-bold rounded-md mt-4"
                            type="submit"
                            disabled={!stripe || loading}
                        >
                            {loading ? "Processing..." : "Pay Now"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

const StripePayment = () => {
    return (
        <Elements stripe={stripePromise}>
            <StripeForm />
        </Elements>
    );
};

export default StripePayment;
