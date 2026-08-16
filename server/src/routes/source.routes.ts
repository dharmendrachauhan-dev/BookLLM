import { Router } from "express";
import { asyncHandler } from "../utils/async-handler";

export const sourceRoutes = Router({ mergeParams: true });

// sourceRoutes.get("/", asyncHandler(listSources));
// sourceRoutes.post("/", asyncHandler(createSource));