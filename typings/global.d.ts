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
declare interface Student{
    "id": "1",
    "name": "1",
    "bDate": "2024-07-01T04:03:08",
    "age": null,
    "sexy": "1",
    "password": "1",
    "phone": "1",
    "did": "1",
    "gid": "01",
    "tid": "1",
    "role": 0,
    gname: "1",
}
declare type LeaveInfo={
    "id": 1,
    "applicantId": "3210621073",
    "type": "1",
    "reason": "1",
    "startTime": "2024-06-29T00:00:00",
    "endTime": "2024-07-02T00:00:00",
    "status": 2,
    "tid": "666666",
    "approvalTime_t": "2024-06-29T04:16:44.213497",
    "approvalTime_m": "2024-06-29T04:16:57.382308",
    "approvalComment_t": "123",
    "approvalComment_m": null
}
