export declare class CreateBranchDto {
    name: string;
    houseEdge?: number;
}
declare const UpdateBranchDto_base: import("@nestjs/common").Type<Partial<CreateBranchDto>>;
export declare class UpdateBranchDto extends UpdateBranchDto_base {
}
export {};
