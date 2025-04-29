import Migration from "@services/migration";
export interface IDemo {
    id?: string;
    demo: string;
    created_at?:string;
    updated_at?:string;
}
export interface IClassDemo {
    migration: Migration;
    create(body: IDemo): Promise<any[]>;
    update(id: string, body: IDemo): Promise<any[]>;
    read(): Promise<IDemo[]>;
    readOne(id: string): Promise<IDemo[]>;
    delete(id: string): Promise<any[]>;
}
