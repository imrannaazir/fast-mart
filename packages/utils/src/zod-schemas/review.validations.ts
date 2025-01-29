import z from "zod";

export const postReviewValidator = z.object({
  message: z.string({ required_error: "Message is required." }),
  rating: z.number({ required_error: "Rating is required." }).min(1).max(5),
});

export const postReviewApiValidator = z.object({
  body: postReviewValidator,
});
