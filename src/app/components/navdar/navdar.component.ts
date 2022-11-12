import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navdar',
  templateUrl: './navdar.component.html',
  styleUrls: ['./navdar.component.css'],
  providers: [AuthService],
})
export class NavdarComponent implements OnInit {

  show:boolean = false;

  // otro código que necesites

  toggleCollapse() {
    this.show = !this.show
  }
  
  public isLogged = false;
  public user: any;
  public user$: Observable<any> = this.authService.afAuth.user;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.user = await this.authService.getCurrentUser();
    if (this.user) {
      this.isLogged = true;
    }
  }

  async onLogout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }
}
