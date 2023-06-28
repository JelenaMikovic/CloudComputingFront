export interface FilesResponse{
    files: File[]
}

export interface File{
    content: string,
    metadata: Metadata,
    icon?: string
}

export interface Metadata{
    size: number,
    file: string,
    caption: string,
    lastModified: number,
    sharedWith: string[],
    tags: string[],
    type: string
}

export interface DownloadFile {
  url: string;
}
