import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'post_data' })
export class FeedData {
  @Prop()
  post_id: string;

  @Prop()
  client_id: string;

  @Prop()
  worker_id: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  worker_type: string;

  @Prop()
  media_url: string;

  @Prop()
  location: string;

  @Prop()
  created_date: string;

  @Prop()
  status: string;
}

export const FeedDataSchema = SchemaFactory.createForClass(FeedData);
