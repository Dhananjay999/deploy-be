import { Body, Controller, Get, Post } from '@nestjs/common';
import { FeedService } from '../feed.service';
import { FeedPostDto } from '../db/feed.dto';

@Controller('client')
export class ClientController {
  constructor(private feedService: FeedService) {}
  @Get('list')
  private getAllPost() {
    return this.feedService.getAllPost();
  }

  @Post('post')
  private createPost(@Body() FeedPostData: FeedPostDto) {
    console.log(FeedPostData);

    return this.feedService.createNewPost(FeedPostData);
  }
}
