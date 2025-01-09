import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ValidationService {
    constructor(private readonly prisma: PrismaService) { }

    // check exists 
    async isExists<T>(
        entity: string,
        uniqueField: keyof T,
        dto: T,
        // additionalChecks?: (dto: T) => boolean,
    ): Promise<void> {
        if (!dto || !dto[uniqueField]) {
            throw new BadRequestException(
                `Field "${String(uniqueField)}" is required in the DTO.`,
            );
        }

        const valueToCheck = dto[uniqueField];

        // if (additionalChecks && !additionalChecks(dto)) {
        //     throw new BadRequestException('Additional validation checks failed.');
        // }

        const count = await this.prisma[entity].count({
            where: { [uniqueField]: valueToCheck },
        });

        if (!count) {
            throw new BadRequestException(
                `${entity} with "${String(uniqueField)}: ${valueToCheck}" does not exist.`,
            );
        }
    }
}
