// src/types/types.ts
export type ThemeType = {
    primary: string;
    gradient: [string, string, ...string[]]; // Garante pelo menos dois elementos
  };
  
  export type Themes = {
    Policial: ThemeType;
    Cidadão: ThemeType;
  };
  
  export type UserType = keyof Themes;