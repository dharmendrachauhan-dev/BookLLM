import type { Express } from "express";
import { workspaceRoutes } from "./workspace.routes.js";
import { sourceRoutes } from "./source.routes.js";

export function registerRoutes(app:Express):void{
    app.use("/api/workspaces", workspaceRoutes);
    workspaceRoutes.use("/:workspaceId/sources", sourceRoutes);
}
