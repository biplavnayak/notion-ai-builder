import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = await req.json();

        if (!process.env.RAZORPAY_KEY_SECRET) {
            return NextResponse.json(
                { error: "Razorpay credentials not configured" },
                { status: 500 }
            );
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Payment is successful, update user to Pro
            if (userId) {
                const supabase = await createClient();

                await supabase
                    .from('users')
                    .update({
                        subscription_plan: 'pro',
                        subscription_status: 'active',
                        subscription_id: razorpay_payment_id,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', userId);
            }

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
        }
    } catch (error: any) {
        console.error("Razorpay Verify Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
