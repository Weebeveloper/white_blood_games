export interface AppIconDefinition {
  readonly name: string;
  readonly path: string;
}

export const appIcons: readonly AppIconDefinition[] = [
  {
    name: 'fixit_icon',
    path: 'assets/svg/hammer.svg',
  },
  {
    name: 'download',
    path: 'assets/svg/download.svg',
  },
] as const;
