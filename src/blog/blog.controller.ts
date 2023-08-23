

// src/blog/blog.controller.ts
import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from '../Blog_model/blog';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}


  @Get()
  getAllBlogs(): Blog[] {
    return this.blogService.getAllBlogs();
  }

  

  @Get(':id')
  getBlogById(@Param('id') id: number): Blog {
    return this.blogService.getBlogById(id);
  }

  @Post()
  createBlog(@Body() blog: Blog): Blog {
    return this.blogService.createBlog(blog);
  }

  @Put(':id')
  updateBlog(@Param('id') id: number, @Body() updatedBlog: Blog): Blog {
    return this.blogService.updateBlog(id, updatedBlog);
  }

  @Delete(':id')
  deleteBlog(@Param('id') id: number): void {
    this.blogService.deleteBlog(id);
  }
}


























