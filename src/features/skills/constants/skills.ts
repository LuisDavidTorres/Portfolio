import Javascript from "../../../shared/components/icons/Javascript.astro";
import Python from "../../../shared/components/icons/Python.astro";
import Java from "../../../shared/components/icons/Java.astro";
import Aws from "../../../shared/components/icons/Aws.astro";
import CSharp from "../../../shared/components/icons/CSharp.astro";
import Next from "../../../shared/components/icons/Next.astro";
import Node from "../../../shared/components/icons/Node.astro";
import PostgreSql from "../../../shared/components/icons/PostgreSql.astro";
import Astr from "../../../shared/components/icons/Astr.astro";
import AndroidStudio from "../../../shared/components/icons/AndroidStudio.astro";
import Tailwind from "../../../shared/components/icons/Tailwind.astro";
import GitHub from "../../../shared/components/icons/GitHub.astro";
import React from "../../../shared/components/icons/React.astro";

export const SKILLS = [
  // Frontend
  { name: "JavaScript", category: "frontend", icon: Javascript },
  { name: "React", category: "frontend", icon: React },
  { name: "Next.js", category: "frontend", icon: Next },
  { name: "Astro", category: "frontend", icon: Astr },
  { name: "Tailwind CSS", category: "frontend", icon: Tailwind },
  
  // Backend
  { name: "Node.js", category: "backend", icon: Node },
  { name: "Python", category: "backend", icon: Python },
  { name: "Java", category: "backend", icon: Java },
  { name: "C#", category: "backend", icon: CSharp },
  { name: "PostgreSQL", category: "backend", icon: PostgreSql },
  
  // Others
  { name: "AWS", category: "other", icon: Aws },
  { name: "Android Studio", category: "other", icon: AndroidStudio },
  { name: "GitHub", category: "other", icon: GitHub },
] as const;

export type SkillCategory = "frontend" | "backend" | "other";
