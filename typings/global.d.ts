// global.d.ts
import "three"
declare module "three"{
    declare interface BatchedMesh<T =number>{
        _options?: {
            aux?: T[] | undefined;
            get?: ((el: T) => number) | undefined;
            reversed?: boolean | undefined;
        },
        maxInstanceCount:number
    }
    declare interface  Camera{
        far:number
    }
}
