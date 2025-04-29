import Migration from "@services/migration";
export interface IErrors {
    id?: string;
    demo: string;
    created_at?:string;
    updated_at?:string;
}
export interface IClassErrors {
    migration: Migration;
    create(body: IErrors): Promise<any[]>;
    update(id: string, body: IErrors): Promise<any[]>;
    read(): Promise<IErrors[]>;
    readOne(id: string): Promise<IErrors[]>;
    delete(id: string): Promise<any[]>;
}
