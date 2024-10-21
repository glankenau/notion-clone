export async function validateUserAndDocument(ctx, args) {
  // Authentication
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not authenticated");
  }

  const userId = identity.subject;

  // Fetch the document
  const existingDocument = await ctx.db.get(args.id);
  if (!existingDocument) {
    throw new Error("Not found");
  }

  // Authorization
  if (existingDocument.userId !== userId) {
    throw new Error("Unauthorized");
  }

  return { userId, existingDocument };
}

export async function validateUser(ctx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not authenticated");
  }

  const userId = identity.subject;

  return userId;
}
