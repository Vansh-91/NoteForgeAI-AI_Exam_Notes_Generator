
import Stripe from "stripe";
import UserModel from "../Models/userModel.js"; // Adjust path/name to yours

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log("Stripe key loaded:", !!process.env.STRIPE_SECRET_KEY);
const CREDIT_MAP = {
    100: 50,
    200: 120,
    500: 300,
};

export const createCreditsOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const amount = Number(req.body.amount);

        if (!CREDIT_MAP[amount]) {
            return res.status(400).json({
                message: "Invalid credit plan",
            });
        }

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/payment-failed`,

            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: `${CREDIT_MAP[amount]} Credits`,
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                },
            ],

            metadata: {
                userId: String(userId),
                credits: String(CREDIT_MAP[amount]),
            },
        });

        return res.status(200).json({
            url: session.url,
        });

    } catch (error) {

        console.error("Stripe checkout error:", error.message);
        return res.status(500).json({
            message: "Unable to create Stripe checkout session",
        });
    }
};


export const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    // Verify that the request genuinely came from Stripe
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.error("Webhook signature error:", error.message);
        return res.status(400).send("Webhook Error");
    }

    try {
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            // Only grant credits after confirmed payment
            if (session.payment_status !== "paid") {
                return res.json({ received: true });
            }

            const userId = session.metadata?.userId;
            const creditsToAdd = Number(session.metadata?.credits);

            if (!userId || !Number.isInteger(creditsToAdd) || creditsToAdd <= 0) {
                console.error("Invalid Stripe session metadata:", session.id);
                return res.status(400).json({
                    message: "Invalid metadata",
                });
            }

            // Atomic update: do not credit the same session twice
            const user = await UserModel.findOneAndUpdate(
                {
                    _id: userId,
                    creditedSessions: { $ne: session.id },
                },
                {
                    $inc: { credits: creditsToAdd },
                    $set: { isCreditAvailable: true },
                    $addToSet: { creditedSessions: session.id },
                },
                { new: true }
            );

            if (!user) {
                // Could be a duplicate event or an invalid user ID.
                console.log("Session already credited or user not found:", session.id);
            } else {
                console.log(`${creditsToAdd} credits added to user ${userId}`);
            }
        }

        return res.json({ received: true });

    } catch (error) {
        console.error("Webhook processing error:", error);
        return res.status(500).json({
            message: "Webhook processing failed",
        });
    }
};
