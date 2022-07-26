import { NgModule } from "@angular/core";
import {RouterModule,Routes} from '@angular/router'
import { PostLIstComponent } from './post-list/post-list.component';
import { PostCreateComponent } from "./posts/post-create/post-create.component";

const routes: Routes = [
  {path: '', component: PostLIstComponent },
  {path: 'create', component: PostCreateComponent },
  {path: 'edit/:postId', component: PostCreateComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)]

})
export class ApproutingModule{

}
