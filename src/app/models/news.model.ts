export interface INewsModelProperties {
  readonly project: string;
  readonly category: string;
  readonly news: string;
}

export class NewsModel implements INewsModelProperties {
  readonly project!: string;
  readonly category!: string;
  readonly news!: string;

  constructor(properties: INewsModelProperties) {
    Object.assign(this, properties);
  }
}
