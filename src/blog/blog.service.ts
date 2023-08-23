// src/blog/blog.service.ts
import { Injectable } from '@nestjs/common';
import { Blog } from '../Blog_model/blog';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class BlogService {
  private readonly dataFilePath = path.resolve(process.cwd()+'/database/Blog.json');
  private blogs: Blog[];

  constructor() {
    this.blogs = this.loadData();
  }

  private loadData(): Blog[] {
    try {
      const data = fs.readFileSync(this.dataFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private saveData(): void {
    fs.writeFileSync(this.dataFilePath, JSON.stringify(this.blogs, null, 2), 'utf8');
  }

   getAllBlogs(): Blog[] {

    return this.blogs;
  
  }

  getBlogById(id: number): Blog {
    return this.blogs.find(blog => blog.id === id);
  }

  createBlog(blog: Blog): Blog {
    const newBlog = { id: Date.now(),...blog, created_at:new Date() };
    this.blogs.push(newBlog);
    this.saveData();
    return newBlog;
  }

  updateBlog(id: number, updatedBlog: Blog): Blog {
    const index = this.blogs.findIndex(blog => blog.id == id);
    if (index !== -1) {
      this.blogs[index] = { ...this.blogs[index], ...updatedBlog };
      this.saveData();
      return this.blogs[index];
    }
  }

  deleteBlog(id: number): void {
    const index = this.blogs.findIndex(blog => blog.id == id);
    if (index !== -1) {
      this.blogs.splice(index, 1);
      this.saveData();
    }
  }
}












