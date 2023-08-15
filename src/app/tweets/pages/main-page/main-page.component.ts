import { Component } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interface';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { TweetsService } from '../../services/tweets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styles: [],
})
export class MainPageComponent {
  public gifs: Gif[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private tweetsServices: TweetsService,
    private router: Router
  ) {}

  public searchForm: FormGroup = this.formBuilder.group({
    search: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.searchForm.invalid) return;
    const { search } = this.searchForm.value;
    this.tweetsServices
      .searchGif(search)
      .subscribe((res) => (this.gifs = res.data));
    this.searchForm.reset();
  }

  onLogout() {
    this.router.navigate(['/auth']);
  }
}
