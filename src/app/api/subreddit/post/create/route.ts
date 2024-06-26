import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { postsValidator } from "@/lib/validators/posts";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("unAuthorized", { status: 401 });
    }
    const body = await req.json();
    const { content, subredditId, title } = postsValidator.parse(body);
    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    });
    const subreddit = await db.subreddit.findUnique({
      where: {
        id: subredditId,
      },
    });
    if (!subscriptionExists) {
      return new Response("Subscribe to the community to create the post", {
        status: 400,
      });
    }
    await db.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
        subredditId,
      },
    });

    return new Response("Successfully created");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid POST request data", { status: 422 });
    }
    return new Response("something went wrong", { status: 500 });
  }
}
