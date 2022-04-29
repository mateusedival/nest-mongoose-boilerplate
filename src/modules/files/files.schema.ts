import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

type FileDocument = File & Document;

@Schema()
class File {
  @Prop({ required: false })
  key: string;

  @Prop({ required: false })
  url: string;

  @Prop({ required: false })
  mimetype: string;
}

const FileSchema = SchemaFactory.createForClass(File);

export { FileDocument, File, FileSchema };
