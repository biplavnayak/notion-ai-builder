import { Client } from "@notionhq/client";

const CLIENT_ID = process.env.NOTION_CLIENT_ID;
const CLIENT_SECRET = process.env.NOTION_CLIENT_SECRET;
const REDIRECT_URI = process.env.NOTION_REDIRECT_URI;

export const notionAuth = {
    getAuthorizationUrl: () => {
        const url = new URL("https://api.notion.com/v1/oauth/authorize");
        url.searchParams.set("client_id", CLIENT_ID!);
        url.searchParams.set("response_type", "code");
        url.searchParams.set("owner", "user");
        url.searchParams.set("redirect_uri", REDIRECT_URI!);
        return url.toString();
    },

    exchangeCodeForToken: async (code: string) => {
        const encoded = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

        const response = await fetch("https://api.notion.com/v1/oauth/token", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Basic ${encoded}`,
            },
            body: JSON.stringify({
                grant_type: "authorization_code",
                code,
                redirect_uri: REDIRECT_URI,
            }),
        });

        if (!response.ok) {
            throw new Error(`Notion OAuth failed: ${response.statusText}`);
        }

        return response.json();
    },
};
