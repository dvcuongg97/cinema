import { BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

// check unique
export function CheckUnique(entity: string, uniqueField: string) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const prisma: PrismaService = this.prisma;
            if (!prisma || !(prisma instanceof PrismaService)) {
                throw new Error('PrismaService is not properly injected into the class.');
            }

            const dto = args[0];
            if (!dto || !dto[uniqueField]) {
                throw new BadRequestException(`Field "${uniqueField}" is required in the DTO.`);
            }

            const uniqValue = dto[uniqueField];

            const entityExist = await prisma[entity].count({
                where: { [uniqueField]: uniqValue },
            });

            if (entityExist) {
                throw new BadRequestException(
                    `${entity} with ${uniqueField} "${uniqValue}" already exists.`,
                );
            }

            return originalMethod.apply(this, args);
        };
    };
}



// check exists
export function CheckExists(entity: string, uniqueField: string | number) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const prisma: PrismaService = this.prisma;

            const dto = args[0]; // Tham số đầu tiên là `dto`
            const uniqValue = dto[uniqueField];

            // Kiểm tra xem thực thể đã tồn tại hay chưa
            const entityExist = await prisma[entity].count({
                where: { [uniqueField]: uniqValue },
            });

            if (!entityExist) {
                throw new BadRequestException(`${entity} with ${uniqueField} "${uniqValue}" does not exists`);
            }

            // Gọi phương thức gốc
            return await originalMethod.apply(this, args);
        };
    };
}