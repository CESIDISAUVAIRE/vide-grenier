// Déclarations de types locales pour GSAP (imports depuis gsap/dist).
// Le package @types/gsap ne couvre pas ScrollTrigger ni les chemins dist ;
// on déclare ici l'API minimale utilisée par le projet.

declare module 'gsap/dist/gsap.js' {
  export interface TweenInstance {
    kill(): void;
    [key: string]: unknown;
  }

  export interface TweenConfig {
    [key: string]: unknown;
  }

  export const gsap: {
    registerPlugin(...plugins: unknown[]): void;
    set(targets: unknown, vars: TweenConfig): void;
    to(targets: unknown, vars: TweenConfig): TweenInstance;
    fromTo(targets: unknown, from: TweenConfig, to: TweenConfig): TweenInstance;
    timeline(): TimelineInstance;
    [key: string]: unknown;
  };

  export interface TimelineInstance {
    fromTo(
      targets: unknown,
      from: TweenConfig,
      to: TweenConfig,
    ): TimelineInstance;
    to(targets: unknown, vars: TweenConfig): TimelineInstance;
    kill(): void;
    [key: string]: unknown;
  }

  export default gsap;
}

declare module 'gsap/dist/ScrollTrigger.js' {
  export interface ScrollTriggerInstance {
    progress: number;
    kill(): void;
    destroy(): void;
  }

  export interface ScrollTriggerConfig {
    trigger?: Element | string;
    start?: string;
    end?: string;
    scrub?: boolean;
    onUpdate?: (self: ScrollTriggerInstance) => void;
    onEnter?: (self: ScrollTriggerInstance) => void;
    onLeave?: (self: ScrollTriggerInstance) => void;
    toggleActions?: string;
    [key: string]: unknown;
  }

  export const ScrollTrigger: {
    create(config: ScrollTriggerConfig): ScrollTriggerInstance;
    update(force?: boolean): void;
    refresh(): void;
    killAll(): void;
  };

  export default ScrollTrigger;
}