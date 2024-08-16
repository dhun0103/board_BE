import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';

@Injectable()
export class PostsService {
    constructor(
      @InjectRepository(PostsModel)
      private readonly postsRepository: Repository<PostsModel>
    ){}


    async getAllposts() {
      return this.postsRepository.find();
    }

    async getPostById(id : string){
      const post = await this.postsRepository.findOne({
        where:{
          id
        }
      });

      if(!post){
        throw new NotFoundException();
      }
      return post
    }

    async createPost(author : string, title : string, content : string){
      const post = this.postsRepository.create({
        author,
        title,
        content,
      })
    
      const newPost = await this.postsRepository.save(post);
  
      return newPost;
    }

    async updatePost(postId : string, author : string, title : string, content : string){
      const post = await this.postsRepository.findOne({
        where:{
          id: postId
        }
      });

      if(!post){
        throw new NotFoundException();
      }
  
      if(author){
        post.author = author;
      }
      if(title){
        post.title = title;
      }
      if(content){
        post.content = content;
      }

      const newPost = await this.postsRepository.save(post);
  
      return newPost;
    }

    async deletePost(postId : string){
      const post = await this.postsRepository.findOne({
        where:{
          id: postId
        }
      });

      if(!post){
        throw new NotFoundException();
      }
  
      await this.postsRepository.delete(postId);
  
      return postId;
    }
}
