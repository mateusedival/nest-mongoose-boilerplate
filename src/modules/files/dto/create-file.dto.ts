import { OmitType } from '@nestjs/swagger';

import { FileDto } from './file.dto';

export class CreateFileDto extends OmitType(FileDto, ['_id']) {}
