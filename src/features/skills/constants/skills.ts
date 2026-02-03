import Javascript from "../../../components/icons/Javascript.astro";
import Python from "../../../components/icons/Python.astro";
import Java from "../../../components/icons/Java.astro";
import Aws from "../../../components/icons/Aws.astro";
import CSharp from "../../../components/icons/CSharp.astro";
import Next from "../../../components/icons/Next.astro";
import Node from "../../../components/icons/Node.astro";
import Php from "../../../components/icons/Php.astro";
import PostgreSql from "../../../components/icons/PostgreSql.astro";
import Astr from "../../../components/icons/Astr.astro";
import AndroidStudio from "../../../components/icons/AndroidStudio.astro";
import Tailwind from "../../../components/icons/Tailwind.astro";
import GitHub from "../../../components/icons/GitHub.astro";
import React from "../../../components/icons/React.astro";

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
  { name: "PHP", category: "backend", icon: Php },
  { name: "Java", category: "backend", icon: Java },
  { name: "C#", category: "backend", icon: CSharp },
  { name: "PostgreSQL", category: "backend", icon: PostgreSql },
  
  // Others
  { name: "AWS", category: "other", icon: Aws },
  { name: "Android Studio", category: "other", icon: AndroidStudio },
  { name: "GitHub", category: "other", icon: GitHub },
] as const;

export type SkillCategory = "frontend" | "backend" | "other";
