export interface IDownloadItemModelProperties {
  readonly name: string;
  readonly icon: string;
  readonly description: string;
  readonly fileUrl: string;
}

export class DownloadItemModel implements IDownloadItemModelProperties {
  readonly name!: string;
  readonly icon!: string;
  readonly description!: string;
  readonly fileUrl!: string;

  constructor(properties: IDownloadItemModelProperties) {
    Object.assign(this, properties);
  }
}
