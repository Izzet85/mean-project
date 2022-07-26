import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";

import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create-component.css']

})
export class PostCreateComponent implements OnInit{

  enteredContent = '';
  enteredTitle = '';
  private mode = 'create';
  private postId: string;
   post: Post;


   constructor(public postsService: PostService,public route: ActivatedRoute){

   }

  ngOnInit(): void {
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('postId')) {
            this.mode= 'edit';
            this.postId = paramMap.get('postId');
        }else {
          this.mode= 'create';
          this.postId = null;
          this.post = this.postsService.getPost(this.postId);
        }
      })
  }


  onAddPost(form: NgForm){

    if(form.invalid){
      return;
    }


  if(this.mode == 'create'){

    this.postsService.addPost(form.value.title,form.value.content);
    form.resetForm();


  }else{
    this.postsService.updatePost(this.postId,form.value.title,form.value.content)
  }




  }

}
