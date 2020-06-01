
interface DataModel {
    name: string;
    path: string;
    type: 'boolean' | 'number' | 'string';
}

export default interface Page {
    name: string;
    model: DataModel[];
    slug: string;
}
