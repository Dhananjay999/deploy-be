import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeedData } from './db/feed.schema';
import { FeedPostDto } from './db/feed.dto';

@Injectable()
export class FeedService {
  constructor(@InjectModel(FeedData.name) private postModel: Model<FeedData>) {}
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
    await data.save(); // Wait for the save operation to complete
    return { message: 'Post created successfully' };
  }
}
