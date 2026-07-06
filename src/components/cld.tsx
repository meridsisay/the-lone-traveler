"use client";

// Explicit client boundary for next-cloudinary's components: importing
// CldImage directly inside a server component executes it during the server
// render (Turbopack resolves the package source, losing its own boundary).
export { CldImage } from "next-cloudinary";
