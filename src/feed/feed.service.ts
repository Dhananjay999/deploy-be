import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeedData } from './db/feed.schema';
import { FeedPostDto } from './db/feed.dto';
import { IdGeneratorService } from 'src/services/id-generator/id-generator.service';

@Injectable()
export class FeedService {
  constructor(
    @InjectModel(FeedData.name) private postModel: Model<FeedData>,
    private idGenerator: IdGeneratorService,
  ) {}
  /**
   * Function used to return feed data.
   */
  public getAllPost() {
    return this.postModel.find();
  }

  /**
   * Function used create new feed post.
   */
  async createNewPost(FeedPostData: FeedPostDto) {
    const data = new this.postModel(FeedPostData);
    data.post_id = this.idGenerator.generatePostId('PL');
    await data.save();
    return { message: 'Post created successfully' };
  }
}
