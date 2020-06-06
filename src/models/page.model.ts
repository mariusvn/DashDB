
export interface DataModel {
    name: string;
    path: string;
    type: 'boolean' | 'number' | 'string';
    keysAreProperties?: boolean;
}

export default interface Page {
    name: string;
    model: DataModel[];
    slug: string;
    main: number;
}
