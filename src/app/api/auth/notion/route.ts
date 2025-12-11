import { redirect } from "next/navigation";
import { notionAuth } from "@/lib/notion/auth";

export async function GET() {
    const url = notionAuth.getAuthorizationUrl();
    return redirect(url);
}
